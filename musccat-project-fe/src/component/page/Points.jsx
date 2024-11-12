import React, { useState } from "react";
import NavBar from '../ui/NavBar';
import styled from 'styled-components';
import coin from '../ui/Coin.jpeg'

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

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.value); // 선택된 금액을 업데이트
    };

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

            <PayButton>
                {selectedAmount ? `${selectedAmount}원 결제하기` : "0원 결제하기"}
            </PayButton>
        </Container>
        </>

    );

};

export default Points;