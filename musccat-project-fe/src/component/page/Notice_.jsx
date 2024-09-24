import React, { useState } from 'react';
import styled from 'styled-components';
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
    margin-left: 50px;
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

const Title = styled.h2`
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


const Notice_ = () => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const toggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <>
        <NavBar />
        <Container>
            <Header>
                <ScholarshipTitleWrapper>
                    <ScholarshipTitle>2024 상반기 광주시 빛고을 장학</ScholarshipTitle>
                    <ScholarshipSubtitle>빛고을 장학 재단</ScholarshipSubtitle>
                    <HeartButton
                        src={isHeartFilled ? filledheart : emptyheart}
                        alt="Heart Icon"
                        onClick={toggleHeart}
                    />
                </ScholarshipTitleWrapper>
            </Header>
            <AnnouncementBar>공고</AnnouncementBar>
            <Section>
                <Title>신청 기간</Title>
                <ListItem>2024.04.29 ~ 2024.05.28</ListItem>
            </Section>

            <Section>
                <Title>선발인원</Title>
                <List>
                    <ListItem>· 총 330명</ListItem>
                    <ListItem>· 중학색 93명</ListItem>
                    <ListItem>· 중학생 196명</ListItem>
                    <ListItem>· 대학생 41명</ListItem>
                </List>
            </Section>

            <Section>
                <Title>장학혜택</Title>
                <List>
                    <ListItem>[장학급 지급] 최대 150만원</ListItem>
                    <ListItem>· 중학생 35만원</ListItem>
                    <ListItem>· 고등학생 50만원</ListItem>
                    <ListItem>· 대학생 150만원</ListItem>
                    <ListItem>※ 중복 수혜: 일부 가능</ListItem>
                    <ListItem>※ 빛고을 장학금 기수혜자 선발 제외</ListItem>
                </List>
            </Section>

            <Section>
                <Title>접수 방법</Title>
                <List>
                    <ListItem>[방문 접수]</ListItem>
                    <ListItem>· 접수처: 장학생 종류별 추천기관 (교육청, 자치구, 각 추천 기관 등)</ListItem>
                    <ListItem>· 제출 서류: 공고문 확인</ListItem>
                </List>
            </Section>

            <Section>
                <Title>지원 대상</Title>
                <p>중학생, 고등학생, 대학생, 학교 밖 청소년</p>
            </Section>

            <Section>
                <Title>신청 자격</Title>
                <List>
                    <ListItem>[지역 기준] 주민 등록지, 학교 소재지</ListItem>
                    <ListItem>· 광주시 1년 이상 거주</ListItem>
                    <ListItem>· 광주시 소재 학교 재학</ListItem>
                    <ListItem>[추천 사항] 학교장, 기타</ListItem>
                    <ListItem>※ 유형별 추천 사항 상이 (공고문 확인 필요)</ListItem>
                    <ListItem>[유형별 신청 자격]</ListItem>
                    <ListItem>· 학업 장려/ 생게 곤란 / 지정 장학 유형</ListItem>
                    <ListItem> ※ 유형별 선발 조건 공고문 확인</ListItem>
                </List>
            </Section>

            <HighlightBox>
                <TitleWithIcon>
                    <Icon src={Loudspeaker} alt="Loudspeaker Icon" />
                    <Title2> 이런 사람이 장학금을 받았어요!</Title2>
                </TitleWithIcon>
                <p>대체적으로 가정형편이 좋지 않거나 소득 분위가 낮은 학생들이 많이 수혜했어요. 지원서 제출은 물론 면접도 있기 때문에 지원서 내용을 잘 익히고 면접에서 떨지 않고 잘 말한 사람들이 많이 합격했어요. </p>
            </HighlightBox>
            <WarningBox>
                <Title3> 신청할 때는 각 장학금의 세부적인 기준과 마감일을 다시 한번 확인하시기 바랍니다.</Title3>
                <p>사용자가 확인하지 않아 발생하는 문제에 대해서는 Scholli 측에서 책임을 지지 않으며, 모든 책임은 전적으로 사용자에게 있습니다.</p>
            </WarningBox>
        </Container>
        </>
    );
};

export default Notice_;