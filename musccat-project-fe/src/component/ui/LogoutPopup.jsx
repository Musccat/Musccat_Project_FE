import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    text-align: center;
`;

const ModalText = styled.p`
    margin-bottom: 24px;
    font-size: 18px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ModalButton = styled.button`
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #267073;
    }
`;

const LogoutModal = ({ onConfirm, onCancel }) => {
    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalText>로그아웃 하시겠습니까?</ModalText>
                <ButtonContainer>
                    <ModalButton primary onClick={onConfirm}>예</ModalButton>
                    <ModalButton onClick={onCancel}>아니오</ModalButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default LogoutModal;