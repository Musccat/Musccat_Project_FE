import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import NavBarB from "../ui/NavBarB";
import Button from "../ui/Button";
import { useAuth } from '../contexts/AuthContext';
import entirescholar_image from '../ui/scholli_entirescholarship_list.jpeg';
import recomscholar_image from '../ui/scholli_recomscholarship_list.jpeg';
import addscholar1 from '../ui/addscholar_image1.jpeg';
import addscholar2 from '../ui/addscholar_image2.jpeg';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    min-height: 350vh;
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    /* 부모 크기에 맞춰 자동으로 크기 조정 */
    transform: scale(1.2); /* 기본 크기 */
    transition: transform 0.3s ease;
`;

const TextContainer = styled.div`
    flex: 1;
    margin-right: 20px;
    z-index: 2;
    padding-top: 30px;
`;

const Text = styled.h1`
    margin: 0;
    padding-bottom: 20px; 
    font-size: 30px;
    color: #333;
`;

const Highlight = styled.span`
    color: #348a8c; /* 원하는 색상 코드 */
`;

const GrayText = styled.p`
    margin-top: 8px;
    font-size: 18px; /* Adjust font size as needed */
    color: #666; /* Gray color */
    text-align: left; /* Align to the left or adjust as needed */
`;

const FirstImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 40%;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px; 
`;

const FirstImage = styled.img`
    width: 100%;
    height: auto;
    transform: scale(1.8) translate(-50px, -39px); ;
    object-fit: contain;
`;

const SecondImageWrapper = styled.div`
    position: absolute;
    top: -50px; /* Adjust to position the image correctly */
    left: -50px; /* Adjust as needed */
    width: 200%; /* Scale the image to ensure only a part is visible */
    height: auto;
    z-index: 1; /* Behind the text */
    opacity: 0.9; /* Optional: Make it slightly transparent */
`;

const SecondImage = styled.img`
    width: 100%;
    height: auto;
    transform: scale(0.6) translate(-150px, -345px);
`;

const ThirdImageWrapper = styled.div`
    position: absolute;
    top: -50px; /* Adjust to position the image correctly */
    left: -50px; /* Adjust as needed */
    width: 200%; /* Scale the image to ensure only a part is visible */
    height: auto;
    z-index: 1; /* Behind the text */
    opacity: 0.9; /* Optional: Make it slightly transparent */
`;

const ThirdImage1 = styled.img`
    position: absolute;
    width: 100%;
    height: auto;
    z-index: 2; /* Ensure it's on top */
    transform: scale(0.2) translate(-700px, -1000px); /* Adjust position slightly for overlap */
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.8);
    border-radius: 50px;
`;

const ThirdImage2 = styled.img`
    position: absolute;
    width: 90%;
    height: auto;
    z-index: 1; /* Ensure it's behind the first image */
    opacity: 0.95; /* Optional: Add slight transparency */
    transform: scale(0.25) translate(-450px, -500px);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.8);
    border-radius: 50px;
`;



const FirstButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #000; /* Black border */
    border-radius: 4px; /* Rounded corners for the button */
    background-color: #348a8c; 
    color: white; 
    margin-top: 90px;
    margin-left: 10px;
    cursor: pointer;
`;

const SecondButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #000; /* Black border */
    border-radius: 4px; /* Rounded corners for the button */
    background-color: #2f6877;
    color: white;
    margin-top: 60px;
    margin-left: 10px;
    cursor: pointer;
`;

const ThirdButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #000; /* Black border */
    border-radius: 4px; /* Rounded corners for the button */
    background-color: #2f4858;
    color: white;
    margin-top: 130px;
    margin-left: 10px;
    cursor: pointer;
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
    cursor: pointer;

    /* 부모 크기에 맞춰 자동으로 크기 조정 */
    transform: scale(1.2); /* 기본 크기 */
    transition: transform 0.3s ease;
`;

const WhiteText = styled.p`
    color: white;
    font-size: 12px; /* Adjust font size if necessary */
    margin-top: 15px;
    text-align: center; /* Adjust alignment if necessary */

    /* 부모 크기에 맞춰 자동으로 크기 조정 */
    transform: scale(1.2); /* 기본 크기 */
    transition: transform 0.3s ease;
`;

const LoginText = styled.p`
    margin-top: 8px;
    font-size: 10px; /* Adjust font size as needed */
    color: #666; /* Use a slightly muted color for the text */
    text-align: left;
