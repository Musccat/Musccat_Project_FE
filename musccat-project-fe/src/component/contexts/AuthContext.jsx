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
    const [likedScholarships, setLikedScholarships] = useState(() =>
        JSON.parse(localStorage.getItem("likedScholarships")) || []
    );
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [nextPageUrl, setNextPageUrl] = useState(null);  // 다음 페이지 URL
    const [previousPageUrl, setPreviousPageUrl] = useState(null);  // 이전 페이지 URL
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [stateChanged, setStateChanged] = useState(false);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [calendarScholarships, setCalendarScholarships] = useState([]); // 캘린더 장학금 상태


    const storedUser = JSON.parse(localStorage.getItem("user")) || null;

    const navigate = useNavigate();

    useEffect(() => {
        const initializeUserData = async () => {

            if (!authTokens || !authTokens.access) {
                console.warn("Auth tokens are not available. Skipping data initialization.");
                return;
            }

            // 로컬 스토리지에서 사용자 데이터 불러오기
            console.log("Initializing user data...");
            const storedUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
            const storedLikedScholarships = JSON.parse(localStorage.getItem("likedScholarships"));
            const storedLikes = JSON.parse(localStorage.getItem("likes"));
            
            if (storedUser) {
                setUser(storedUser); // 로컬 스토리지에 저장된 데이터로 설정
            } else if (authTokens && !user) {
                // 로컬 스토리지에 사용자 데이터가 없고, 토큰이 존재할 때만 fetchUserData 호출
                await fetchUserData();
            }

            // 좋아요 상태 초기화
            if (storedLikedScholarships && storedLikedScholarships.length > 0) {
                setLikedScholarships(storedLikedScholarships);
                setLikes(storedLikes);
                console.log("Liked scholarships loaded from localStorage:", storedLikedScholarships);
            } else if (authTokens) {
                console.log("Fetching liked scholarships from server...");
                await fetchLikedScholarships(); // 서버에서 좋아요 상태를 새로 가져옴
            }
        };
    
        initializeUserData();
    }, [authTokens]);

    const fetchUserData = async () => {
        if (!authTokens || user) return;

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userinfo/mypage/view/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });

            const residence = response.data.residence ? response.data.residence.split(' ') : ['', ''];

            // etc 필드에서 데이터를 받아 familyStatus와 additionalInfo로 분리
            const etc = response.data.etc || '';
            let familyStatus = '';
            let additionalInfo = '';

            if (etc) {
                const parts = etc.split(', ');
                if (parts.length > 0) {
                    familyStatus = parts[0].replace(/\(familyStatus값\)/g, ''); // familyStatus값 추출
                }
                if (parts.length > 1) {
                    additionalInfo = parts[1].replace(/\(additionalInfo값\)/g, ''); // additionalInfo값 추출
                }
            }

            const userData = ({
                id: response.data.id,
                username: response.data.username,
                fullname: response.data.fullname,
                nickname: response.data.nickname,
                birth: response.data.birth,
                age: response.data.age,
                email: response.data.email,
                gender: response.data.gender,
                region: residence[0],  
                district: residence[1],
                residence: response.data.residence,
                income: response.data.income,
                univ_category: response.data.univ_category,
                university: response.data.university,
                major_category: response.data.major_category,
                major: response.data.major,
                semester: response.data.semester,
                totalGPA: response.data.totalGPA,
                familyStatus: familyStatus.split(', '),  
                additionalInfo: additionalInfo || '',  
                etc: response.data.etc || ''
            });
            setUser(userData); // 상태에 설정
            localStorage.setItem("user", JSON.stringify(userData)); // 로컬 스토리지에 저장
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            console.log("업데이트 데이터:", updatedData);
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/userinfo/mypage/update/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
    
            if (response.status === 200) {
                console.log("서버에서 받은 데이터:", response.data);
                
                setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedData,
                }));
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/foundations/`, {
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

    const fetchScholarships = async (page = 1, typeOption = '', sortOption = '', searchTerm = '', foundationName = '') => {
        setIsLoading(true);  // 로딩 시작
        try {
            let url = `${process.env.REACT_APP_API_URL}/entirescholar/?page=${page}`;

            // 유형 구분 필터 추가
            if (typeOption && typeOption !== '장학금 유형구분') {
                url += `&financial_aid_type=${encodeURIComponent(typeOption)}`;
            }

            // 정렬 옵션 추가
            if (sortOption && sortOption !== '장학금 정렬') {
                url += `&ordering=${encodeURIComponent(sortOption)}`;
            }

            // 사업명 또는 재단명 검색 추가
            let searchQuery = '';
            if (searchTerm) {
                searchQuery += `${encodeURIComponent(searchTerm)}`;
            }
            if (foundationName) {
                if (searchQuery) {
                    searchQuery += ` ${encodeURIComponent(foundationName)}`; // 둘 다 있으면 공백으로 구분하여 합침
                } else {
                    searchQuery += `${encodeURIComponent(foundationName)}`; // 하나만 있을 때
                }
            }
            if (searchQuery) {
                url += `&search=${searchQuery}`;
            }

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });

            // 좋아요 상태와 동기화
            const updatedScholarships = response.data.results.map((scholarship) => ({
                ...scholarship,
                isLiked: likedScholarships.some((liked) => liked.product_id === scholarship.product_id),
            }));

            setScholarships(updatedScholarships);
            setTotalPages(Math.ceil(response.data.count / 10));
        } catch (error) {
            console.error("Failed to fetch scholarships", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scholarships.length > 0) {
            const updatedScholarships = scholarships.map(scholarship => ({
                ...scholarship,
                isLiked: likedScholarships.some(like => like.product_id === scholarship.product_id),
            }));
            setFilteredScholarships(updatedScholarships); // 업데이트된 데이터만 설정
        }
    }, [scholarships, likedScholarships]);

    const goToNextPage = async () => {
        if (nextPageUrl) {
            try {
                const response = await axios.get(nextPageUrl, {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setScholarships(response.data.results);
                setNextPageUrl(response.data.next);
                setPreviousPageUrl(response.data.previous);
                setCurrentPage(currentPage + 1); // 현재 페이지 갱신
            } catch (error) {
                console.error("Failed to go to next page", error);
            }
        }
    };
    
    const goToPreviousPage = async () => {
        if (previousPageUrl && currentPage > 1) {
            try {
                const response = await axios.get(previousPageUrl, {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setScholarships(response.data.results);
                setNextPageUrl(response.data.next);
                setPreviousPageUrl(response.data.previous);
                setCurrentPage(currentPage - 1); // 현재 페이지 갱신
            } catch (error) {
                console.error("Failed to go to previous page", error);
            }
        }
    };

    useEffect(() => {
        // authTokens가 존재할 경우 likedScholarships를 서버에서 불러옴
        const fetchInitialData = async () => {
            if (authTokens && authTokens.access) {
                await fetchLikedScholarships();
            }
        };
        fetchInitialData();
    }, [authTokens]);
    
    const handleLikeClick = async (index, scholarshipId, isLiked) => {
        try {
            if (isLiked) {
                // 좋아요 삭제 요청 
                await axios.delete(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/delete/${scholarshipId}/`, {
                    headers: { Authorization: `Bearer ${authTokens.access}` },
                });
                
                // likedScholarships와 scholarships 업데이트
                setLikedScholarships((prev) => {
                    const updatedLikes = prev.filter((scholarship) => scholarship.product_id !== scholarshipId);
                    localStorage.setItem("likedScholarships", JSON.stringify(updatedLikes)); // 로컬 스토리지 업데이트
                    return updatedLikes;
            });

                setScholarships((prev) =>
                    prev.map((scholarship) =>
                        scholarship.product_id === scholarshipId
                            ? { ...scholarship, isLiked: false }
                            : scholarship
                    )
                );
                
            } else {
                const selectedScholarship = scholarships[index];
                // 좋아요 추가 요청 
                await axios.post(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/add/`, {
                    user: user.id,
                    scholarship_id: scholarshipId,
                    added_at: new Date().toISOString(),
                }, {
                    headers: { Authorization: `Bearer ${authTokens.access}` },
                });

                setLikedScholarships((prev) => {
                    const updatedLikes = [
                        ...prev,
                        {
                            product_id: scholarshipId,
                            name: selectedScholarship.name,
                            foundation_name: selectedScholarship.foundation_name,
                            recruitment_end: selectedScholarship.recruitment_end,
                        },
                    ];
                    localStorage.setItem("likedScholarships", JSON.stringify(updatedLikes)); // 로컬 스토리지 업데이트
                    return updatedLikes;
                });

                setScholarships((prev) =>
                    prev.map((scholarship) =>
                        scholarship.product_id === scholarshipId
                            ? { ...scholarship, isLiked: true }
                            : scholarship
                    )
                );
            }
            } catch (error) {
                console.error("Error updating like status", error);
                alert("찜 상태를 업데이트하는 데 실패했습니다.");
            }
    };

    useEffect(() => {
        localStorage.setItem("likedScholarships", JSON.stringify(likedScholarships));
    }, [likedScholarships]);

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

            const fetchedScholarships = response.data.map((liked) => ({
                product_id: liked.scholarship_id,
                foundation_name: liked.foundation_name,
                name: liked.name,
                recruitment_end: liked.recruitment_end,
            }));

            setLikedScholarships(fetchedScholarships);
            localStorage.setItem("likedScholarships", JSON.stringify(fetchedScholarships));
            console.log("Successfully fetched liked scholarships:", fetchedScholarships);
        } catch (error) {
            console.error("Failed to fetch liked scholarships:", error);
        }
    };

    useEffect(() => {
        console.log("Auth tokens on MyInterest mount:", authTokens);
        console.log("Liked scholarships on mount:", likedScholarships);
    }, [authTokens, likedScholarships]);
    

    const fetchScholarDetail = async (product_id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/entirescholar/notice/${product_id}/`, {
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
            console.log("Response data:", response.data); 
            if (response && response.data) {
                return response.data; // 서버에서 받은 데이터 반환
                console.log("Response data:", response.data); 
            } else {
                console.error("Unexpected data format:", response);
                return [];  // 데이터가 없을 경우 빈 배열 반환
            }
        } catch (error) {
            console.error("Failed to fetch recommended scholarships", error);
            return []; // 에러가 발생한 경우 빈 배열 반환
        }
    };

    const loadScholarships = async () => {
        try {
            const data = await fetchRecommendedScholarships(); 
            console.log("Scholarships data:", data); // 데이터가 어떻게 오는지 확인
    
            if (Array.isArray(data) && data.length > 0) {
                setScholarships(data);  // 데이터를 상태에 저장
                console.log("Scholarships set:", data);  // 저장된 데이터 확인
            } else {
                console.error("Unexpected data format or empty data:", data);  // 데이터가 배열이 아니거나 빈 배열일 경우
                setScholarships([]);  // 빈 배열로 설정
            }
        } catch (error) {
            console.error("Failed to load scholarships", error);
            setScholarships([]);  // 오류가 발생한 경우 빈 배열 설정
        } finally {
            setIsLoading(false);  // 로딩 완료
        }
    };

    // 캘린더 장학금 데이터 가져오기
    const fetchCalendarScholarships = async () => {
        if (!authTokens || !authTokens.access) {
            console.error("No access token available.");
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/calendar/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });

            const scholarships = response.data.map((scholarship) => ({
                ...scholarship,
                recruitment_end: new Date(scholarship.recruitment_end), // 날짜 변환
            }));

            setCalendarScholarships(scholarships);
            console.log("Calendar scholarships loaded:", scholarships); // 데이터 확인
        } catch (error) {
            console.error("Failed to fetch calendar scholarships:", error);
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
                await fetchLikedScholarships();
    
                // 로그인 상태를 true로 변경
                setIsAuthenticated(true);
    
                // 메인 페이지로 이동
                navigate("/main");

                // localStorage에서 좋아요 상태 불러오기
                const storedLikedScholarships = JSON.parse(localStorage.getItem("likedScholarships"));
                const storedLikes = JSON.parse(localStorage.getItem("likes"));
                if (storedLikedScholarships && storedLikes) {
                    setLikedScholarships(storedLikedScholarships);
                    setLikes(storedLikes);
                } else {
                    await fetchLikedScholarships(); // 서버에서 좋아요 상태 다시 불러오기
                }

                return true; // 로그인 성공 시 true 반환
            } else {
                return false; // 로그인 실패 시 false 반환
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

    const registerUser = async (username, password, password2, fullname, nickname, birth, email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register/`, {
                username,
                password,
                password2,
                nickname,
                birth,
                fullname,
                email
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/view/${product_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });

            // 서버에서 오는 데이터 분리
            const { is_subscribed, reviews } = response.data;

            // `benefitInfos` 상태를 업데이트
            setBenefitInfos(prevState => ({
                ...prevState,
                [product_id]: {
                    is_subscribed,
                    reviews,
                },
            }));
            // 반환값으로 `is_subscribed`와 `reviews` 전달
            return { is_subscribed, reviews };
        } catch (error) {
            console.error("Failed to fetch benefit information:", error);
            throw error; // 에러를 호출한 곳으로 전달
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
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/verify-code/`, { email, "verify-code": code });
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
                alert("장학금 정보 입력이 완료 되었습니다");
            } else {
                alert("장학금 입력에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error registering scholarship", error);
            alert("장학금 입력 중 오류가 발생했습니다.");
        }
    };

    const checkSubscriptionStatus = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userinfo/checksubscribe/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            return response.data.isSubscribed; // 구독 여부 반환 (true/false)
        } catch (error) {
            console.error("Failed to check subscription status", error);
            throw error;
        }
    };
    

    const setScholarDate = async (scholarshipPeriod) => {
        console.log("Scholarship period being set:", scholarshipPeriod);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/userinfo/scholarships/recommend/`, 
            {
                date: scholarshipPeriod.recruitment_end,  
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
        localStorage.removeItem("user");
        localStorage.removeItem("likedScholarships"); // 좋아요한 장학금 상태 삭제
        localStorage.removeItem("likes"); // likes 상태 삭제
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
        currentPage,
        setCurrentPage,
        setScholarships,
        fetchScholarships,
        goToNextPage,
        goToPreviousPage,
        scholarships,
        handleLikeClick,
        fetchLikedScholarships,
        likedScholarships,
        setLikedScholarships,
        likes,
        setLikes,
        filteredScholarships,
        setFilteredScholarships,
        fetchFoundations,
        fetchScholarshipsByFoundation,
        fetchScholarDetail,
        checkUsernameAvailability,
        sendVerificationCode,
        verifyCode,
        totalPages,
        search,
        setSearch,
        RegisterScholarship,
        setScholarDate,
        checkSubscriptionStatus,
        fetchRecommendedScholarships, 
        loadScholarships,
        calendarScholarships,
        fetchCalendarScholarships,
        stateChanged,
        setStateChanged,
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