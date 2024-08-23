import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
    flex: 0 0 100px;
    font-weight: bold;
    color: #333;
`;
const StyledSelect = styled(Select)`
    flex: 1;
`;

const TextArea = styled.textarea`
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
    resize: vertical;
    min-height: 100px;
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

const BeneInfoRegister = () => {
    const [selectedFoundation, setSelectedFoundation] = useState("");
    const [foundationOptions, setFoundationOptions] = useState([]);
    const [scholarshipOptions, setScholarshipOptions] = useState([]);
    const [selectedScholarship, setSelectedScholarship] = useState("");
    const [year, setYear] = useState("");
    const [advice, setAdvice] = useState("");
    const [interviewTip, setInterviewTip] = useState("");
    const [isFormValid, setIsFormValid] = useState(false); 

    const { addBenefitInfo, fetchFoundations, fetchScholarshipsByFoundation } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch foundations on component mount
        const loadFoundations = async () => {
            const foundations = await fetchFoundations();
            setFoundationOptions(
                foundations.map(foundation => ({
                    value: foundation.name,
                    label: foundation.name,
                }))
            );
        };
        loadFoundations();
    }, [fetchFoundations]);

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인하고 isFormValid 업데이트
        const isValid =  
                        selectedFoundation !== null &&
                        selectedFoundation.label &&
                        selectedScholarship.trim() !== "" &&
                        year.trim() !== "" &&
                        advice.trim() !== "" &&
                        interviewTip.trim() !== "";

        setIsFormValid(isValid);
    }, [selectedFoundation, selectedScholarship, year, advice, interviewTip]); 


    const handleFoundationChange = async (selectedOption) => {
        setSelectedFoundation(selectedOption);
        setSelectedScholarship("");

        if (selectedOption) {
            const scholarships = await fetchScholarshipsByFoundation(selectedOption.value);
            setScholarshipOptions(
                scholarships.map(scholarship => ({
                    value: scholarship.name,
                    label: scholarship.name,
                }))
            );
        } else {
            setScholarshipOptions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFoundation || !selectedScholarship) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const info = {
            foundation_name: selectedFoundation,
            name: selectedScholarship,
            year,
            basicInfo: "", 
            advice,
            interviewTip,
        };

        const selectedScholarshipData = scholarshipOptions.find(
            (scholarship) => scholarship.value === selectedScholarship
        );

        if (selectedScholarshipData) {
            const product_id = selectedScholarshipData.product_id;
            await addBenefitInfo(product_id, info); // addBenefitInfo 함수 호출
            navigate(-1); // 이전 페이지로 이동
        } else {
            alert("장학 수혜 정보를 모두 입력해주세요.");
        }
    };

    return (
        <>
        <NavBar />
        <PageWrapper>
        <Title>장학 수혜 정보 입력</Title>
        <FormContainer>
            <FormRow>
                <Label htmlFor="foundationSelect">장학 재단명</Label>
                <StyledSelect
                    id="foundationSelect"
                    value={selectedFoundation}
                    onChange={handleFoundationChange}
                    options={foundationOptions}
                    placeholder="장학 재단명을 선택하세요"
                    isSearchable
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="scholarshipSelect">장학 사업명</Label>
                <StyledSelect
                    id="scholarshipSelect"
                    value={
                        selectedScholarship
                            ? { label: selectedScholarship, value: selectedScholarship }
                            : null
                    }
                    onChange={(option) => setSelectedScholarship(option?.value || "")}
                    options={scholarshipOptions}
                    placeholder="장학 사업명을 선택하세요"
                    isDisabled={!selectedFoundation}
                    isSearchable
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="year">수혜 년도</Label>
                <Input
                    id="year"
                    name="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="수혜 년도를 입력하세요"
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="advice">합격 팁</Label>
                <TextArea
                    id="advice"
                    name="advice"
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                />
            </FormRow>

            <FormRow>
            <Label htmlFor="interview">면접 팁</Label>
                <TextArea 
                    id="interview"
                    name="interview" 
                    value={interviewTip} 
                    onChange={(e) => setInterviewTip(e.target.value)} 
                />
            </FormRow>

            <ButtonContainer>
            <SubmitButton 
                type="button" 
                onClick={handleSubmit}
                disabled={!isFormValid} 
            >
                입력 완료
            </SubmitButton>
            </ButtonContainer>
        </FormContainer>
        </PageWrapper>
        
        
        </>

    );

};

export default BeneInfoRegister;