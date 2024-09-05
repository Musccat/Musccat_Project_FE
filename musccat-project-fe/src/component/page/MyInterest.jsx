import React from 'react';
import NavBar from '../ui/NavBar';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #348a8c;
    border-radius: 8px;
    background-color: #white;
`;

const MyInterest = () => {
    const navigate = useNavigate();


    return (
        <>
        <NavBar/>
        <Container>

        </Container>
        </>
    );
};

export default MyInterest;