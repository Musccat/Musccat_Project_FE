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
    const [likedScholarships, setLikedScholarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [nextPageUrl, setNextPageUrl] = useState(null);  // 다음 페이지 URL
    const [previousPageUrl, setPreviousPageUrl] = useState(null);  // 이전 페이지 URL
    const [totalPages, setTotalPages] = useState(1);


    const navigate = useNavigate();



    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/mypage/`, {
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/mypage/update/`, updatedData, {
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/foundations`, {
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/scholarships/${foundationName}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            // 장학 사업명과 product_id를 반환하도록 수정
            return response.data.map((scholarship) => ({
                name: scholarship.name,
                product_id: String(scholarship.id),
            }));
        } catch (error) {
            console.error("Failed to fetch scholarships by foundation", error);
            return [];
        }
    };

    const fetchScholarships = async (page = 1) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/entirescholar/?page=${page}`);
            setScholarships(response.data.results);
            setNextPageUrl(response.data.next);  // 다음 페이지 URL 저장
            setPreviousPageUrl(response.data.previous);  // 이전 페이지 URL 저장
            setTotalPages(Math.ceil(response.data.count / 10));

            // 장학금 데이터를 불러온 후 좋아요 상태도 불러옴
            await fetchLikedScholarships();
        } catch (error) {
            console.error("Failed to fetch scholarships", error);
        }
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

    const filterScholarshipsByType = async (typeOption) => {
        try {
            let url = `${process.env.REACT_APP_API_URL}/entirescholar/`;
            
            // '장학금 전체'가 아닌 경우, 해당 유형으로 필터링
            if (typeOption) {
                url += `?financial_aid_type=${encodeURIComponent(typeOption)}`;
            }
    
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
    
            setScholarships(response.data.results); // 받아온 데이터를 상태에 저장
            setNextPageUrl(response.data.next);  // 다음 페이지 URL 저장
            setPreviousPageUrl(response.data.previous);  // 이전 페이지 URL 저장
            setTotalPages(Math.ceil(response.data.count / 10)); // 총 페이지 수 업데이트
        } catch (error) {
            console.error(`Failed to fetch scholarships by type: ${typeOption}`, error);
        }
    };

    const fetchScholarshipsByNameOrFoundation = async (searchTerm) => {
        try {
            // 장학 사업명으로 검색
            const nameResponse = await axios.get(`${process.env.REACT_APP_API_URL}/entirescholar/?name=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
    
            // 장학 재단명으로 검색
            const foundationResponse = await axios.get(`${process.env.REACT_APP_API_URL}/entirescholar/?foundation_name=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
    
            return {
                scholarshipsByName: nameResponse.data,
                scholarshipsByFoundation: foundationResponse.data,
            };
        } catch (error) {
            console.error("Error fetching scholarships by name or foundation:", error);
            return { scholarshipsByName: [], scholarshipsByFoundation: [] };
        }
    };

    const fetchScholarshipsByOrder = async (orderOption) => {
        try {
            let url = `${process.env.REACT_APP_API_URL}/entirescholar/?ordering=${orderOption}`;
            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
    
            setScholarships(response.data.results);  // 받아온 데이터를 상태에 저장
            setNextPageUrl(response.data.next);  // 다음 페이지 URL 저장
            setPreviousPageUrl(response.data.previous);  // 이전 페이지 URL 저장
            setTotalPages(Math.ceil(response.data.count / 10));  // 총 페이지 수 업데이트
        } catch (error) {
            console.error(`Failed to fetch scholarships with ordering: ${orderOption}`, error);
        }
    };
    
    

    const handleLikeClick = async (index, scholarshipId) => {
        const newLikes = [...likes];
        const isLiked = newLikes[index];

        if (isLiked) {
            // 이미 좋아요 상태면 찜 목록에서 제거하는 요청
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/delete/${scholarshipId}/`, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`, // 사용자 인증 토큰
                    },
                });

                if (response.status === 204) {
                    newLikes[index] = false;
                    alert("찜 목록에서 삭제되었습니다.");
                }
            } catch (error) {
                console.error("찜 목록에서 삭제 중 오류 발생:", error);
            }
        } else {
            // 좋아요 상태가 아니면 찜 목록에 추가하는 요청
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/add/`, {
                    user: user.id,
                    scholarship_id: scholarshipId,
                    added_at: new Date().toISOString(),
                }, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`, // 사용자 인증 토큰
                    },
                });

                if (response.status === 201) {
                    newLikes[index] = true;
                    alert("찜 목록에 추가되었습니다.");
                }
            } catch (error) {
                console.error("찜 목록 추가 중 오류 발생:", error);
            }
        }

        setLikes(newLikes);
    };

    const fetchLikedScholarships = async () => {
        if (!authTokens || !authTokens.access) {
            console.error("No access token available.");
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            
            // 서버에서 받은 좋아요 상태를 이용해 likes 배열을 업데이트
            const likedScholarshipIds = response.data.map(liked => liked.scholarship_id);

            const filteredScholarships = scholarships.filter(scholarship =>
                likedScholarshipIds.includes(scholarship.product_id)
            );
            
            // likedScholarships 상태 업데이트
            setLikedScholarships(filteredScholarships);

            const updatedLikes = scholarships.map(scholarship =>
                likedScholarshipIds.includes(scholarship.product_id)
            );
            setLikes(updatedLikes);
        } catch (error) {
            console.error("Failed to fetch liked scholarships:", error);
        }
    };

    const fetchScholarDetail = async (product_id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/entirescholar/${product_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`, // 인증 토큰 포함
                },
            });
            return response.data; // 장학금 데이터를 반환
        } catch (error) {
            console.error("Failed to fetch scholarship details", error);
            return null; // 에러 발생 시 null 반환
        }
    };


    const fetchRecommendedScholarships = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userinfo/scholarships/recommend/list/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            setScholarships(response.data); // 추천 장학금 목록을 상태에 저장
        } catch (error) {
            console.error("Failed to fetch recommended scholarships", error);

        }
    };
    
    const loginUser = async (username, password) => {
        console.log(process.env.REACT_APP_API_URL); 
        try {
            // 로그인 요청을 보내고 토큰을 받아옵니다.
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login/`, { 
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register/`, {
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/reviews/`, info, {
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/reviews/edit/${benefit_id}/`, updatedInfo, {
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/edit/${benefit_id}/`, {
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/${product_id}/`, {
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/check-username/${username}/`);
            return response.data.available;  // true면 사용 가능, false면 이미 사용 중
        } catch (error) {
            console.error("Username availability check failed", error);
            return false;
        }
    };

    const sendVerificationCode = async (email) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/send-verification-code/`, { email });
        } catch (error) {
            console.error("Failed to send verification code", error);
            throw error;
        }
    };
    
    const verifyCode = async (email, code) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/verify-code/`, { email, "verify-code": code });
            return response.data.valid;  // true if valid, false if not
        } catch (error) {
            console.error("Failed to verify code", error);
            return false;
        }
    };

    const RegisterScholarship = async (scholarshipData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/entirescholar/register/`, scholarshipData, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`, // Send the auth token in the header
                },
            });
    
            if (response.status === 201) {
                alert("Scholarship successfully registered!");
            } else {
                alert("Failed to register scholarship.");
            }
        } catch (error) {
            console.error("Error registering scholarship", error);
            alert("An error occurred while registering the scholarship.");
        }
    };

    const setScholarDate = async (scholarshipPeriod) => {
        console.log("Scholarship period being set:", scholarshipPeriod);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/userinfo/scholarships/recommend/`, 
            {
                recruitment_end: scholarshipPeriod.recruitment_end,  
            }, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,  // 인증 토큰 추가
                },
            });

            console.log("Response from server:", response); 
    
            return response;  // 응답 반환, 여기서 경고창 처리하지 않음
        } catch (error) {
            console.error("Error setting scholarship date", error);
            throw error;  // 에러를 상위로 전달
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
    }, [authTokens, fetchUserData, fetchScholarships]);


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
        currentPage,
        setCurrentPage,
        fetchScholarships,
        filterScholarshipsByType,
        goToNextPage,
        goToPreviousPage,
        fetchScholarshipsByNameOrFoundation,
        fetchScholarshipsByOrder,
        scholarships,
        handleLikeClick,
        fetchLikedScholarships,
        likedScholarships,
        likes,
        setLikes,
        fetchFoundations,
        fetchScholarshipsByFoundation,
        fetchScholarDetail,
        checkUsernameAvailability,
        sendVerificationCode,
        verifyCode,
        totalPages,
        RegisterScholarship,
        setScholarDate,
        fetchRecommendedScholarships, 
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