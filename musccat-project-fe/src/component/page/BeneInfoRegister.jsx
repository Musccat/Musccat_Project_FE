import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import scholarships from "../data/scholarshipdata";

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

const Select = styled.select`
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
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
    const [searchScholar, setSearchScholar] = useState("");
    const [scholarshipName, setScholarshipName] = useState([]);
    const [businessName, setBusinessName] = useState("");
    const [year, setYear] = useState("");
    const [advice, setAdvice] = useState("");
    const [interviewTip, setInterviewTip] = useState("");
    const [isFormValid, setIsFormValid] = useState(false); 

    const { addBenefitInfo } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인하고 isFormValid 업데이트
        const isValid = searchScholar.trim() !== "" &&
                        businessName.trim() !== "" &&
                        year.trim() !== "" &&
                        advice.trim() !== "" &&
                        interviewTip.trim() !== "";

        setIsFormValid(isValid);
    }, [searchScholar, businessName, year, advice, interviewTip]); 

    const handleSearch = () => {
        const filtered = scholarships.filter(scholarship =>
            scholarship.foundation_name.toLowerCase().includes(searchScholar.toLowerCase())
        );
        setScholarshipName(filtered);
        if (filtered.length > 0) {
            setBusinessName(filtered[0].name); // Automatically select the first matching business name
        } else {
            setBusinessName("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {
            foundation_name: searchScholar,
            name: businessName,
            year,
            basicInfo: "", 
            advice,
            interviewTip,
        };

        const product_id = scholarshipName.length > 0 ? scholarshipName[0].product_id : ""; // 첫 번째 장학금 ID 사용

        if (product_id) {
            await addBenefitInfo(product_id, info); // addBenefitInfo 함수 호출
            navigate(-1);  // 이전 페이지로 이동
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
            <Label htmlFor="scholarshipSearch">장학 재단명</Label>
                        <Input
                            id="scholarshipSearch"
                            type="text"
                            value={searchScholar}
                            onChange={(e) => setSearchScholar(e.target.value)}
                            placeholder="장학 재단명을 입력하세요"
                        />
                        <SubmitButton type="button" onClick={handleSearch}>검색</SubmitButton>
            </FormRow>

            <FormRow>
            <Label htmlFor="scholarshipBusiness">장학 사업명</Label>
                <Select
                    id="scholarshipBusiness"
                    name="scholarshipBusiness"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                >
                    {scholarshipName.map(scholarship => (
                    <option key={scholarship.product_id} value={scholarship.name}>
                    {scholarship.name}
                    </option>
                ))}
                </Select>
            </FormRow>

            <FormRow>
            <Label htmlFor="year">수혜 년도</Label>
            <Select id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">수혜 년도 선택</option>  {/* 기본 빈 옵션 추가 */}
                <option value="2021">2021</option>
            </Select>
            </FormRow>

            <FormRow>
            <Label htmlFor="advice">합격 팁</Label>
            <TextArea id="advice" name="advice" value={advice} onChange={(e) => setAdvice(e.target.value)} />
            </FormRow>

            <FormRow>
            <Label htmlFor="interview">면접 팁</Label>
            <TextArea id="interview" name="interview" value={interviewTip} onChange={(e) => setInterviewTip(e.target.value)} />
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