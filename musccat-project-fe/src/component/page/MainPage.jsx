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
import Mainpage1 from '../ui/mainpage1.jpeg';
import Mainpage2 from '../ui/mainpage2.jpeg';
import Mainpage3 from '../ui/mainpage3.jpeg';
import Mainpage4 from '../ui/mainpage4.jpeg';
import Mainpage5 from '../ui/mainpage5.jpeg';
import Mainpage6 from '../ui/mainpage6.jpeg';
import Mainpage7 from '../ui/mainpage7.jpeg';
import Mainpage8 from '../ui/mainpage8.jpeg';
import Mainpage9 from '../ui/mainpage9.jpeg';
import Mainpage10 from '../ui/mainpage10.jpeg';
import Mainpage11 from '../ui/mainpage11.jpeg';
import Mainpage12 from '../ui/mainpage12.jpeg';

//#348a8c #2f6877 #2f4858

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
const MainImageContainer = styled.div`
    position: relative; 
    display: flex; /* 이미지가 나란히 배치되도록 설정 */
    flex-direction: column; /* 세로로 배치 */
    padding: 0; /* 기본 여백 제거 */
    margin: 0; /* 기본 마진 제거 */
`;

const MainImageContainer1 = styled.div`
    position: relative; 
    display: flex; /* 이미지가 나란히 배치되도록 설정 */
    flex-direction: column; /* 세로로 배치 */
    padding: 0; /* 기본 여백 제거 */
    margin: 0; /* 기본 마진 제거 */
`;
const MainImageContainer2 = styled.div`
    position: relative; 
    display: flex; 
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    padding: 0;
    gap: 0px;
    margin-top: -2250px; /* 위로 이동 */
    z-index: 1; /* 기본 z-index 설정 */
`;



const TextContainer1 = styled.div`
    position: absolute; /* 컨테이너를 이미지 위로 배치 */
    top: 21%; /* 컨테이너의 상단 위치 */
    left: 50%; /* 컨테이너의 가로 중앙 */
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    gap: 0px; /* 두 텍스트 사이의 공백 */
    width: 80%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center; /* 텍스트를 가운데 정렬 */
`;

const ImageText1 = styled.h2`
    font-size: 112px; /* 텍스트 크기 */
    color: transparent; /* 텍스트 색상을 투명으로 설정 */
    background: linear-gradient(to bottom, #2f4858, #348a8c); /* 세로로 그라데이션 */
    -webkit-background-clip: text; /* 배경을 텍스트에 클리핑 */
    background-clip: text; /* 텍스트에만 배경 적용 (모든 브라우저) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;

const ImageText2 = styled.h2`
    font-size: 112px; /* 텍스트 크기 */
    color: black; 
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;

const TextContainer2 = styled.div`
    position: absolute; /* 컨테이너를 이미지 위로 배치 */
    top: 63%; /* 컨테이너의 상단 위치 */
    left: 50%; /* 컨테이너의 가로 중앙 */
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    gap: 0px; /* 두 텍스트 사이의 공백 */
    width: 80%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center; /* 텍스트를 가운데 정렬 */
`;

const ImageText3 = styled.h2`
    font-size: 80px; /* 텍스트 크기 */
    color: white; /* 텍스트 색상을 흰색으로 변경 */
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;
const ImageText4 = styled.h2`
    font-size: 50px; /* 텍스트 크기 */
    color: black; /* 텍스트 색상을 흰색으로 변경 */
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;

const TextContainer3 = styled.div`
    position: absolute; /* 컨테이너를 이미지 위로 배치 */
    top: 63%; /* 컨테이너의 상단 위치 */
    left: 50%; /* 컨테이너의 가로 중앙 */
    transform: translate(-55%, 610%); /* 중앙 정렬 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    gap: 0px; /* 두 텍스트 사이의 공백 */
    width: 80%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center; /* 텍스트를 가운데 정렬 */
`;

const ImageText5 = styled.h2`
    font-size: 70px; /* 텍스트 크기 */
    color:black; /* 텍스트 색상을 흰색으로 변경 */
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: left;
    margin: 8px 0; 
    padding: 0; /* 추가 여백 제거 */
`;

const ImageText6 = styled.h2`
    font-size: 30px; /* 텍스트 크기 */
    color: black; /* 텍스트 색상을 흰색으로 변경 */
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: left;
    margin: 8px 0; 
    padding: 0; /* 추가 여백 제거 */
`;

