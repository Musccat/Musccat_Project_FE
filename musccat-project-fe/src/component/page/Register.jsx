import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    align-items: center;
    margin-bottom: 30px;

    label {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
        color: #348a8c;
        margin-bottom: 8px;
    }

    input,
    select {
        flex: 2;
        padding: 10px;
        border: 1px solid #348a8c;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
        margin-bottom: 5px;
    }
`;
const ErrorMessage = styled.div`
    color: #ef0000;
    font-size: 12px;
    margin: -15px 0 15px 0;
    text-align: left;
    width: 100%;
`;

const Timer = styled.div`
    display: flex;
    align-items: center;
    color: #348a8c;
    font-size: 14px;
    font-weight: bold;
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

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        nickname: "",
        birthYear: "2024",
        birthMonth: "01",
        birthDay: "01",
});

const [passwordsMatch, setPasswordsMatch] = useState(true);

const navigate = useNavigate();

const handleChange = (e) => { // 사용자 입력값 업데이트
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 비밀번호와 비밀번호 확인 일치 여부 확인
    if (name === "password" || name === "confirmPassword") {
        setPasswordsMatch(formData.password === value || formData.confirmPassword === value);
    }
};
const handleSubmit = (e) => { 
    e.preventDefault();

    // 모든 필드가 채워졌는지 확인
    const allFieldsFilled = 
        formData.email && 
        formData.password && 
        formData.confirmPassword && 
        formData.name && 
        formData.nickname && 
        formData.birthYear && 
        formData.birthMonth && 
        formData.birthDay;

    if (passwordsMatch && allFieldsFilled) {
        console.log(formData);
        navigate('/'); // 로그인 전 메인페이지로 이동
    } else {
        console.log("Passwords do not match or some fields are empty");
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
                <label>이메일 주소</label>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일 입력"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </FormGroup>

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

