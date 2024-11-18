import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../ui/NavBar';
import styled from 'styled-components';
import coin from '../ui/Coin.jpeg';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // 화면 전체 높이
    flex-direction: column;
`;

const Section = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #348a8c;
    border-radius: 10px;
    max-width: 700px;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Icon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #333;
`;

const PointsDisplay = styled.span`
    font-size: 24px;
    color: black;
    font-weight: bold;
    margin-left: 100px; 
`;

const Divider = styled.hr`
    margin: 20px 0;
    border: none;
    border-top: 1px solid #ccc;
`;

const PayButton = styled.button`
    margin-top: 20px;
    padding: 15px 0;
    width: 250px;
    background-color: #2F6877;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 5px;
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
                        payment_time: new Date().toISOString() // ISO 형식의 현재 시간
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

        <Container>
            <Section>
                <Header>
                    <Icon>
                        <img src={coin} alt="Coin" style={{ width: '70%', height: '70%' }}/>
                    </Icon>
                    <Title>
                        내 포인트
                    </Title>
                </Header>

                <Divider />
                
            </Section>
            <PayButton onClick={handleCompleteOrder}>
                4,900원 결제하기
            </PayButton>
        </Container>
        </>

    );

};

export default Points;