const TextContainer4 = styled.div`
    position: absolute; /* 컨테이너를 이미지 위로 배치 */
    top: 63%; /* 컨테이너의 상단 위치 */
    left: 50%; /* 컨테이너의 가로 중앙 */
    transform: translate(-43%, 890%); /* 중앙 정렬 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    gap: 0px; /* 두 텍스트 사이의 공백 */
    width: 80%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center; /* 텍스트를 가운데 정렬 */
    z-index: 10;
`;

const ImageText7 = styled.h2`
    font-size: 80px; /* 텍스트 크기 */
    color:black; /* 텍스트 색상을 흰색으로 변경 */
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: right;
    margin: 8px 0; 
    padding: 0; /* 추가 여백 제거 */
`;

const ImageText8 = styled.h2`
    font-size: 30px; /* 텍스트 크기 */
    color: black; /* 텍스트 색상을 흰색으로 변경 */
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: right;
    margin: 8px 0px; 
    padding: 0; /* 추가 여백 제거 */
`;

const TextContainer5 = styled.div`
    position: absolute; 
    top: 50%; /* 컨테이너 기준 중앙 */
    left: 50%; 
    transform: translate(-50%, -340%); /* 중앙 정렬 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    gap: 5px; /* 두 텍스트 사이의 공백 */
    width: 80%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center; /* 텍스트를 가운데 정렬 */
`;

const ImageText9 = styled.h2`
    font-size: 50px; /* 텍스트 크기 */
    color: black; 
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;

const TextContainer6 = styled.div`
    position: absolute; 
    top: 50%; /* 컨테이너 기준 중앙 */
    left: 50%; 
    transform: translate(-50%, -40%); /* 중앙 정렬 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    gap: 5px; /* 두 텍스트 사이의 공백 */
    width: 80%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center; /* 텍스트를 가운데 정렬 */
`;

const ImageText10 = styled.h2`
    font-size: 60px; /* 텍스트 크기 */
    color: #2f4858; 
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;

const ImageText11 = styled.h2`
    font-size: 45px; /* 텍스트 크기 */
    color: black; 
    padding: 8px 16px; /* 텍스트 주위 여백 추가 */
    border-radius: 8px; /* 배경의 모서리를 둥글게 */
    width: 100%; /* 컨테이너의 너비를 늘림 (필요에 따라 조정 가능) */
    text-align: center;
    margin: 0; /* 추가 여백 제거 */
    padding: 0; /* 추가 여백 제거 */
`;

const ImageButton1 = styled.img`
    margin-top: 16px; /* 텍스트와의 간격 */
    width: 80%; /* 이미지 크기 조정 */
    max-width: 500px; /* 최대 크기 제한 */
    height: auto; /* 이미지 비율 유지 */
    border-radius: 8px; /* 선택 사항: 이미지 둥글게 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 선택 사항: 그림자 효과 */
`;

const Arrow1 = styled.img`
    position: absolute; /* 위치를 절대적으로 지정 */
    top: 53%; /* 위에서부터의 위치 */
    left: 50%; /* 가로 중앙 */
    transform: translateX(-50%); /* 중앙 정렬 */
    width: 70px; /* 화살표 크기 */
    height: auto; /* 비율 유지 */
`;

const MainImage1 = styled.img`
    width: 100%;
    max-width: 2000px;
    height: auto;
`;
const MainImage2 = styled.img`
    width: 100%;
    max-width: 2000px;
    height: auto;
    margin-top: -2300px; /* 위로 이동 */
    padding: 0; /* 기본 여백 제거 */
`;
const MainImage3 = styled.img`
    width: 100%;
    max-width: 2000px;
    height: auto;
    margin-top: -1500px; /* 위로 이동 */
    padding: 0; /* 기본 여백 제거 */
`;
const Section = styled.div`
    width: 100%;
    max-width: 2000px;
    height: auto;  
    display: flex; /* 이미지 정렬을 위해 flex 사용 */
    flex-wrap: wrap; /* 여러 이미지를 넣을 경우 줄 바꿈 지원 */
    justify-content: center; /* 이미지를 중앙에 정렬 */
    align-items: center; /* 수직 정렬 */
    padding: 0px; /* 섹션의 안쪽 여백 */
    margin: 0; /* 바깥쪽 여백 제거 */
    background-color: white; /* 배경색 설정 (필요 시) */
`;

