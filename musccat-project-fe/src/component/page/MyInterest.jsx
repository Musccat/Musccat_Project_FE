import React from 'react';
import NavBar from '../ui/NavBar';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";

const Wrapper = styled.div`
    max-width: 800px;
    margin: 50px auto; 
    padding: 0 20px;
`;

const Container = styled.div`
    padding: 20px;
    border: 1px solid #348a8c;
    border-radius: 8px;
    background-color: #white;
`;

const Heading = styled.h1`
    margin: 0 0 20px 0;
    text-align: left;
    color: black;
`;

const MyInterest = () => {
    const navigate = useNavigate();


    return (
        <>
        <NavBar/>
            <Wrapper>
                <Heading>내 관심목록</Heading>
                <Container>
                    {/* Your table or other content goes here */}
                </Container>
            </Wrapper>
        </>
    );
};

export default MyInterest;