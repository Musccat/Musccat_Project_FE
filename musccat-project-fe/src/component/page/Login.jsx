import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import logo from '../ui/SCHOLLI_logo.jpeg';

const Page = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    padding: 0 20px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #fffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleWrap = styled.div`
    margin-top: 40px;
    width: 100%;

    img {
        height: 70px; /* 로고 크기 */
        margin-bottom: 16px;
        display: block; 
        margin-bottom: 70px;
        margin-left: auto;
        margin-right: auto;
    }

    h1 {
        font-size: 25px;
        font-weight: 600;
        color: #348a8c;
        margin-bottom: 5px; 
        margin-left: 15px;
    }
`;

const ContentWrap = styled.div`
    margin-top: 26px;
    flex: 1;
    width: 100%;
`;

const InputTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #348a8c;
    margin-bottom: 8px;
    margin-left: 17px;
`;

const InputWrap = styled.div`
    display: flex;
    border-radius: 64px; /* 둥글게 조정 */
    padding: 16px;
    margin-top: 8px;
    background-color: white;
    border: 1px solid #e2e0e0;

    &:focus-within {
        border: 1px solid #348a8c;
    }

    input {
        width: 100%;
        outline: none;
        border: none;
        height: 24px;
        font-size: 14px;
        font-weight: 400;

        &::placeholder {
            color: #dadada;
        }
    }
`;

const ErrorMessageWrap = styled.div`
    margin-top: 8px;
    color: #ef0000;
    font-size: 12px;
`;

const BottomButton = styled.button`
    width: 100%;
    height: 48px;
    border: none;
    font-weight: 700;
    background-color: #348a8c;
    border-radius: 64px;
    color: white;
    font-size: 20px;
    margin-bottom: 8px;
    cursor: pointer;

    &:disabled {
        background-color: #dadada;
        color: white;
    }
`;

const FindInfoWrap = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-top: 8px; /* 로그인 버튼과의 간격 */
    margin-right: 10px; /* 오른쪽 여백 */

    a {
        font-size: 14px;
        color: #348a8c;
        text-decoration: none;
    }
`;

const Space = styled.div`
    margin-top: 32px;
`;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [notAllow, setNotAllow] = useState(false);

    const navigate = useNavigate();
    const { loginUser } = useAuth(); // useAuth에서 loginUser 가져오기

    const handleUsername = (e) => {
        setUsername(e.target.value);
        const regex = /^[a-zA-Z0-9]{4,}$/;
        setUsernameValid(regex.test(e.target.value));
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = 
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPasswordValid(regex.test(e.target.value));
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameValid && passwordValid) {
            const loginSuccess = await loginUser(username, password); // loginUser 함수에서 토큰만 받아오기
            if (loginSuccess) {
                navigate('/main');  // 로그인 성공 시 메인 페이지로 이동
            } else {
                alert("로그인에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    }

    useEffect(() => {
        setNotAllow(!(usernameValid && passwordValid));
    }, [usernameValid, passwordValid]);

    const handleSignUpClick = () => {
        navigate('/users/register');  // 회원가입 페이지로 이동
    }

    return (
        <Page>
            <TitleWrap>
                <img src={logo} alt="SCHOLLI Logo" />
                
            </TitleWrap>
            <ContentWrap>
                <form onSubmit={handleSubmit}>
            <InputTitle>아이디</InputTitle>
                <InputWrap>
                    <input 
                        type='text'
                        placeholder="username"
                        value={username}
                        onChange={handleUsername}/>
                </InputWrap>
                <ErrorMessageWrap>
                    {!usernameValid && username.length > 0 && (
                        <div>영문, 숫자 포함 4자 이상 입력해주세요.</div>
                    )}
                </ErrorMessageWrap>

                <InputTitle style={{ marginTop: "26px" }}>비밀번호</InputTitle>
                <InputWrap>
                    <input 
                        type='password'
                        placeholder="password"
                        value={password}
                        onChange={handlePassword}/>
                </InputWrap>
                <ErrorMessageWrap>
                    {!passwordValid && password.length > 0 && (
                        <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </ErrorMessageWrap>

                <BottomButton style={{ marginTop: "26px" }} type="submit" disabled={notAllow}>
                    로그인
                </BottomButton>
                </form>

                <FindInfoWrap>
                    <a href="#!" onClick={handleSignUpClick} >회원가입</a>
                </FindInfoWrap>
                
                <Space />
            </ContentWrap>

        </Page>
    )
}