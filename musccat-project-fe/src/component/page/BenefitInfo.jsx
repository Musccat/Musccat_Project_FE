import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import { Link, useParams } from "react-router-dom";
import scholarships from "../data/scholarshipdata";
import benefitinfo from "../data/benefitinfo";
import { useAuth } from "../contexts/AuthContext";

const PageWrapper = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;
const RegisterButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;  // 우측 정렬
    margin-bottom: 20px;
`;
const RegisterButton = styled(Link)`
    display: flex;
    align-items: center;
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 20px;
    text-decoration: none;
    svg {
        margin-right: 8px;
    }
`;

const Card = styled.div`
    background-color: #white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    padding: 20px;
    margin-bottom: 20px;
    width: 50%; 
    margin: 0 auto 20px auto;
`;

const CardHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const CardContent = styled.div`
    font-size: 14px;
    color: #666;
    line-height: 1.5;
`;

const LikeButton = styled.button`
    background-color: #f1f1f1;
    color: #348a8c;
    border: none;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 10px;
`;

const InfoSection = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    flex-wrap: nowrap;
`;

const InfoLabel = styled.div`
    font-weight: bold;
    color: #333;
    margin-right: 20px;
    white-space: nowrap;
    min-width: 50px;
`;

const InfoDetail = styled.div`
    color: #666;
    flex-grow: 1;
    white-space: normal;
`;

const BenefitInfo = () => {
    const { id } = useParams();  // URL에서 id 파라미터 가져오기
    const { benefitInfos } = useAuth();

    // id에 따라 benefitinfo 데이터 필터링
    const benefitInfoData = benefitinfo.filter(benefitinfo => benefitinfo.id === id);

    const scholarship = scholarships.find(scholar => scholar.id === id);
    
    if (!benefitInfoData || benefitInfoData.length === 0) {
        return <div>해당 장학금에 대한 수혜 정보가 없습니다.</div>;
    }

    return (
        <>
        <NavBar />
        <PageWrapper>
        <Title>{scholarship?.businessname}</Title>
        
        <RegisterButtonContainer>
            <RegisterButton to="/beneinforegister">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146 0.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm-.793 3.207L3.5 11.207V12.5h1.293l7.854-7.854-1.293-1.293zM1 13.5V12h1.5l-2 2 2 2H1v-1.5z"/>
                </svg>
                등록하기
            </RegisterButton>
        </RegisterButtonContainer>

        {benefitInfoData.map((info, index) => (
            <Card key={index}>
            <CardHeader>
                {info.username}님의 정보
                <LikeButton>좋아요</LikeButton>
            </CardHeader>
            <CardContent>
                <InfoSection>
                <InfoLabel>{info.year}년 수혜자</InfoLabel>
                </InfoSection>
                <InfoSection>
                <InfoLabel>기본 정보</InfoLabel>
                <InfoDetail>{info.basicInfo}</InfoDetail>
                </InfoSection>
                <InfoSection>
                <InfoLabel>합격 팁</InfoLabel>
                <InfoDetail>{info.advice}</InfoDetail>
                </InfoSection>
                <InfoSection>
                <InfoLabel>면접 팁</InfoLabel>
                <InfoDetail>{info.interviewTip}</InfoDetail>
                </InfoSection>
            </CardContent>
        </Card>
    ))}
    </PageWrapper>
    </>
    );

};

export default BenefitInfo;