// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


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

    const navigate = useNavigate();
    
    const loginUser = async (username, password) => {
        try {
        const response = await fetch("http://127.0.0.1:8000/users/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });


        const data = await response.json();

        if (response.status === 200 && data.access) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        } else {
            alert("로그인에 실패했습니다. 서버 응답을 확인하세요.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("로그인 중 오류가 발생했습니다. 서버 상태를 확인하세요.");
    }
};

const registerUser = async (username, password, password2, fullName, userNickname, userBirthdate) => {
    const response = await fetch("http://127.0.0.1:8000/users/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            password2,
            name: fullName,
            nickname: userNickname,
            birthdate: userBirthdate
        })
    });

    if (response.status === 201) {
        navigate("/users/login");
    } else {
        alert("회원가입에 실패했습니다!");
    }
};

const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/users/login");
};

useEffect(() => {
    if (authTokens) {
        setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
}, [authTokens]);


const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    isAuthenticated: !!user,
};

/*
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
*/

    return (
        <AuthContext.Provider value={ contextData }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);