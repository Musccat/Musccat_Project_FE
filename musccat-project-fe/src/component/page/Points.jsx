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

const AmountContainer = styled.div`
    display: flex;
    justify-content: center; // 중앙 정렬
    width: 100%;
`;


const AmountTitle = styled.h3`
    text-align: left; // h3만 왼쪽 정렬
    margin: 30px 0 10px 0; // 필요에 따라 아래 여백 조정
    padding-left: 60px
`;

const AmountSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 25px;
    gap: 20px;
    column-gap: 90px;
    margin: 0 auto;
    align-items: center;
    max-width: 600px;
`;

const AmountOption = styled.label`
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    margin: 5px 0;
    width: 100%;
    input {
        margin-right: 10px;
    }
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
    const [currentpoints, setCurrentPoints] = useState(0); 
    const [selectedAmount, setSelectedAmount] = useState(null); // 선택된 금액 
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

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.value); // 선택된 금액을 업데이트
    };

    const handleCompleteOrder = () => {
        if (selectedAmount) {
            setIsPaymentTriggered(true);
        } else {
            alert("충전 금액을 선택해 주세요.");
        }
    };

    useEffect(() => {
        // 결제 창을 띄우는 로직
        if (isPaymentTriggered && selectedAmount) {
            handlePayment();
        }
    }, [isPaymentTriggered, selectedAmount]);

    // 결제 창을 띄우는 함수
    async function handlePayment() {
        if (!window.IMP) {
            console.error("아임포트 라이브러리가 로드되지 않았습니다.");
            return;
        }

        window.IMP.init(process.env.REACT_APP_IMP_KEY); // 아임포트 식별 코드 초기화
        window.IMP.request_pay({
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `order_${new Date().getTime()}`, // 주문 고유 번호
            name: "SCHOLLI 구독 서비스",
            amount: selectedAmount, // 선택된 결제 금액
            buyer_name: user.fullname, 
            buyer_email: user.email,
            buyer_addr: user.residence
        }, async (rsp) => {
            if (rsp.success) {
                try {
                    const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/order/payment/${rsp.imp_uid}`, {
                        imp_uid: rsp.imp_uid,
                        merchant_uid: rsp.merchant_uid,
                        amount: selectedAmount,
                    });
                    console.log('결제 성공:', response.data);
                    setIsPaymentTriggered(false); // 결제 상태 초기화
                } catch (error) {
                    console.error('결제 확인 오류:', error);
                }
            } else {
                console.error('결제 실패:', rsp.error_msg);
            }
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
                        <PointsDisplay>{currentpoints}</PointsDisplay>
                    </Title>
                </Header>

                <Divider />

                    <AmountTitle>충전 금액</AmountTitle>
                    <AmountContainer>
                    <AmountSection>
                    <AmountOption>
                            <input type="radio" name="amount" value="1000" onChange={handleAmountChange} />
                            <span>100 포인트: 1,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="2000" onChange={handleAmountChange} />
                            <span>200 포인트: 2,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="3000" onChange={handleAmountChange} />
                            <span>300 포인트: 3,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="4000" onChange={handleAmountChange} />
                            <span>400 포인트: 4,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="5000" onChange={handleAmountChange} />
                            <span>500 포인트: 5,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="6000" onChange={handleAmountChange} />
                            <span>600 포인트: 6,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="7000" onChange={handleAmountChange} />
                            <span>700 포인트: 7,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="8000" onChange={handleAmountChange} />
                            <span>800 포인트: 8,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="9000" onChange={handleAmountChange} />
                            <span>900 포인트: 9,000원</span>
                        </AmountOption>
                        <AmountOption>
                            <input type="radio" name="amount" value="10000" onChange={handleAmountChange} />
                            <span>1000 포인트: 10,000원</span>
                        </AmountOption>
                    </AmountSection>
                </AmountContainer>
            </Section>

            <PayButton onClick={handleCompleteOrder}>
                {selectedAmount ? `${selectedAmount}원 결제하기` : "0원 결제하기"}
            </PayButton>
        </Container>
        </>

    );

};

export default Points;