import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #ffffff;
`;

const Container = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 40px;
    width: 400px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #348a8c;
    text-align: center;
    margin-bottom: 20px;
`;

const Divider = styled.hr`
    border: 1px solid #348a8c;
    margin-bottom: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: center;

    label {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
        color: #348a8c;
        text-align: left;
    }

    input {
        flex: 2;
        padding: 10px;
        border: 1px solid #348a8c;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
    }
`;


const ErrorMessage = styled.div`
    color: #ef0000;
    font-size: 12px;
    height: 16px;
    text-align: right;
    margin-bottom: 20px;
`;

const BirthDateGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    select {
        padding: 10px;
        border: 1px solid #348a8c;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
    }

    select[name="birthYear"] {
        flex: 2; /* 년도 칸을 더 길게 설정 */
        margin-right: 10px;
    }

    select[name="birthMonth"],
    select[name="birthDay"] {
        flex: 1; /* 월과 일 칸은 동일한 길이로 설정 */
        margin-right: 10px;
    }

    select[name="birthMonth"],
    select[name="birthDay"],
    select[name="birthYear"] {
        max-height: 200px;
        overflow-y: auto;
    }

`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #348a8c;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
`;

const Space = styled.div`
    margin-top: 20px;
`;

function Register() {
    const { registerUser } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        nickname: "",
        birthYear: "2024",
        birthMonth: "01",
        birthDay: "01",
});

const [usernameValid, setUsernameValid] = useState(true);
const [passwordValid, setPasswordValid] = useState(true);
const [passwordsMatch, setPasswordsMatch] = useState(true);

const navigate = useNavigate();

const handleChange = (e) => { // 사용자 입력값 업데이트
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 아이디 형식 확인 (영문과 숫자만 포함)
    if (name === "username") {
        const usernamePattern = /^[a-zA-Z0-9]{4,}$/;
        setUsernameValid(usernamePattern.test(value));
    }

    // 비밀번호 형식 확인(영문, 숫자, 특수문자 포함 8자 이상 입력)
    if (name === "password") {
        const passwordPattern =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPasswordValid(passwordPattern.test(value));
    }

    // 비밀번호와 비밀번호 확인 일치 여부 확인
    if (name === "password" || name === "confirmPassword") {
        setPasswordsMatch(formData.password === value || formData.confirmPassword === value);
    }



};
const handleSubmit = (e) => { 
    e.preventDefault();

    // 모든 필드가 채워졌는지 확인
    const allFieldsFilled = 
        formData.username && 
        formData.password && 
        formData.confirmPassword && 
        formData.name && 
        formData.nickname && 
        formData.birthYear && 
        formData.birthMonth && 
        formData.birthDay;

    const fullName = formData.name;
    const userNickname = formData.nickname;
    const userBirthdate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;

    if (usernameValid && passwordValid && passwordsMatch && allFieldsFilled) {
        registerUser(formData.username, formData.password, formData.confirmPassword,fullName, userNickname, userBirthdate );
        navigate('/'); // 로그인 전 메인페이지로 이동
    } else {
        console.log("InValid username or password / Passwords don't match / Some fields are empty");
    }
};

const years = [];
    for (let i = 1910; i <= 2024; i++) {
        years.push(i);
    }

    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(String(i).padStart(2, "0"));
    }

    const days = [];
    for (let i = 1; i <= 31; i++) {
        days.push(String(i).padStart(2, "0"));
    }

    return (
        <Page>
        <Container>
            <Title>회원가입</Title>
            <Divider />
            <form onSubmit={handleSubmit}>
            <FormGroup>
                <label>아이디</label>
                <input
                    type="text"
                    name="username"
                    placeholder="영문, 숫자 포함 4자 이상 입력"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            {!usernameValid && formData.username && (
                <ErrorMessage>올바른 아이디 형식이 아닙니다</ErrorMessage>
            )}
            <Space/>

            <FormGroup>
                <label>비밀번호</label>
                <input
                type="password"
                name="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </FormGroup>
            {!passwordValid && formData.password && (
                <ErrorMessage>올바른 비밀번호 형식이 아닙니다</ErrorMessage>
            )}
            <Space />

            <FormGroup>
                <label>비밀번호 확인</label>
                <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 중복 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
            </FormGroup>
            {!passwordsMatch && formData.confirmPassword && (
                <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
            <Space />

            <FormGroup>
                <label>이름</label>
                <input
                type="text"
                name="name"
                placeholder="이름 입력"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </FormGroup>

            <Space />

            <FormGroup>
                <label>닉네임</label>
                <input
                type="text"
                name="nickname"
                placeholder="닉네임 입력"
                value={formData.nickname}
                onChange={handleChange}
                required
                />
            </FormGroup>

            <Space />

            <FormGroup>
                <label>생년월일</label>
                <BirthDateGroup>
                <select
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    required
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select
                    name="birthMonth"
                    value={formData.birthMonth}
                    onChange={handleChange}
                    required
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>  
                <select
                    name="birthDay"
                    value={formData.birthDay}
                    onChange={handleChange}
                    required
                >
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
                </BirthDateGroup>
            </FormGroup>

            <SubmitButton type="submit">가입하기</SubmitButton>
            </form>
        </Container>
        </Page>
    );
}

export default Register;

