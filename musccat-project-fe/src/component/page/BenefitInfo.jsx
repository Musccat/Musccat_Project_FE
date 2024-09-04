import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
`;

const InfoDetail = styled.div`
    color: #666;
    flex-grow: 1;
    white-space: normal;
`;

const BenefitInfo = () => {
    const { product_id } = useParams();  // URL에서 id 파라미터 가져오기
    const { benefitInfos, fetchBenefitInfos, deleteBenefitInfo, scholarships, fetchScholarships, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // product_id가 존재할 때만 API 호출
        if (product_id) {
            fetchBenefitInfos(product_id).finally(() => setLoading(false)); 
        } else {
            console.error("product_id is undefined");
            setLoading(false);  // 로딩 상태 해제
        }
    }, [product_id, fetchBenefitInfos]);

    useEffect(() => {
        // 장학금 정보를 불러오는 함수가 필요하다면 추가적으로 호출
        if (!scholarships || scholarships.length === 0) {
            fetchScholarships(); // fetchScholarships를 호출하여 scholarships 데이터를 가져옴
        }
    }, [fetchScholarships, scholarships]);

    if (loading) {
        return <div>Loading...</div>;  // 로딩 중일 때 표시
    }

    // benefitInfos에서 해당 product_id에 대한 정보 가져오기
    const benefitInfoData = Array.isArray(benefitInfos[product_id]) ? benefitInfos[product_id] : [];

    // scholarships에서 해당 product_id에 맞는 장학금 정보 가져오기
    const scholarship = Array.isArray(scholarships)
        ? scholarships.find(scholar => scholar.id === parseInt(product_id))
        : null;

    // 장학 정보 삭제 핸들러 함수
    // benefit_id(수혜 정보 고유 id)
    const handleDelete = (benefit_id) => {
        if (window.confirm("정말 이 정보를 삭제하시겠습니까?")) {
            deleteBenefitInfo(product_id, benefit_id);
        }
    };

    // 장학 정보 수정
    const handleEdit = (info) => {
        navigate("/reviews", { state: { info } }); // 수정할 데이터를 state로 전달
    };

    return (
        <>
        <NavBar />
        <PageWrapper>
        <Title>
            {scholarship?.name || "장학금명"}
            <FoundationName>{scholarship?.foundation_name || "장학재단명"}</FoundationName>
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
                                {info.user.username}님의 정보
                                <ButtonGroup>
                                <LikeButton>좋아요</LikeButton>
                                {user?.id === info.user.id && (
                                    <>
                                        <EditButton onClick={() => handleEdit(info)}>수정</EditButton>
                                        <DeleteButton onClick={() => handleDelete(info.id)}>삭제</DeleteButton>
                                    </>
                                )}
                                </ButtonGroup>
                            </CardHeader>
                            <CardContent>
                                <InfoSection>
                                    <DarkGrayInfoLabel>{info.year}년 수혜자</DarkGrayInfoLabel>
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
                    ))
                ) : (
                    <div>해당 장학금에 대한 수혜 정보가 없습니다.</div>
                )}
            </PageWrapper>
        </>
    );
};

export default BenefitInfo;