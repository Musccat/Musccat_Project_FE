// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
            : null
    );
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(!!authTokens);

    const [benefitInfos, setBenefitInfos] = useState({});

    // 장학금 목록 
    const [scholarships, setScholarships] = useState([]);
    const [likes, setLikes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [nextPageUrl, setNextPageUrl] = useState(null);  // 다음 페이지 URL
    const [previousPageUrl, setPreviousPageUrl] = useState(null);  // 이전 페이지 URL
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();



    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/users/mypage/", {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });

            const residence = response.data.residence ? response.data.residence.split(' ') : ['', ''];

            setUser({
                id: response.data.id,
                username: response.data.username,
                fullName: response.data.fullname,
                userNickname: response.data.nickname,
                userBirthdate: response.data.birth,
                age: response.data.age,
                email: response.data.email,
                gender: response.data.gender,
                region: residence[0],  
                district: residence[1],
                income: response.data.income,
                univCategory: response.data.univCategory,
                university: response.data.university,
                majorCategory: response.data.majorCategory,
                major: response.data.major,
                year: response.data.year,
                semester: response.data.semester,
                totalGPA: response.data.totalGPA,
                familyStatus: response.data.familyStatus,
                additionalInfo: response.data.additionalInfo,
            });
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            const response = await axios.put("http://127.0.0.1:8000/users/mypage/update/", updatedData, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
            if (response.status === 200) {
                await fetchUserData(); // 서버에서 갱신된 정보를 다시 불러옴
                alert("사용자 정보가 성공적으로 업데이트되었습니다.");
            } else {
                alert("사용자 정보를 업데이트하는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("사용자 정보 업데이트 중 오류 발생", error);
            
        }
    };
    const fetchFoundations = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/reviews/foundations", {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch foundations", error);
            return [];
        }
    };

    const fetchScholarshipsByFoundation = async (foundationName) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/reviews/scholarships/${foundationName}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            // 장학 사업명과 product_id를 반환하도록 수정
            return response.data.map((scholarship) => ({
                name: scholarship.name,
                product_id: scholarship.id,
            }));
        } catch (error) {
            console.error("Failed to fetch scholarships by foundation", error);
            return [];
        }
    };

    const fetchScholarships = async (page = 1) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/entirescholar/?page=${page}`);
            setScholarships(response.data.results);
            setLikes(Array(response.data.results.length).fill(false));  // 좋아요 상태 초기화
            setNextPageUrl(response.data.next);  // 다음 페이지 URL 저장
            setPreviousPageUrl(response.data.previous);  // 이전 페이지 URL 저장
            setTotalPages(Math.ceil(response.data.count / 10));
        } catch (error) {
            console.error("Failed to fetch scholarships", error);
        }
    };

    const filterScholarshipsByType = (typeOption) => {
        if (typeOption === '장학금 전체') {
            return scholarships; // 전체 장학금 반환
        }
        
        // 선택된 유형에 맞는 장학금 필터링
        return scholarships.filter(scholarship => 
            scholarship.financial_aid_type === typeOption
        );
    };

    const goToNextPage = async () => {
        if (nextPageUrl) {
            await fetchScholarships(currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    };
    
    const goToPreviousPage = async () => {
        if (previousPageUrl && currentPage > 1) {
            await fetchScholarships(currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    };
    
    const loginUser = async (username, password) => {
        try {
            // 로그인 요청을 보내고 토큰을 받아옵니다.
            const response = await axios.post('http://127.0.0.1:8000/users/login/', { 
                username, 
                password 
            });
    
            // 로그인 성공 시 (status 200) 및 access 토큰이 있는지 확인
            if (response.status === 200 && response.data.access) {
                setAuthTokens(response.data);
                localStorage.setItem("authTokens", JSON.stringify(response.data));
    
                // 로그인 후 사용자 데이터를 불러와서 설정
                await fetchUserData();  
    
                // 로그인 상태를 true로 변경
                setIsAuthenticated(true);
    
                // 메인 페이지로 이동
                navigate("/main");
            } 
        } catch (error) {
            // 서버에서 발생한 오류 처리
            if (error.response) {
                if (error.response.status === 400) {
                    alert("잘못된 사용자 아이디 또는 비밀번호입니다.");
                } else if (error.response.status === 401) {
                    alert("인증 실패. 사용자 정보를 확인해 주세요.");
                } else {
                    alert("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
                }
            }
        }
    };

    const registerUser = async (username, password, password2, fullName, userNickname, userBirthdate, email) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/users/register/", {
                username,
                password,
                password2,
                nickname: userNickname,
                birth: userBirthdate,
                fullname: fullName,
                email: email
            });

            if (response.status === 201) {
                navigate("/users/login");
            } else {
                alert("회원가입에 실패했습니다!");
            }
        } catch (error) {
            console.error("Failed to register user", error);
            alert("회원가입 중 오류가 발생했습니다. 서버 상태를 확인하세요.");
        }
    };

    const addBenefitInfo = async (product_id, info) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/reviews/`, info, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
    
            if (response.status === 201) {
                setBenefitInfos(prevState => ({
                    ...prevState,
                    [product_id]: [...(prevState[product_id] || []), response.data]
                }));
            }
        } catch (error) {
            console.error("Failed to add benefit information:", error);
        }
    };

    const updateBenefitInfo = async (product_id, benefit_id, updatedInfo) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/reviews/edit/${benefit_id}/`, updatedInfo, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
    
            if (response.status === 200) {
                setBenefitInfos(prevState => ({
                    ...prevState,
                    [product_id]: prevState[product_id].map(info => 
                        info.id === benefit_id ? { ...info, ...updatedInfo } : info
                    )
                }));
            }
        } catch (error) {
            console.error("Failed to update benefit information:", error);
        }
    };
    


    const deleteBenefitInfo = async (product_id, benefit_id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/reviews/edit/${benefit_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
    
            if (response.status === 204) {
                setBenefitInfos(prevState => ({
                    ...prevState,
                    [product_id]: prevState[product_id].filter(info => info.id !== benefit_id)
                }));
            }
        } catch (error) {
            console.error("Failed to delete benefit information:", error);
        }
    };    

    const fetchBenefitInfos = async (product_id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/reviews/${product_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });

            const data = Array.isArray(response.data) ? response.data : [response.data];

            setBenefitInfos(prevState => ({
                ...prevState,
                [product_id]: data,
            }));
        } catch (error) {
            console.error("Failed to fetch benefit information:", error);
        }
    };

    // 아이디 중복 확인 함수
    const checkUsernameAvailability = async (username) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/check-username/${username}/`);
            return response.data.available;  // true면 사용 가능, false면 이미 사용 중
        } catch (error) {
            console.error("Username availability check failed", error);
            return false;
        }
    };

    const sendVerificationCode = async (email) => {
        try {
            await axios.post("http://127.0.0.1:8000/users/send-verification-code/", { email });
        } catch (error) {
            console.error("Failed to send verification code", error);
            throw error;
        }
    };
    
    const verifyCode = async (email, code) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/users/verify-code/", { email, "verify-code": code });
            return response.data.valid;  // true if valid, false if not
        } catch (error) {
            console.error("Failed to verify code", error);
            return false;
        }
    };
    

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setIsAuthenticated(false);
        navigate("/");
    };

    useEffect(() => {
        if (authTokens) {
            fetchUserData();
            fetchScholarships();
        }
        setLoading(false);
    }, [authTokens]);


    const contextData = {
        user,
        authTokens,
        loginUser,
        registerUser,
        fetchUserData,
        updateUser,
        logoutUser,
        isAuthenticated,
        addBenefitInfo,
        updateBenefitInfo,
        deleteBenefitInfo,
        fetchBenefitInfos,
        benefitInfos,
        fetchScholarships,
        filterScholarshipsByType,
        goToNextPage,
        goToPreviousPage,
        scholarships,
        likes,
        setLikes,
        fetchFoundations,
        fetchScholarshipsByFoundation,
        checkUsernameAvailability,
        sendVerificationCode,
        verifyCode,
        totalPages,
    };

/*
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
*/

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);