const SubImage1 = styled.img`
    width: 100%;
    max-width: 1500px; /* 각 이미지의 최대 너비 */
    height: auto;
    margin: 0px; /* 이미지 간 간격 */
    transform: translate(200px, -700px);
    z-index: 2; /* SubImage2보다 위에 배치 */
`;

const SubImage2 = styled.img`
    width: 100%;
    max-width: 800px; /* 각 이미지의 최대 너비 */
    height: auto;
    margin: 0px; /* 이미지 간 간격 */
    transform: translate(-490px, -960px); /* 왼쪽으로 10px 이동 */
    z-index: 1; /* SubImage1보다 아래에 배치 */
`;
const SubImage3 = styled.img`
    width: 100%;
    max-width: 1300px; /* 각 이미지의 최대 너비 */
    height: auto;
    margin: 0px; /* 이미지 간 간격 */
    transform: translate(-260px, -1250px);
    z-index: 2; /* SubImage2보다 위에 배치 */
`;

const SubImage4 = styled.img`
    width: 100%;
    max-width: 800px; /* 각 이미지의 최대 너비 */
    height: auto;
    margin: 0px; /* 이미지 간 간격 */
    transform: translate(650px, -2000px); /* 왼쪽으로 10px 이동 */
    z-index: 1; /* SubImage1보다 아래에 배치 */
    margin: 0px;
`;

const LoginText = styled.p`
    margin-top: 8px;
    font-size: 25px; /* Adjust font size as needed */
    color: #666; /* Use a slightly muted color for the text */
    text-align: left;
`;

const LoginText2 = styled.p`
    margin-top: 8px;
    font-size: 25px; /* Adjust font size as needed */
    color: #666; /* Use a slightly muted color for the text */
    text-align: left;
    transform: translate(-500px, -1950px);
    z-index: 10;
`;

const LoginText3 = styled.p`
    margin-top: 8px;
    font-size: 25px; /* Adjust font size as needed */
    color: #666; /* Use a slightly muted color for the text */
    text-align: left;
    transform: translate(520px, -2965px);
    z-index: 10;
`;




