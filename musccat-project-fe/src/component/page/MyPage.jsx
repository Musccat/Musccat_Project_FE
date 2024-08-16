import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../ui/NavBar';
import ProfileImage from '../ui/ProfileImage.jpeg'; 

const Container = styled.div`
    margin: 20px;
    font-family: Arial, sans-serif;
    margin-top: 60px; /* NavBar와의 간격 추가 */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    max-width: 600px;
    width: 100%;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
`;

const ProImage = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

const UserName = styled.h1`
    margin: 5px 0 0 0;
    font-size: 1.5em;
`;

const NormalText = styled.span`
    font-weight: normal;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const UserNickname = styled.p`
    margin: 5px 0 0 0;
`;

const ButtonGroup = styled.div`
    margin-left: auto;
    display: flex;
    gap: 10px;
    margin: 15px 0 0 0;
`;

const Button = styled.button`
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2d7374;
    }
`;

const Section = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #348a8c;
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
`;

const Separator = styled.hr`
    border: 0;
    height: 1px;
    background: #348a8c;
    margin: 20px 0;
    margin-bottom: 0px;
`;


const Title = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
`;

const InfoList = styled.ul`
    margin-top: 35px;
    list-style-type: none;
    padding: 0;
`;

const InfoItem = styled.li`
    display: grid;
    grid-template-columns: 150px 1fr; /* 간격을 추가
    margin-bottom: 10px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 5px;
`;

const Th = styled.th`
    text-align: left;
    border-bottom: 2px solid #348a8c;
    padding: 10px;
`;

const Td = styled.td`
    text-align: left;
    border-bottom: 1px solid #348a8c;
    padding: 10px;
`;

const Space = styled.div`
    margin-top: 20px;
`;

const ActionButton = styled.button`
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2d7374;
    }

`;

const MyPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // 정보 입력 버튼 클릭 여부를 확인
    const [isFirstClick, setIsFirstClick] = useState(
        () => localStorage.getItem('isFirstClick') !== 'false'
    );

    // 정보 입력 버튼 클릭 핸들러
    const handleInfoButtonClick = () => {
        if (isFirstClick) {
            navigate('/meminfofirst'); // '장학 정보 신규 입력 페이지'로 이동
            setIsFirstClick(false);
            localStorage.setItem('isFirstClick', 'false'); // 상태를 로컬 스토리지에 저장
        } else {
            navigate('/meminfo'); // '기존 정보 수정 페이지'로 이동
        }
    };

    return (
        <>
            <NavBar />
            <Container>
                <Header>
                    <ProfileContainer>
                        <ProImage src={ProfileImage} alt="Profile" />
                        <UserNickname>strgurl</UserNickname>
                </ProfileContainer>
                <UserInfo>
                    <UserName>
                        <BoldText>strgurl</BoldText>
                        <NormalText> 님의 마이페이지</NormalText>
                        </UserName>
                    <ButtonGroup>
                        <Button onClick={handleInfoButtonClick}>
                            {isFirstClick ? '신규 정보 입력' : '기본 정보 수정'}</Button>
                        <Button>수혜 정보 제출</Button>
                        <Button>내 관심목록</Button>
                    </ButtonGroup>
                </UserInfo>
                </Header>

                <Section>
                    <Title>기본 정보</Title>
                    <InfoList>
                        <InfoItem>
                            <span>닉네임</span>
                            <span>{user?.nickname || 'Nickname'}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>성명</span>
                            <span>{user?.name || 'Full Name'}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>생년월일</span>
                            <span>{user?.birthdate || 'YYYY.MM.DD'}</span> 
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>이메일</span>
                            <span>strgurl47@ewhain.net</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>전화번호</span>
                            <span>010-1234-5678</span>
                        </InfoItem>
                    </InfoList>
                </Section>

                <Section>
                    <Title>장학금 지원서 작성 현황</Title>
                    <Separator />
                    <Table>
                        <thead>
                            <tr>
                                <Th>재단명</Th>
                                <Th>장학금명</Th>
                                <Th>수정</Th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Td>재단명1</Td>
                                <Td>장학금명1</Td>
                                <Td><ActionButton>수정</ActionButton></Td>
                            </tr>
                            <tr>
                                <Td>재단명2</Td>
                                <Td>장학금명2</Td>
                                <Td><ActionButton>수정</ActionButton></Td>
                            </tr>
                            <tr>
                                <Td>재단명3</Td>
                                <Td>장학금명3</Td>
                                <Td><ActionButton>수정</ActionButton></Td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>
            </Container>
        </>
    );
};

export default MyPage;