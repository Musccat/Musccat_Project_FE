// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
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

    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/users/me/', {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
            setUser({
                username: response.data.username,
                fullName: `${response.data.first_name} ${response.data.last_name}`,
                userNickname: response.data.nickname,
                userBirthdate: response.data.userBirthdate,
                email: response.data.email, 
                phone: response.data.phone,
            });
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };
    
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/users/login/", {
                username,
                password
            });

            if (response.status === 200 && response.data.access) {
                setAuthTokens(response.data);
                localStorage.setItem("authTokens", JSON.stringify(response.data));
                await fetchUserData();  // Fetch and set the full user data after login
                setIsAuthenticated(true);
                navigate("/main");
            } else {
                alert("로그인에 실패했습니다. 서버 응답을 확인하세요.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("로그인 중 오류가 발생했습니다. 서버 상태를 확인하세요.");
        }
    };

    const registerUser = async (username, password, password2, fullName, userNickname, userBirthdate) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/users/register/", {
                username,
                password,
                password2,
                nickname: userNickname,
                birth: userBirthdate,
                first_name: fullName.split(' ')[0], // Assuming first name is the first part of fullName
                last_name: fullName.split(' ').slice(1).join(' ') // Assuming last name is the rest
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

    const mypageUser = async (fullName, userNickname, userBirthdate) => {
        try {
            const response = await axios.put("http://127.0.0.1:8000/users/mypage/", {
                fullName,
                nickname: userNickname,
                birth: userBirthdate,
            }, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });

            if (response.status === 200) {
                // Update user state with new data
                await fetchUserData();  // Refetch user data to update the state
                alert("User details updated successfully!");
            } else {
                alert("Failed to update user details.");
            }
        } catch (error) {
            console.error("Failed to update user details", error);
            alert("Updating user details failed. Please check the server status.");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setIsAuthenticated(false);
        navigate("/users/login");
    };

    useEffect(() => {
        if (authTokens) {
            fetchUserData();
        }
        setLoading(false);
    }, [authTokens]);


    const contextData = {
        user,
        authTokens,
        loginUser,
        registerUser,
        mypageUser,
        logoutUser,
        isAuthenticated,
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