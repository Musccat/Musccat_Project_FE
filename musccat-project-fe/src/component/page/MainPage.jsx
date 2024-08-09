import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import NavBarB from "../ui/NavBarB";
import Button from "../ui/Button";
import { useAuth } from '../contexts/AuthContext';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    min-height: 250vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: linear-gradient(to bottom, #ffffff, #348a8c, #0f4c4f);
`;

const Title = styled.h1`
    font-size: 40px; /* 글씨 크기를 키움 */
    margin-top: 128px; /* 위로 올리기 위해 상단 여백 조정 */
    text-align: center;
    color: #2f6877;
`;
const Space = styled.div`
    margin-top: 32px;
`;
const Rectangle = styled.div`
    width: 100%;
    max-width: 600px; /* 수정: 고정된 최대 가로 길이 설정 */
    height: 350px; /* 세로 길이를 늘림 */
    background-color: white;
    padding: 40px; /* 버튼 주위에 원하는 공간을 만들기 위해 패딩 조정 */
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    margin-bottom: 16px; /* 사각형 간의 간격 */
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* 하단 정렬 */
    align-items: flex-start; /* 좌측 정렬 */
`;

const Text = styled.h1`
    margin: 0;
    padding-bottom: 20px; /* 버튼과의 간격을 위해 패딩 추가 */
    font-size: 30px;
    color: #333;
`;

const FirstButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #000; /* Black border */
    border-radius: 4px; /* Rounded corners for the button */
    background-color: #348a8c; 
    color: white; 
    margin-top: auto;
    margin-left: 10px;
`;

const SecondButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #000; /* Black border */
    border-radius: 4px; /* Rounded corners for the button */
    background-color: #2f6877;
    color: white;
    margin-top: auto;
    margin-left: 10px;
`;


const BottomButton = styled.button`
    padding: 16px 24px; /* 세로 길이를 늘림 */
    height: auto; /* height를 auto로 설정하여 텍스트에 맞게 조절 */
    border: 1px solid #2f4858;
    border-radius: 8px;
    background-color: #2f4858;
    color: white;
    margin-top: 32px;
    white-space: pre-line; /* 줄 바꿈을 지원하도록 설정 */
    text-align: center; /* 텍스트를 가운데 정렬 */
    font-size: 16px; /* 텍스트 크기 조정 */
`;

function MainPage(props) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // 로그인 상태 확인

    return (
        <>
            {isAuthenticated ? <NavBar /> : <NavBarB />}
            <Wrapper>
                <Space />
                <Space />
                <Title>나의 맞춤 장학금을 만나다</Title>
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                {isAuthenticated ? (
                    <>
                        <Rectangle style={{ marginTop: "16px" }}>
                            <Text>다양한 기관과 단체의
                                <br/>장학금을 확인해보세요</Text>
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <FirstButton
                                onClick={() => navigate('/entirescholar')}
                            >
                                전체 장학금 목록 보기
                            </FirstButton>
                            <Space />
                        </Rectangle>
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Rectangle>
                            <Text>나에게 맞는
                                <br /> 맞춤 장학금을
                                <br /> 확인해보세요. </Text>
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <SecondButton
                                onClick={() => navigate('/recomscholar')}
                            >
                                추천 장학금 목록 보기
                            </SecondButton>
                            <Space />
                        </Rectangle>
                    </>
                ) : (
                    <>
                        <Rectangle style={{ marginTop: "16px" }}>
                            <Text>다양한 기관과 단체의
                                <br/>장학금을 확인해보세요</Text>
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <FirstButton
                                onClick={() => navigate('/login')}
                            >
                                전체 장학금 목록 보기
                            </FirstButton>
                            <Space />
                        </Rectangle>
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Rectangle>
                            <Text>나에게 맞는
                                <br /> 맞춤 장학금을
                                <br /> 확인해보세요. </Text>
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <SecondButton
                                onClick={() => navigate('/login')}
                            >
                                추천 장학금 목록 보기
                            </SecondButton>
                            <Space />
                        </Rectangle>
                    </>
                )}
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <BottomButton
                    onClick={() => navigate('/somepage')}
                >
                    장학 수혜 정보 입력하고{"\n"}포인트 받기
                </BottomButton>
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
            </Wrapper>
        </>
    );
}


export default MainPage;