`;


function MainPage(props) {
    const navigate = useNavigate();
    const { isAuthenticated} = useAuth(); // 로그인 상태 확인

    const handleBottomButtonClick = () => {
        if (isAuthenticated) {
            navigate('/reviews'); // 로그인 상태이면 /reviews로 이동
        } else {
            navigate('/users/login'); // 로그인 상태가 아니면 /users/login로 이동
        }
    };
    
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
                        <TextContainer>
                        <Text>다양한 기관과 단체의
                            <br/><Highlight>장학금</Highlight>을 확인해보세요</Text>
                        <GrayText>분산되어 있는 장학금 정보를
                            <br/> 통합하여 제공합니다.
                        </GrayText>
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
                        </TextContainer>
                        <FirstImageWrapper>
                            <FirstImage src={entirescholar_image} alt="Scholarship example" />
                        </FirstImageWrapper>
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
                        <TextContainer>
                        <Text>나에게 맞는
                            <br /> <Highlight>추천 장학금</Highlight>을
                            <br /> 확인해보세요. </Text>
                        <GrayText>사용자 프로필을 분석하여
                        <br/> 장학금을 추천해드립니다.
                        </GrayText>
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <SecondButton
                            onClick={() => navigate('/recomscholar')}
                        >
                            추천 장학금 목록 보기
                        </SecondButton>
                        </TextContainer>
                        <SecondImageWrapper>
                            <SecondImage src={recomscholar_image} alt="Scholarship example" />
                        </SecondImageWrapper>
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
                        <TextContainer>
                        <Text><Highlight>장학재단</Highlight>이신가요?</Text>
                        <GrayText>장학사업명을 직접
                            <br/> 등록하실 수 있습니다.
                        </GrayText>
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <ThirdButton
                            onClick={() => navigate('/addscholar')}
                        >
                            장학금 등록하기
                        </ThirdButton>
                        </TextContainer>
                        <ThirdImageWrapper>
                            <ThirdImage1 src={addscholar1} alt="First overlapping image" />
                            <ThirdImage2 src={addscholar2} alt="Second overlapping image" />
                        </ThirdImageWrapper>
                        <Space />
                    </Rectangle>

                    </>
                ) : (
                    <>
                        <Rectangle style={{ marginTop: "16px" }}>
                            <TextContainer>
                            <Text>다양한 기관과 단체의
                                <br/><Highlight>장학금</Highlight>을 확인해보세요</Text>
                            <GrayText>분산되어 있는 장학금 정보를
                                <br/> 통합하여 제공합니다.
                            </GrayText>
                            <Space />
                            <Space />
                            <FirstButton
                                onClick={() => navigate('/users/login')}
                            >
                                전체 장학금 목록 보기
                            </FirstButton>
                            <LoginText>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText>
                            </TextContainer>
                            <FirstImageWrapper>
                                <FirstImage src={entirescholar_image} alt="Scholarship example" />
                            </FirstImageWrapper>
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
                            <TextContainer>
                            <Text>나에게 맞는
                                <br /> <Highlight>추천 장학금</Highlight>을
                                <br /> 확인해보세요. </Text>
                            <GrayText>사용자 프로필을 분석하여
                            <br/> 장학금을 추천해드립니다.
                            </GrayText>
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <SecondButton
                                onClick={() => navigate('/users/login')}
                            >
                                추천 장학금 목록 보기
                            </SecondButton>
                            <LoginText>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText>
                            </TextContainer>
                            <SecondImageWrapper>
                                <SecondImage src={recomscholar_image} alt="Scholarship example" />
                            </SecondImageWrapper>
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
                            <TextContainer>
                            <Text><Highlight>장학재단</Highlight>이신가요?</Text>
                            <GrayText>장학사업명을 직접
                                <br/> 등록하실 수 있습니다.
                            </GrayText>
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <ThirdButton
                                onClick={() => navigate('/users/login')}
                            >
                                장학금 등록하기
                            </ThirdButton>
                            <LoginText>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText>
                            </TextContainer>
                            <ThirdImageWrapper>
                                <ThirdImage1 src={addscholar1} alt="First overlapping image" />
                                <ThirdImage2 src={addscholar2} alt="Second overlapping image" />
                            </ThirdImageWrapper>
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
                    onClick={handleBottomButtonClick}
                >
                    장학 수혜 정보 입력하고{"\n"}포인트 받기
                </BottomButton>
                {!isAuthenticated && (
                    <WhiteText>* 로그인 후 이용하실 수 있는 서비스입니다.</WhiteText>
                )}
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
