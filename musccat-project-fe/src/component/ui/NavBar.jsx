import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../ui/SCHOLLI_logo.jpeg';
import { useAuth } from '../contexts/AuthContext';


const NavBarWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    border-bottom: 2px solid #348a8c;
    margin: 0 auto; /* 중앙 정렬 */

    @media (max-width: 768px) {
        padding: 16px;
    }
`;

const Logo = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;

    img {
        height: 40px; /* 네비게이션 항목과 같은 높이로 조정 */
        width: auto;
        margin: 0; /* 마진을 제거하여 중앙 정렬 문제 해결 */
    }
`;
const NavContainer = styled.div`
    display: flex;
    gap: 24px;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 24px;
    margin-left: auto; /* 네비게이션 링크를 오른쪽으로 밀어줌 */
    padding-right: 50px; /* 오른쪽 여백 추가 */

    a {
        text-decoration: none;
        color: #333;
        font-weight: 500;

        &:hover {
            color: #007bff;
        }
    }
`;

const LogoutButton = styled.button`
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 8px; 
    transform: translateY(-8px);

    &:hover {
        background-color: #348a8c; 
    }
`;

function NavBar() {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    const handleLogoClick = () => {
        navigate('/main');
    };

    const handleLogout = () => {
        logoutUser(); // Call the logout function to log the user out
    };

    return (
        <NavBarWrapper>
            <Logo onClick={handleLogoClick}>
                <img src={logo} alt="Logo" />
            </Logo>
            <NavContainer>
            <NavLinks>
            <Link to={"/entirescholar"}>전체 장학금 목록</Link>
                <Link to={"/recomscholar"}>추천 장학금 목록</Link>
                <Link to={"/interestlist"}>내 관심 목록</Link>
                <Link to={"/users/mypage"}>마이페이지</Link>
                <Link to={"/points"}>포인트</Link>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </NavLinks>
            </NavContainer>
        </NavBarWrapper>
    );
}

export default NavBar;