function MainPage(props) {
    const navigate = useNavigate();
    const { isAuthenticated} = useAuth(); // 로그인 상태 확인

    const handleEntireScholarButtonClick = () => {
        console.log("Button clicked!"); // 클릭 여부 확인
        if (isAuthenticated) {
            navigate('/entirescholar'); // 로그인 상태이면 /entirescholar로 이동
        } else {
            navigate('/users/login'); // 로그인 상태가 아니면 /users/login로 이동
        }
    }

    const handleRecomScholarButtonClick = () => {
        if (isAuthenticated) {
            navigate('/recomscholar'); // 로그인 상태이면 /recomscholar로 이동
        } else {
            navigate('/users/login'); // 로그인 상태가 아니면 /users/login로 이동
        }
    }

    const handleBenifitButtonClick = () => {
        if (isAuthenticated) {
            navigate('/reviews'); // 로그인 상태이면 /reviews로 이동
        } else {
            navigate('/users/login'); // 로그인 상태가 아니면 /users/login로 이동
        }
    };

    const handleRegisterScholarButtonClick = () => {
        if (isAuthenticated) {
            navigate('/addscholar'); // 로그인 상태이면 /addscholar로 이동
        } else {
            navigate('/users/login'); // 로그인 상태가 아니면 /users/login로 이동
        }
    }
    
    return (
        <>
            {isAuthenticated ? <NavBar /> : <NavBarB />}
            <MainImageContainer1>
                <TextContainer1>
                    <ImageText1>스콜리,</ImageText1>
                    <ImageText2>나의 맞춤 장학금을 만나다</ImageText2>
                </TextContainer1>
                <Arrow1 src={Mainpage12} alt="Main page illustration2"/>
                <TextContainer2>
                <ImageText3>장학금을 알아보고 계신가요?</ImageText3>
                <ImageText4>분산된 장학금 정보를 한눈에 확인하고,</ImageText4>
                <ImageText4>나의 상황에 적합한 장학금을 추천받아 편리하게 지원하세요.</ImageText4>
                </TextContainer2>
                <MainImage1 src={Mainpage1} alt="Main page illustration1" />
                <MainImage1 src={Mainpage2} alt="Main page illustration2" />
            </MainImageContainer1>
            <Section>
                <SubImage1 src={Mainpage3} alt="Section Image 3" />
                <SubImage2 src={Mainpage6} alt="Section Image 6" />
                <TextContainer3>
                    <ImageText5>다양한 기관과 단체의 장학금을</ImageText5>
                    <ImageText5>한눈에 확인</ImageText5>
                    <ImageText6>분산되어 있는 장학금 정보를</ImageText6>
                    <ImageText6>통합하여 제공합니다.</ImageText6>
                </TextContainer3>
                <img
                src={Mainpage4} 
                alt="Additional illustration below text" 
                style={{
                    marginTop: '13px', // 텍스트와의 간격
                    width: '80%', // 이미지 폭
                    maxWidth: '350px', // 최대 너비 제한
                    height: 'auto', // 비율 유지 
                    transform: 'translate(-255%, -1475%)',
                    zIndex: 10, 
                }}
                onClick={handleEntireScholarButtonClick} 
                />
                {!isAuthenticated && (
                    <LoginText2>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText2>
                )}
                <SubImage3 src={Mainpage5} alt="Section Image 5" />
                <SubImage4 src={Mainpage7} alt="Section Image 7" 
                    style={{
                        marginBottom: '0px', // SubImage4의 하단 여백을 제거
                    }}
                />
                <TextContainer4>
                    <ImageText7>나의 상황에 딱 맞는</ImageText7>
                    <ImageText7>장학금 추천</ImageText7>
                    <ImageText8>사용자 프로필을 분석하여</ImageText8>
                    <ImageText8>장학금을 추천해드립니다.</ImageText8>
                </TextContainer4>
                <img
                src={Mainpage4} 
                alt="Additional illustration below text" 
                style={{
                    marginTop: '13px', // 텍스트와의 간격
                    width: '80%', // 이미지 폭
                    maxWidth: '350px', // 최대 너비 제한
                    height: 'auto', // 비율 유지 
                    transform: 'translate(35%, -2400%)',
                    zIndex: 10, 
                }}
                onClick={handleRecomScholarButtonClick} 
                />
                {!isAuthenticated && (
                    <LoginText3>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText3>
                )}
            </Section>
            <MainImageContainer2>
                <MainImage2 
                    src={Mainpage8} 
                    alt="Main page illustration8"
                    style={{
                        marginTop: '0px',
                        marginBottom: '10px', // 하단 여백 추가
                    }}
                />
                <MainImage3 
                    src={Mainpage10} 
                    alt="Main page illustration10" 
                    style={{
                        marginTop: '10px', // 상단 여백 추가
                    }}
                />
                <TextContainer5>
                <ImageText9>장학 수혜 정보를 입력하고 서비스를 직접 체험해보세요. </ImageText9>
                <img
                src={Mainpage9} 
                alt="Additional illustration below text" 
                style={{
                    marginTop: '16px', // 텍스트와의 간격
                    width: '80%', // 이미지 폭
                    maxWidth: '400px', // 최대 너비 제한
                    height: 'auto', // 비율 유지 
                }}
                onClick={handleBenifitButtonClick} 
                />
                {!isAuthenticated && (
                    <LoginText>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText>
                )}
                </TextContainer5>
                <TextContainer6>
                <ImageText10>장학 재단이신가요?</ImageText10>
                <ImageText11>직접 장학 사업명을 등록할 수 있어요</ImageText11>
                <img
                src={Mainpage4} 
                alt="Additional illustration below text" 
                style={{
                    marginTop: '13px', // 텍스트와의 간격
                    width: '80%', // 이미지 폭
                    maxWidth: '350px', // 최대 너비 제한
                    height: 'auto', // 비율 유지 
                }}
                onClick={handleRegisterScholarButtonClick} 
                />
                {!isAuthenticated && (
                    <LoginText>* 로그인 후 이용하실 수 있는 서비스입니다.</LoginText>
                )}
                </TextContainer6>
                <img
                    src={Mainpage11} // 추가할 이미지의 경로
                    alt="mainpage11 illustration below text"
                    style={{
                        marginTop: '10px', // 위 요소와의 간격
                        width: '80%', // 이미지 폭
                        maxWidth: '1000px', // 최대 너비 제한
                        height: 'auto', // 비율 유지
                        zIndex: 2,
                        position: 'absolute', // 위치 기준 설정
                        left: '50%', // 부모 기준 가로 중앙
                        top: '50%', // 부모 기준 세로 중앙
                        transform: 'translate(-50%, 20%)'// 중앙 정렬 및 위치 조정
                    }}
                />
            </MainImageContainer2>





        </>
    );
}


export default MainPage;
