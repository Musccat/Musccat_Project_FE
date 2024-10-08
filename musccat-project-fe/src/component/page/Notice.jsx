import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../ui/NavBar';
import Loudspeaker from '../ui/Loudspeaker.jpeg';
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";

const Container = styled.div`
    margin: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin-top: 30px;
`;

const FullWidthSection = styled.div`
    width: calc(100% + 40px); /* 컨테이너 마진을 무시하고 전체 너비로 설정 */
    margin-left: -20px; /* 컨테이너 마진을 무시하고 전체 너비로 설정 */
`;

const ScholarshipTitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    margin-left: 200px;
    margin-right: 50px;
    justify-content: space-between;
    width: 100%;
`;

const ScholarshipTitle = styled.h1`
    font-size: 2em;
    margin: 10px 0;
`;

const ScholarshipSubtitle = styled.p`
    font-size: 1em;
    color: gray;
    margin-left: 30px;
`;


const Header = styled(FullWidthSection)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

const HeartButton = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: auto;
    align-self: center;
    margin-top: 8px;
`;

const AnnouncementBar = styled(FullWidthSection)`
    background-color: #348a8c;
    color: white;
    text-align: center;
    padding: 10px 0;
    font-size: 1.2em;
    font-weight: bold;
`;

const Section = styled.div`
    margin-top: 50px;
    margin-left: 200px;
    margin-bottom: 50px;
`;

const Title = styled.h3`
    font-size: 1.7em;
    margin-bottom: 10px;
`;

const Title2 = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
`;

const Title3 = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #bfbfbf;
`;

const TitleWithIcon = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Icon = styled.img`
    margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
    width: 20px; 
    height: 20px; 
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 0px;
`;

const ListItem = styled.li`
    margin-bottom: 5px;
    font-size: 1.2em;
`;
const HighlightBox = styled.div`
    margin-left: 200px;
    margin-right: 200px;
    background-color: rgba(52, 138, 140, 0.19);
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px; /* 상단 마진 추가 */
`;

const WarningBox = styled.div`
    margin-left: 200px;
    margin-right: 200px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px; /* 상단 마진 추가 */
    border: 3px solid #e0e0e0;

    p {
        color: #bfbfbf;
        margin: 0;
    }
`;

const Space = styled.div`
    height: 20px; /* 여백 크기 설정 */
`;

const Notice = () => {
    const [scholarship, setScholarship] = useState(null);
    const { product_id } = useParams();
    const { fetchScholarDetail, handleLikeClick, likedScholarships, likes } = useAuth(); 
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [hasError, setHasError] = useState(false); 

    useEffect(() => {
        const loadScholarship = async () => {
            try{
                const response = await fetchScholarDetail(product_id); // product_id로 장학금 정보 호출
                const data = response.scholarship;
                if (data) {
                    setScholarship(data); // 데이터를 상태로 설정
                } else {
                    setHasError(true); // 오류 상태 설정
                }
            } catch (error) {
                setHasError(true); // 오류 상태 설정
            }
        };
        loadScholarship();
    }, [product_id, fetchScholarDetail]);

    // 좋아요 상태를 likedScholarships로부터 설정
    useEffect(() => {
        const isLiked = likedScholarships.some((sch) => sch.product_id === product_id);
        setIsHeartFilled(isLiked);
    }, [likedScholarships, product_id]);

    const handleHeartClick = () => {
        handleLikeClick(isHeartFilled, product_id);
        setIsHeartFilled(!isHeartFilled); // UI 즉시 반영
    };

    return (
        <>
        <NavBar />
        <Container>
            <Header>
                <ScholarshipTitleWrapper>
                    <ScholarshipTitle>{scholarship?.name || '장학사업명'}</ScholarshipTitle>
                    <ScholarshipSubtitle>{scholarship?.foundation_name || '장학재단명'}</ScholarshipSubtitle>
                    <HeartButton
                        src={isHeartFilled ? filledheart : emptyheart}
                        alt="Heart Icon"
                        onClick={handleHeartClick} 
                    />
                </ScholarshipTitleWrapper>
            </Header>
            <AnnouncementBar>공고</AnnouncementBar>

            <Space />
            <Section>
                <Title>장학금 유형</Title>
                <ListItem>{scholarship?.financial_aid_type || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>장학재단 홈페이지 주소</Title>
                <ListItem>
                {scholarship?.website_url ? (
                    <a href={scholarship.website_url} target="_blank" rel="noopener noreferrer">
                        {scholarship.website_url}
                    </a>
                ) : (
                    '정보 없음'
                )}
                </ListItem>
            </Section>

            <Section>
                <Title>신청 기간</Title>
                <ListItem>
                    {scholarship?.recruitment_start || '시작일 정보 없음'} ~ {scholarship?.recruitment_end || '종료일 정보 없음'}
                </ListItem>
            </Section>

            <Section>
                <Title>선발방법 상세 내용</Title>
                <ListItem>{scholarship?.selection_method_details || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>선발인원 상세 내용</Title>
                <ListItem>{scholarship?.number_of_recipients_details || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>성적기준 상세 내용</Title>
                <ListItem>{scholarship?.grade_criteria_details || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>소득기준 상세 내용</Title>
                <ListItem>{scholarship?.income_criteria_details|| '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>거주지역여부 상세 내용</Title>
                <ListItem>{scholarship?.residency_requirement_details || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>자격제한 상세 내용</Title>
                <ListItem>{scholarship?.eligibility_restrictions || '정보 없음'}</ListItem>
            </Section>


            <Section>
                <Title>제출서류 상세 내용</Title>
                <ListItem>{scholarship?.required_documents_details || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>지원내역 상세 내용</Title>
                <ListItem>{scholarship?.support_details || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>추천필요여부 상세내용</Title>
                <ListItem>{scholarship?.recommendation_required || '정보 없음'}</ListItem>
            </Section>

            <Section>
                <Title>특정자격 상세내용</Title>
                <ListItem>{scholarship?.specific_qualification_details || '정보 없음'}</ListItem>
            </Section>

            <HighlightBox>
                <TitleWithIcon>
                    <Icon src={Loudspeaker} alt="Loudspeaker Icon" />
                    <Title2> 이런 사람이 장학금을 받았어요!</Title2>
                </TitleWithIcon>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                <strong style={{ color: "#2f4f5f", marginRight: "10px", minWidth: "70px" }}>합격팁</strong>
                <p style={{ margin: 0, textAlign: "justify" }}>
                    {scholarship?.gpt_success_tips || '정보 없음'}
                </p> 
                </div>
                <br/>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                <strong style={{ color: "#2f4f5f", marginRight: "10px", minWidth: "70px" }}>면접팁 </strong>
                <p style={{ margin: 0, textAlign: "justify" }}>
                    {scholarship?.gpt_interview_tips || '정보 없음'}
                </p>
                </div>
            </HighlightBox>
            <WarningBox>
                <Title3> 신청할 때는 각 장학금의 세부적인 기준과 마감일을 다시 한번 확인하시기 바랍니다.</Title3>
                <p>사용자가 확인하지 않아 발생하는 문제에 대해서는 Scholli 측에서 책임을 지지 않으며, 모든 책임은 전적으로 사용자에게 있습니다.</p>
            </WarningBox>
        </Container>
        </>
    );
};

export default Notice;