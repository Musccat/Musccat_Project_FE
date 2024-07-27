import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../ui/SCHOLLI_logo.jpeg';


const NavBarWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e0e0e0;
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

function NavBar() {
    const { isAuthenticated } = useAuth();  // 추가
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/main');
    };

    return (
        <NavBarWrapper>
            <Logo onClick={handleLogoClick}>
                <img src={logo} alt="Logo" />
            </Logo>
            <NavLinks>
                <Link to={isAuthenticated ? "/entirescholar" : "/login"}>전체 장학금 목록</Link>
                <Link to={isAuthenticated ? "/mypage" : "/login"}>마이페이지</Link>
                <Link to={isAuthenticated ? "/points" : "/login"}>포인트</Link>
            </NavLinks>
        </NavBarWrapper>
    );
}

export default NavBar;