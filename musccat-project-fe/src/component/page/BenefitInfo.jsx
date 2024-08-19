import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";

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
const RegisterButton = styled.button`
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

    return (
        <>
        <NavBar />
        <PageWrapper>
        <Title>2024 상반기 광주시 빛고을 장학</Title>
        <RegisterButtonContainer>
            <RegisterButton>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146 0.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm-.793 3.207L3.5 11.207V12.5h1.293l7.854-7.854-1.293-1.293zM1 13.5V12h1.5l-2 2 2 2H1v-1.5z"/>
                </svg>
                등록하기
            </RegisterButton>
        </RegisterButtonContainer>

        <Card>
            <CardHeader>
                dxv****님의 정보
                <LikeButton>좋아요</LikeButton>
            </CardHeader>
            <CardContent>
                <InfoSection>
                <InfoLabel>2023년 수혜자</InfoLabel>
                </InfoSection>
                <InfoSection>
                <InfoLabel>기본 정보</InfoLabel>
                <InfoDetail>소득분위 3분위, 다문화 가정</InfoDetail>
                </InfoSection>
                <InfoSection>
                <InfoLabel>합격 팁</InfoLabel>
                <InfoDetail>
                    일단 지원서는 각 문항당 500자 이상씩 꼼꼼하게 답변을 적었어요. 제 전공과 관련해서 봉사활동을 했던 경험을 녹여 각 문항을 작성했는데 그 부분을 특히나 긍정적으로 평가해주신 것 같더라고요.
                </InfoDetail>
                </InfoSection>
                <InfoSection>
                <InfoLabel>면접 팁</InfoLabel>
                <InfoDetail>
                    면접 때 떨지 않고 차분하게 심사위원의 질문에 대한 답변도 좋은 결과를 얻을 수 있어요.
                </InfoDetail>
                </InfoSection>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                zay****님의 정보
                <LikeButton>좋아요</LikeButton>
            </CardHeader>
            <CardContent>
                <InfoSection>
                <InfoLabel>2021년 수혜자</InfoLabel>
                </InfoSection>
                <InfoSection>
                <InfoLabel>기본 정보</InfoLabel>
                <InfoDetail>소득분위 6분위, 한부모 가정</InfoDetail>
                </InfoSection>
                <InfoSection>
                <InfoLabel>합격 팁</InfoLabel>
                <InfoDetail>
                    일단 지원서는 각 문항당 500자 이상씩 꼼꼼하게 답변을 적었어요. 제 전공과 관련해서 봉사활동을 했던 경험을 녹여 각 문항을 작성했는데 그 부분을 특히나 긍정적으로 평가해주신 것 같더라고요.
                </InfoDetail>
                </InfoSection>
                <InfoSection>
                <InfoLabel>면접 팁</InfoLabel>
                <InfoDetail>
                    면접 때 떨지 않고 차분하게 심사위원의 질문에 대한 답변도 좋은 결과를 얻을 수 있어요.
                </InfoDetail>
                </InfoSection>
            </CardContent>
            </Card>
        </PageWrapper>
        </>
    );

};

export default BenefitInfo;