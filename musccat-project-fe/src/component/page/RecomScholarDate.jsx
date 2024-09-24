import React, { useEffect,useState } from 'react';
import NavBar from '../ui/NavBar';
import { useAuth } from "../contexts/AuthContext";
import styled from 'styled-components';

const PageWrapper = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    border: 1px solid #348a8c;
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
    justify-content: space-between;
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

const DateText = styled.span`
    font-size: 24px;
    line-height: 45px;
    color: #333;
`;

const InfoBox = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    background-color: #f8f8f8;
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
const RecomSchoalrDate = () => {
    const { setScholarDate } = useAuth();
    const [recruitmentStart, setRecruitmentStart] = useState("");
    const [recruitmentEnd, setRecruitmentEnd] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(recruitmentStart.trim() !== "" && recruitmentEnd.trim() !== "");
    }, [recruitmentStart, recruitmentEnd]);

    const handleStartChange = (e) => {
        setRecruitmentStart(e.target.value);
        // recruitmentEnd가 recruitmentStart보다 이전이면 초기화
        if (recruitmentEnd && e.target.value > recruitmentEnd) {
            setRecruitmentEnd("");
        }
    };

    const handleEndChange = (e) => {
        setRecruitmentEnd(e.target.value);
        // recruitmentStart가 recruitmentEnd보다 이후면 초기화
        if (recruitmentStart && e.target.value < recruitmentStart) {
            setRecruitmentStart("");
        }
    };

    const handleSubmit = async() => {
        const scholarshipPeriod = {
            recruitment_start: recruitmentStart,
            recruitment_end: recruitmentEnd
        };  

        try {
            const response = await setScholarDate(scholarshipPeriod);
            if (response && response.status === 201) {
                alert("추천 기간 설정이 완료되었습니다.");
            } else {
                alert("기간 설정에 실패하였습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
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
                    value={recruitmentStart}
                    onChange={handleStartChange}
                    min="2024-01-01" 
                    max={recruitmentEnd || "2099-12-31"} 
                    placeholder="시작 날짜"
                />
                <DateText>~</DateText>
                <Input
                    type="date"
                    value={recruitmentEnd}
                    onChange={handleEndChange}
                    min={recruitmentStart || "2024-01-01"}
                    placeholder="종료 날짜"
                />
            </DateRow>
            <InfoBox>
                <p>* 원하는 기간을 선택해주세요</p>
                <p>* 기간 입력 후 '추천 받기' 버튼을 눌러주세요</p>
            </InfoBox>
            <Button 
                onClick={handleSubmit}
                disabled={!isFormValid}>
            추천 받기
            </Button>
        </PageWrapper>
        </>

    );

};

export default RecomSchoalrDate;