import React, { useState, useEffect } from "react";
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
    width: 500px;
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
    align-items: center;

    label {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
        color: #348a8c;
        text-align: left;
        min-width: 100px;
    }

    input {
        flex: 2;
        padding: 10px;
        border: 1px solid #348a8c;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
    }

    button {
        padding: 10px 12px;
        background-color: #348a8c;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
        cursor: pointer;
        margin-left: 10px;

        &:disabled {
            background-color: #b0b0b0;
            cursor: not-allowed;
        }
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
    background-color: ${(props) => (props.disabled ? '#b0b0b0' : '#348a8c')};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    margin-top: 20px;

    &:hover {
        background-color: ${(props) => (props.disabled ? '#b0b0b0' : '#267073')};
    }
`;


const Space = styled.div`
    margin-top: 20px;
`;

function Register() {
    const { registerUser, checkUsernameAvailability, sendVerificationCode, verifyCode } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        nickname: "",
        birthYear: "2024",
        birthMonth: "01",
        birthDay: "01",
        email: "",
        verificationCode: ""  // 인증번호 입력 필드
});

const [usernameValid, setUsernameValid] = useState(true);
const [usernameAvailable, setUsernameAvailable] = useState(true);  // 아이디 중복 체크
const [passwordValid, setPasswordValid] = useState(true);
const [passwordsMatch, setPasswordsMatch] = useState(true);
const [emailValid, setEmailValid] = useState(false);
const [codeValid, setCodeValid] = useState(false);  // 인증번호 유효성
const [timer, setTimer] = useState(null);  // 타이머를 저장할 상태
const [timeLeft, setTimeLeft] = useState(120);  // 2분 (120초) 타이머
const [formValid, setFormValid] = useState(false);
const [verificationError, setVerificationError] = useState("");

const navigate = useNavigate();

const handleChange = async (e) => { // 사용자 입력값 업데이트
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 아이디 형식 확인 (영문과 숫자만 포함)
    if (name === "username") {
        const usernamePattern = /^[a-zA-Z0-9]{4,}$/; // 영문, 숫자 포함 4자 이상
        const isValid = usernamePattern.test(value); // 아이디 형식이 유효한지 확인
        setUsernameValid(isValid);

        if (!isValid) {
            setUsernameAvailable(true); // 형식이 틀리면 중복 여부와 상관 없음
        }
    }

    // 비밀번호 형식 확인(영문, 숫자, 특수문자 포함 8자 이상 입력)
    if (name === "password") {
        const passwordPattern =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPasswordValid(passwordPattern.test(value));
    }

    // 비밀번호와 비밀번호 확인 일치 여부 확인
    if (name === "password" || name === "confirmPassword") {
        setPasswordsMatch(value === (name === "password" ? formData.confirmPassword : formData.password));
    }

    // 이메일 형식 확인
    if (name === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailPattern.test(value);
        setEmailValid(emailPattern.test(value));

        // 이메일이 유효하지 않다면 타이머를 중지하고 초기화
        if (!isEmailValid && timer) {
            clearTimeout(timer);
            setTimer(null);
            setTimeLeft(120);
        }
    }

    // 인증번호 형식 확인 (6자리 영문+숫자)
    if (name === "verificationCode") {
        const codePattern = /^[A-Za-z0-9]{6}$/;
        setCodeValid(codePattern.test(value));
    }
};

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인
        const allFieldsFilled = 
            formData.username && 
            formData.password && 
            formData.confirmPassword && 
            formData.name && 
            formData.nickname && 
            formData.birthYear && 
            formData.birthMonth && 
            formData.birthDay &&
            formData.email &&
            formData.verificationCode;

        const formIsValid = usernameValid && usernameAvailable && passwordValid && passwordsMatch && emailValid  && codeValid && allFieldsFilled;

        setFormValid(formIsValid);
    }, [formData, usernameValid, usernameAvailable, passwordValid, passwordsMatch, emailValid, codeValid]);

    const handleSubmit = (e) => { 
        e.preventDefault();

        const fullName = formData.name;
        const userNickname = formData.nickname;
        const userBirthdate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;

        if (formValid) {
            registerUser(formData.username, formData.password, formData.confirmPassword, fullName, userNickname, userBirthdate, formData.email);
            navigate('/'); // 로그인 전 메인페이지로 이동
        } else {
            console.log("Invalid form submission");
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

    const handleSendVerificationCode = async () => {
        try {
            await sendVerificationCode(formData.email);
            setTimeLeft(120);  // 타이머를 다시 2분으로 설정
            setTimer(true); // 타이머를 활성화
            
            console.log("인증번호가 이메일로 전송되었습니다.");
        } catch (error) {
            console.error("인증번호 전송 중 오류 발생:", error);
        }
    };
    
    useEffect(() => {
        if (timer && timeLeft > 0) {
            const countdown = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(countdown);
        } else if (timeLeft === 0) {
            setTimer(false); // 타이머가 0에 도달하면 타이머를 비활성화
        }
    }, [timer, timeLeft]);

    const handleVerifyCode = async () => {
        try {
            const isValid = await verifyCode(formData.email, formData.verificationCode);
            if (isValid) {
                setVerificationError("");
                setCodeValid(true); // 인증이 성공하면 codeValid를 true로 설정
                console.log("인증이 완료되었습니다.");
            } else {
                setVerificationError("인증번호가 올바르지 않습니다.");
                setCodeValid(false); // 인증이 실패하면 codeValid를 false로 설정
            }
        } catch (error) {
            console.error("인증번호 확인 중 오류 발생:", error);
            setVerificationError("인증번호가 올바르지 않습니다.");
            setCodeValid(false);
        }
    };

    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    return (
        <>
        <Page>
        <Container>
            <Title>회원가입</Title>
            <Divider />
            <form onSubmit={handleSubmit}>
            <FormGroup>
                <label>아이디</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <input
                    type="text"
                    name="username"
                    placeholder="영문, 숫자 포함 4자 이상 입력"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ flex: 1, marginRight: '10px' }} 
                />
                <button
                    type="button"
                    onClick={async () => {
                        if (usernameValid && formData.username) { // 아이디 형식이 유효한 경우에만 실행
                            try {
                                const available = await checkUsernameAvailability(formData.username);
                                setUsernameAvailable(available);
                                if (available) {
                                    alert("사용 가능한 아이디입니다.");
                                } else {
                                    alert("이미 사용 중인 아이디입니다.");
                                }
                            } catch (error) {
                                console.error("아이디 중복 확인 중 오류 발생:", error);
                            }
                        } else {
                            alert("아이디 형식이 올바르지 않습니다.");
                        }
                    }}
                    disabled={!usernameValid || !formData.username.length === 0} // 아이디 형식이 올바르지 않으면 버튼 비활성화
                    style={{
                        backgroundColor: usernameValid && formData.username.length > 0 ? '#348a8c' : '#b0b0b0', // 유효할 때만 색상 변경
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 12px',
                        borderRadius: '4px',
                        cursor: usernameValid && formData.username.length ? 'pointer' : 'not-allowed',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        width: '120px',
                    }}
                >
                    아이디 중복 체크
                </button>
            </div>
            </FormGroup>
            {!usernameValid && formData.username && (
                <ErrorMessage>올바른 아이디 형식이 아닙니다</ErrorMessage>
            )}
            {usernameValid && !usernameAvailable && (
                <ErrorMessage>이미 사용 중인 아이디입니다.</ErrorMessage>
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

            <Space />
            

            <FormGroup style={{ justifyContent: 'flex-end' }}>
                <label>이메일</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일 입력"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ flex: 1, marginRight: '10px' }}  // 입력칸의 크기를 조절하여 버튼과 동일한 줄에 배치
                />
                <button type="button" 
                    onClick={handleSendVerificationCode} 
                    disabled={!emailValid}  // 이메일 유효성에 따라 버튼 활성화 여부 결정
                    style={{ 
                        backgroundColor: emailValid ? '#2f6877' : '#b0b0b0',
                        color: '#ffffff',
                        border: 'none', 
                        padding: '12px 10px', 
                        borderRadius: '4px',
                        marginLeft: '10px', // 입력칸과 버튼 사이의 간격 추가
                        cursor: emailValid ? 'pointer' : 'not-allowed',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                >
                    인증번호 받기
                </button>
                </div>
            </FormGroup>
            <Space />

            <FormGroup style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    name="verificationCode"
                    placeholder="인증번호 입력"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    required
                    style={{ flex: 1, marginRight: '10px' }}  // 입력칸의 크기를 조절하여 버튼과 동일한 줄에 배치
                />
                {timer && (
                    <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#348a8c' }}>
                        {formatTime(timeLeft)}
                    </span>
                )}
                <button type="button" 
                    onClick={handleVerifyCode} 
                    disabled={!codeValid}  // 인증번호 유효성에 따라 버튼 활성화 여부 결정
                    style={{ 
                        backgroundColor: codeValid ? '#348a8c' : '#b0b0b0',
                        color: '#ffffff',
                        border: 'none', 
                        padding: '12px 10px', 
                        borderRadius: '4px',
                        marginLeft: '10px', // 입력칸과 버튼 사이의 간격 추가
                        cursor: codeValid ? 'pointer' : 'not-allowed',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                >
                    인증하기
                </button>
                </div>
                {verificationError && (
                    <ErrorMessage>{verificationError}</ErrorMessage>
                )}
            </FormGroup>

            <SubmitButton type="submit" disabled={!formValid}>
                가입하기
            </SubmitButton>
            </form>
        </Container>
        </Page>
        </>
    );
}

export default Register;
