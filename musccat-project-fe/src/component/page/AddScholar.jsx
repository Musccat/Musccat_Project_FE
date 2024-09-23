import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import Select from 'react-select';

const PageWrapper = styled.div`
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

const FormContainer = styled.div`
    border: 1px solid #348a8c;
    border-radius: 10px;
    padding: 20px;
    background-color: #white;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Label = styled.label`
    flex: 0 0 200px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center; /* 텍스트와 *를 수직 정렬하기 위해 사용 */
    
    span {
        color: red;
        margin-left: 4px; /* 텍스트와 * 사이에 약간의 여백 추가 */
    }
`;


const StyledSelect = styled(Select)`
    flex: 1;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
    margin-right: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    background-color: ${(props) => (props.disabled ? "#ccc" : "#348a8c")};
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    border-radius: 4px;
`;

const AddScholar = () => {




    return (
        <>
        <NavBar/>
        <PageWrapper>
            <Title>장학금 등록</Title>
            <FormContainer>

            </FormContainer>
        </PageWrapper>
        </>

    );



};

export default AddScholar;