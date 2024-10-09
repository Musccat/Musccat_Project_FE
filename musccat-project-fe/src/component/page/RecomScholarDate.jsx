import React, { useEffect,useState } from 'react';
import NavBar from '../ui/NavBar';
import { useAuth } from "../contexts/AuthContext";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    border: 2px solid #348a8c;
    border-radius: 10px;
    background-color: white;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #2f6877;
    margin-bottom: 20px;
`;

const DateRow = styled.div`
    display: flex;
    justify-content: center; 
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 40%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    text-align: center;
`;

const InfoBox = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    text-align: left;
    margin-bottom: 20px;
    background-color: rgba(52, 138, 140, 0.1);
    color: #2f4858;
`;

const Space = styled.div`
    height: 80px; /* 여백 크기 설정 */
`;

const Button = styled.button`
    background-color: ${(props) => (props.disabled ? "#ccc" : "#348a8c")};
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    border-radius: 5px;
    display: block;
    margin: 0 auto;

    &:hover {
        background-color: ${(props) => (props.disabled ? "#ccc" : "#2a6d6e")};
    }
`;

// 모달 스타일 정의
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    color: #348a8c;
`;


const RecomScholarDate = () => {
    const { setScholarDate } = useAuth();
    const [recruitmentEnd, setRecruitmentEnd] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [today, setToday] = useState(""); // 오늘 날짜 저장을 위한 상태
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format as yyyy-mm-dd
        setToday(formattedDate);
    }, []);

    useEffect(() => {
        setIsFormValid(recruitmentEnd.trim() !== "");
    }, [recruitmentEnd]);

    const handleEndChange = (e) => {
        setRecruitmentEnd(e.target.value);

    };

    const handleSubmit = async() => {
        if (isLoading) return; 
        setIsLoading(true);

        const scholarshipPeriod = 
            {recruitment_end: recruitmentEnd };
            console.log("Sending scholarship period:", scholarshipPeriod); // 날짜 전송 로그

        try {
            const response = await setScholarDate(scholarshipPeriod);
            console.log("Response from setScholarDate:", response); // 서버 응답 로그

            if (response && response.status === 200) {
                setIsLoading(false); // 먼저 로딩 상태를 해제
                setTimeout(() => {
                    alert("추천 기간 설정이 완료되었습니다.");
                    navigate('/recomscholar');
                }, 100);
            } else {
                setIsLoading(false);
                alert("기간 설정에 실패하였습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setIsLoading(false);
            alert("오류가 발생했습니다.");
        } 
    };

    return (
        <>
        <NavBar/>
        <Space />
        <PageWrapper>
            <Title>추천 장학금 기간 설정</Title>
            <DateRow>
                <Input
                    type="date"
                    value={recruitmentEnd}
                    onChange={handleEndChange}
                    placeholder="종료 날짜"
                />
            </DateRow>
            <InfoBox>
                <p>* 신청 기한을 설정해주세요</p>
                <p>* 선택한 기간 내 신청 가능한 장학금들을 추천드립니다</p>
                <p>* 기간 입력 후 '추천 받기' 버튼을 눌러주세요</p>
            </InfoBox>
            <Button 
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
            >
            추천 받기
            </Button>
        </PageWrapper>
        {isLoading && (
            <ModalOverlay>
                <ModalContent>로딩 중...</ModalContent>
            </ModalOverlay>
        )}
        </>

    );

};

export default RecomScholarDate;