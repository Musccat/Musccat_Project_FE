import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../ui/NavBar';
import styled from 'styled-components';
import bcoin from '../ui/coin_book.jpeg';
import rcoin from '../ui/coin_right.jpeg';
import lcoin from '../ui/coin_left.jpeg';
import axios from 'axios';

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #white; // 전체 배경 흰색 설정
`;

const BackgroundContainer = styled.div`
    background: linear-gradient(to right, #348a8c, #1A3D46); // 좌에서 우로 진해지는 그라데이션
    height: 220px;
    width: 65%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
    position: relative;
    overflow: hidden;
    z-index: 1;
`;
const BelowContainer = styled.div`
    width: 65%; // BackgroundContainer와 동x일한 너비
    max-width: 1200px; // 최대 너비 제한
    margin: -80px auto 0; // BackgroundContainer와 ContentBox 간의 간격 조정
    padding: 50px 20px;
    background: #f9f9f9;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); // 약간의 그림자 추가
    position: relative;
    z-index: 1; // ContentBox 아래 레이어로 설정

    display: flex;
    flex-direction: column; // 내부 요소를 세로로 배치
    justify-content: flex-start; // 내부 요소 위쪽 정렬
    align-items: center; // 내부 요소 가로 중앙 정렬

    height: 500px;
`;

const HighlightedText2 = styled.span`
    color: #348a8c; // 원하는 색상 (노란색)
    font-weight: bold; // 강조 효과
`;

const ContentBox = styled.div`
    background: white;
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    padding: 30px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin: -17px auto; // ContentBox를 중앙에 유지
    position: relative;
    z-index: 2; // 이미지보다 아래에 위치

    display: flex;
    flex-direction: column; // 자식 요소를 세로로 배치
    justify-content: center; // 자식 요소를 세로 중앙 정렬
    align-items: center; // 자식 요소를 가로 중앙 정렬
    gap: 10px; // 자식 요소 간 간격

    h2 {
        margin: 0; // 기본 margin 제거
        padding: 1px 0; // 상하 간격 줄이기
    }
`;

const TitleContainer = styled.div`
    margin-top: -60px; // 위로 이동
    margin-left: -30px; // 왼쪽으로 이동
    text-align: left; // 왼쪽 정렬
    line-height: 1; // 줄 간격 조정
`;

const Title = styled.h1`
    font-size: 40px;
    font-weight: bold;
    color: white; 
    margin-left: -330px; // 왼쪽으로 더 이동
    margin-top: -30px; // 위로 이동
    line-height: 1.2;
`;

const HighlightedText = styled.span`
    color: #FFD700;; 
    font-weight: bold;
`;

const BenefitsList = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 30px;

    li {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;

        &:before {
            content: '✔️';
            margin-right: 10px;
            color: #2F6877;
        }
    }
`;

const ImageBetween = styled.img`
    width: 340px; // 이미지 크기 조정
    height: auto;
    position: absolute; // 위치를 독립적으로 설정
    top: 210px; // 위에서부터의 위치 설정
    left: 66%; // 가로 중앙 정렬
    transform: translate(-50%, -50px); // 위치 조정 (중앙 정렬 + 살짝 위로)
    z-index: 3; // ContentBox 위로 올라오도록 설정
`;

const ImageBetween1 = styled.img`
    width: 140px;
    height: auto;
    position: absolute; 
    margin-left: -950px;
    margin-bottom: 110px;
`;

const ImageBetween2 = styled.img`
    width: 120px; // 이미지 크기 조정
    height: auto;
    position: absolute; // 위치를 독립적으로 설정
    top: 18px; // 위에서부터의 위치 설정
    left: 96%; // 가로 중앙 정렬
    transform: translate(-50%, -50px); // 위치 조정 (중앙 정렬 + 살짝 위로)
    z-index: 2; // ContentBox 위로 올라오도록 설정
    clip-path: inset(0 0 0 0);
`;

const PayButton = styled.button`
    margin-top: -5px;
    padding: 15px 0;
    width: 250px;
    background-color: #348a8c;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
`;



const Points = () => {
    const [isPaymentTriggered, setIsPaymentTriggered] = useState(false);
    const {  user, fetchUserData } = useAuth();

    useEffect(() => {
        fetchUserData(); // 컴포넌트가 마운트될 때 사용자 데이터 가져오기
    }, [fetchUserData]);

    const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
    });

    const handleCompleteOrder = () => {
        setIsPaymentTriggered(true);
    };

    useEffect(() => {
        // 결제 창을 띄우는 로직
        if (isPaymentTriggered) {
            handlePayment();
        }
    }, [isPaymentTriggered]);

    // 결제 창을 띄우는 함수
    async function handlePayment() {
        if (!window.IMP) {
            console.error("아임포트 라이브러리가 로드되지 않았습니다.");
            return;
        }

        const fixedAmount = 4900; // 고정 금액 설정
        const merchantUid = `merchant_${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 12)}`; // merchant_YYMMDDHHMM 형식
        const paymentTime = new Date().toISOString(); // ISO 형식 시간 생성

        window.IMP.init(process.env.REACT_APP_IMP_KEY); // 아임포트 식별 코드 초기화
        window.IMP.request_pay({
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: merchantUid, // 주문 고유 번호
            name: "SCHOLLI 구독 서비스",
            amount: fixedAmount, 
            buyer_name: user.fullname, 
            buyer_email: user.email,
            buyer_addr: user.residence
        }, async (rsp) => {
            if (rsp.success) {
                try {
                    const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/payment/pay`, {
                            imp_uid: rsp.imp_uid,
                            merchant_uid: rsp.merchant_uid,
                            amount: fixedAmount,
                            status: "paid", // 결제 상태
                            payment_time: paymentTime
                    });
                    console.log('결제 성공:', response.data);
                    setIsPaymentTriggered(false); // 결제 상태 초기화
                } catch (error) {
                    console.error('결제 확인 오류:', error);
                }
            } else {
                console.error('결제 실패:', rsp.error_msg);
            }
            setIsPaymentTriggered(false);
        });
    }

    return (
        <>
        <NavBar />
        <Wrapper>
            {/* 배경 컨테이너 */}
            <BackgroundContainer>
                    <TitleContainer>
                    <Title>내게 맞는 </Title>
                    <Title><HighlightedText>장학금을</HighlightedText> 한 눈에!</Title>
                    </TitleContainer>

            <ImageBetween1 src={rcoin} alt="Right Coin" />
            <ImageBetween2 src={lcoin} alt="Left Coin" />
            </BackgroundContainer>
            <ImageBetween src={bcoin} alt="Book and Coin" />
            <BelowContainer>
                <ContentBox>
                <h2>
                    <HighlightedText2>SCHOLLI 프리미엄</HighlightedText2>
                </h2>
                <h2>구독 서비스 혜택</h2>
                <BenefitsList>
                    <li>개인 맞춤형 추천 서비스 무제한 이용 가능</li>
                    <li>이전 수혜자 조언 무제한 열람 가능</li>
                    <li>관심있는 장학금 알림 기능 사용 가능</li>
                </BenefitsList>
                <PayButton onClick={handleCompleteOrder}>4,900원 / 월</PayButton>
            </ContentBox>
            </BelowContainer>
        </Wrapper>
        </>

    );

};

export default Points;