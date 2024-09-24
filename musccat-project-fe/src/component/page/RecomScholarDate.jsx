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
`;

const Space = styled.div`
    height: 80px; /* 여백 크기 설정 */
`;

const Button = styled.button`
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    display: block;
    margin: 0 auto;

    &:hover {
        background-color: #2a6d6e;
    }
`;
const RecomSchoalrDate = () => {

    const [recruitmentStart, setRecruitmentStart] = useState("");
    const [recruitmentEnd, setRecruitmentEnd] = useState("");

    const handleStartChange = (e) => {
        setRecruitmentStart(e.target.value);
    };

    const handleEndChange = (e) => {
        setRecruitmentEnd(e.target.value);
    };

    const handleSubmit = () => {
        
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
                    placeholder="시작 날짜"
                />
                <DateText>~</DateText>
                <Input
                    type="date"
                    value={recruitmentEnd}
                    onChange={handleEndChange}
                    placeholder="종료 날짜"
                />
            </DateRow>
            <InfoBox>
                <p>* 원하는 기간을 선택해주세요</p>
                <p>* 기간 입력 후 '추천 받기' 버튼을 눌러주세요</p>
            </InfoBox>
            <Button onClick={handleSubmit}>추천 받기</Button>
        </PageWrapper>
        </>

    );

};

export default RecomSchoalrDate;