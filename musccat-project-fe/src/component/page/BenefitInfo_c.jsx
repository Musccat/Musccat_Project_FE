import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import { Link, useParams } from "react-router-dom";
import benefitinfo from "../data/benefitinfo";

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
    display: flex;
    align-items: center;
`;

const FoundationName  = styled.span`
    font-size: 18px;
    font-weight: normal;
    color: #888; 
    margin-left: 60px; 
    margin-top: 5px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardContent = styled.div`
    font-size: 14px;
    color: #666;
    line-height: 1.5;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-left: auto;
`;

const LikeButton = styled.button`
    background-color: #348a8c;
    color: #348a8c;
    border: none;
    padding: 4px 8px;
    font-size: 12px;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 10px;
`;

const EditButton = styled.button`
    background-color: white;
    color: #348a8c;
    border: 1px solid #348a8c;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
`;

const DeleteButton = styled.button`
    background-color: white;
    color: #2f6877;
    border: 1px solid #2f6877;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
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

const DarkGrayInfoLabel = styled(InfoLabel)`
    color: #555;  
    font-weight: normal;
`;

const InfoDetailWrapper = styled.div`
    position: relative; /* OverlayMessage가 이 컨테이너를 기준으로 배치 */
    flex-grow: 1;
`;

const InfoDetail = styled.div`
    color: #666;
    flex-grow: 1;
    white-space: normal;
    filter: ${(props) => (props.isBlurred ? "blur(4px)" : "none")}; /* Blur 효과 */
    transition: filter 0.3s ease-in-out; /* 부드러운 전환 효과 */
`;

const OverlayMessage = styled.div`
    display: ${(props) => (props.showMessage ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #2f4858; /* 문구는 뚜렷하게 */
    background-color: rgba(255, 255, 255, 0.1); /* 반투명 배경 */
    font-size: 18px;
    font-weight: bold;
    z-index: 1; /* 문구를 블러 처리 위에 표시 */
    pointer-events: none; /* 문구가 클릭을 방해하지 않도록 */
`;

const BenefitInfo_c = () => {
    const { product_id } = useParams();  // URL에서 id 파라미터 가져오기
    const [benefitInfoData, setBenefitInfoData] = useState([]);
    const [isBlurred, setIsBlurred] = useState(false); // Blur 상태 관리
    
    useEffect(() => {
        // product_id에 해당하는 수혜 정보 필터링
        const filteredData = benefitinfo.filter(
            (info) => info.scholarship.id.toString() === product_id
        );
        setBenefitInfoData(filteredData);

        // 특정 조건에서 Blur 효과 자동 적용
        if (filteredData.length > 0) {
            setIsBlurred(true); // 자동으로 Blur 활성화
        }
    }, [product_id]);

    

    return (
        <>
        <NavBar />
        <PageWrapper>
        <Title>
            {benefitInfoData[0]?.scholarship.name || "장학명"}
            {benefitInfoData[0]?.scholarship.foundation_name && (
                <FoundationName>{benefitInfoData[0].scholarship.foundation_name}</FoundationName>
            )}
        </Title>
        
        <RegisterButtonContainer>
            <RegisterButton to="/reviews">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146 0.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm-.793 3.207L3.5 11.207V12.5h1.293l7.854-7.854-1.293-1.293zM1 13.5V12h1.5l-2 2 2 2H1v-1.5z"/>
                </svg>
                등록하기
            </RegisterButton>
        </RegisterButtonContainer>

        {benefitInfoData.length > 0 ? (
                    benefitInfoData.map((info, index) => (
                        <Card key={index}>
                            <CardHeader>
                                수혜자 {index + 1}
                                <ButtonGroup>
                                <LikeButton>좋아요</LikeButton>
                                <EditButton>수정</EditButton>
                                <DeleteButton>삭제</DeleteButton>
                                </ButtonGroup>
                            </CardHeader>
                            <CardContent>
                                <InfoSection>
                                <DarkGrayInfoLabel>{info.year}년도 수혜자</DarkGrayInfoLabel>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>소득 분위</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.incomeBracket}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>대학 유형</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.univCategory}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>학과 계열</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.majorCategory}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>수료 학기</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.semesterCategory}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>전체 성적</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.totalGPA}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>합격 팁</InfoLabel>
                                    <InfoDetailWrapper>
                                    <InfoDetail isBlurred={isBlurred}>{info.advice}</InfoDetail>
                                    <OverlayMessage showMessage={true}>구독 후 열람 가능합니다</OverlayMessage>
                                    </InfoDetailWrapper>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>면접 팁</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.interviewTip}</InfoDetail>
                                </InfoSection>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div>해당 장학금에 대한 수혜 정보가 없습니다.</div>
                )}
            </PageWrapper>
        </>
    );
};

export default BenefitInfo_c;