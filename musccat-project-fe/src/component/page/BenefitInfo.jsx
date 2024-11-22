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
    white-space: pre-wrap; /* 줄바꿈과 공백을 유지하며 텍스트를 감쌈 */
    word-break: break-word; /* 긴 단어가 넘치지 않도록 강제로 줄바꿈 */
    overflow-wrap: break-word; /* 최신 브라우저 지원 */
    overflow: hidden; /* 넘치는 내용을 숨김 */
    display: block;
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

const BenefitInfo = () => {
    const { product_id } = useParams();  // URL에서 id 파라미터 가져오기
    const { benefitInfos, fetchBenefitInfos, deleteBenefitInfo, fetchScholarDetail, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);
    const [benefitInfoData, setBenefitInfoData] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false); // 구독 여부 상태
    const [isBlurred, setIsBlurred] = useState(false); // Blur 상태 관리

    useEffect(() => {
        // API 호출
        const fetchData = async () => {
            try {
                if (product_id) {
                    // Fetch benefit infos
                    const response = await fetchBenefitInfos(product_id);
                    setIsSubscribed(response.is_subscribed);
                    setBenefitInfoData(response.reviews || []);

                    // 구독 상태에 따라 Blur 설정
                    setIsBlurred(!response.is_subscribed);
                    console.log("isBlurred set to:", !response.is_subscribed); // 디버깅용

                    // Fetch scholarship details
                    const scholarResponse = await fetchScholarDetail(product_id);
                    setScholarship(scholarResponse.scholarship || null);
                } else {
                    console.error("product_id is undefined");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [product_id, fetchBenefitInfos, fetchScholarDetail]);


    if (loading) {
        return <div>Loading...</div>;  // 로딩 중일 때 표시
    }

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

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                수혜자 {index + 1}
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
                                {isSubscribed ? (
                                    <>
                                {/* 구독한 사용자에게만 보이는 내용 */}
                                <InfoSection>
                                    <DarkGrayInfoLabel>{info.year}년도 수혜자</DarkGrayInfoLabel>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>소득 분위</InfoLabel>
                                    <InfoDetail>{info.income}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>대학 유형</InfoLabel>
                                    <InfoDetail>{info.univCategory}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>학과 계열</InfoLabel>
                                    <InfoDetail>{info.majorCategory}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>수료 학기</InfoLabel>
                                    <InfoDetail>{info.semesterCategory}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>전체 성적</InfoLabel>
                                    <InfoDetail>{info.totalGPA}</InfoDetail>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>합격 팁</InfoLabel>
                                    <InfoDetailWrapper>
                                    <InfoDetail>{info.advice}</InfoDetail>
                                    </InfoDetailWrapper>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>면접 팁</InfoLabel>
                                    <InfoDetail>{info.interviewTip}</InfoDetail>
                                </InfoSection>
                                </>
                            ) : (
                            <>
                                {/* 구독하지 않은 사용자에게 보여주는 내용 */}
                                <InfoSection>
                                    <DarkGrayInfoLabel>{info.year}년도 수혜자</DarkGrayInfoLabel>
                                </InfoSection>
                                <InfoSection>
                                    <InfoLabel>소득 분위</InfoLabel>
                                    <InfoDetail isBlurred={isBlurred}>{info.income}</InfoDetail>
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
                                </>
                            )}
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