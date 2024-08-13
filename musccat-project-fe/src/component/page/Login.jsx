import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import logo from '../ui/SCHOLLI_logo.jpeg';
import appleLogo from '../ui/Apple.jpeg';
import googleLogo from '../ui/Google.jpeg';
import kakaoLogo from '../ui/Kakao.jpeg';

const User = {
    username: 'kimkt',
    pw: 'ewha1234@@'
}

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

const OptionsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 8px;
`;

const AutoLoginWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 왼쪽 정렬 */
    font-size: 12px;
    color: #262626;
    margin-left: 5px;

    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 16px;
        height: 16px;
        border: 1px solid #348a8c;
        border-radius: 50%; /* 둥근 체크박스 */
        outline: none;
        cursor: pointer;
        margin-right: 8px; /* 체크박스와 텍스트 간의 간격 조정 */
        display: inline-block;
        vertical-align: middle;
        position: relative;
    }

    input[type="checkbox"]:checked {
        background-color: #348a8c;
        border: none;
    }

    input[type="checkbox"]:checked::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px; /* 체크된 원의 크기 */
        height: 8px;
        background-color: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }


    label {
        display: flex;
        align-items: center; /* 같은 줄에 배치 */
    }
`;

const FindInfoWrap = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-right: 10px;

    .separator {
        margin: 0 8px;
        color: #dadada; /* 구분선 색상 */
    }

    a {
        font-size: 12px;
        color: #348a8c;
        text-decoration: none;
    }
`;

const SocialLoginWrap = styled.div`
    text-align: center;
    margin-top: 16px;

    p {
        font-size: 14px;
        color: #262626;
        margin-bottom: 8px;
    }

    img {
        width: 50px;
        height: 50px;
        margin: 0 8px;
        cursor: pointer;
    }
`;

const Space = styled.div`
    margin-top: 32px;
`;

export default function Login() {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    const [usernameValid, setUsernameValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleUsername = (e) => {
        setUsername(e.target.value);
        const regex = /^[a-zA-Z0-9]{4,}$/;
        if (regex.test(e.target.value)) {
            setUsernameValid(true);
        }
        else {
            setUsernameValid(false);
        }
    }

    const handlePassword = (e) => {
        setPw(e.target.value);
        const regex = 
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        }
        else {
            setPwValid(false);
        }
    }

    const onClickConfirmButton = () => {
        if(username === User.username && pw === User.pw) {
            alert('로그인에 성공했습니다.');
            login();
            navigate('/main');
        }
        else if (username === User.username && pw !== User.pw) {
            alert('비밀번호가 맞지 않습니다.');
        }
        else {
            alert('등록되지 않은 회원입니다.');
        }
    }

    useEffect(() => {
        if(usernameValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [usernameValid, pwValid]);

    const handleSignUpClick = () => {
        navigate('/register');  // 회원가입 페이지로 이동
    }

    return (
        <Page>
            <TitleWrap>
                <img src={logo} alt="SCHOLLI Logo" />
                
            </TitleWrap>
            <ContentWrap>
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
                        value={pw}
                        onChange={handlePassword}/>
                </InputWrap>
                <ErrorMessageWrap>
                    {!pwValid && pw.length > 0 && (
                        <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </ErrorMessageWrap>

                <BottomButton style={{ marginTop: "26px" }} onClick={onClickConfirmButton} disabled={notAllow}>
                    로그인
                </BottomButton>
                <OptionsWrap>
                <AutoLoginWrap>
                    <label>
                        <input type="checkbox" /> 자동 로그인
                    </label>
                </AutoLoginWrap>

                <FindInfoWrap>
                    <a href="#!">아이디 찾기</a>
                    <span className="separator">|</span>
                    <a href="#!">비밀번호 찾기</a>
                    <span className="separator">|</span>
                    <a href="#!" onClick={handleSignUpClick} >회원가입</a>
                </FindInfoWrap>
                </OptionsWrap>
                
                <Space />
                <SocialLoginWrap>
                <p>sign up with</p>
                <Space />
                <img src={appleLogo} alt="Apple" />
                <img src={googleLogo} alt="Google" />
                <img src={kakaoLogo} alt="Kakao" />
                </SocialLoginWrap>
            </ContentWrap>

        </Page>
    )
}