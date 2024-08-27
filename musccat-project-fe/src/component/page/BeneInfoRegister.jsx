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

const NoticeText = styled.p`
    font-size: 14px;
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

    const [incomeBracket, setIncomeBracket] = useState(""); // 수혜 당시 소득 분위
    const [totalGPA, setTotalGPA] = useState(""); // 수혜 당시 전체 성적
    const [univCategory, setUnivCategory] = useState(""); // 대학 유형 구분
    const [semesterCategory, setSemesterCategory] = useState(""); // 수혜 당시 수료 학기 구분 
    const [majorCategory, setMajorCategory] = useState(""); // 학과 계열 구분

    const [year, setYear] = useState(""); // 수혜 년도
    const [advice, setAdvice] = useState(""); // 합격팁
    const [interviewTip, setInterviewTip] = useState("");// 면접팁
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
                        incomeBracket.trim() !== "" &&
                        totalGPA.trim() !== "" &&
                        univCategory.trim() !== "" &&
                        semesterCategory.trim() !== "" &&
                        majorCategory.trim() !== "" &&
                        year.trim() !== "" &&
                        advice.trim() !== "" &&
                        interviewTip.trim() !== "";

        setIsFormValid(isValid);
    }, [selectedFoundation, selectedScholarship,  incomeBracket, totalGPA, univCategory, semesterCategory, majorCategory, year, advice, interviewTip]); 


    const handleFoundationChange = async (selectedOption) => {
        setSelectedFoundation(selectedOption);
        setSelectedScholarship("");

        if (selectedOption) {
            const scholarships = await fetchScholarshipsByFoundation(selectedOption.value);
            setScholarshipOptions(
                scholarships.map(scholarship => ({
                    value: scholarship.name,
                    label: scholarship.name,
                    product_id: scholarship.id,
                }))
            );
        } else {
            setScholarshipOptions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const info = {
            foundation_name: selectedFoundation,
            name: selectedScholarship,
            incomeBracket,
            totalGPA,
            univCategory,
            semesterCategory,
            majorCategory,
            year, 
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
        <NoticeText>* 표시 항목은 필수 항목입니다.</NoticeText>
        <FormContainer>
            <FormRow>
                <Label htmlFor="foundationSelect">
                    장학 재단명<span>*</span>
                </Label>
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
                <Label htmlFor="scholarshipSelect">
                    장학 사업명<span>*</span>
                </Label>
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

            <FormRow style={{ marginBottom: '50px' }}>
                <Label htmlFor="year">
                    수혜 년도<span>*</span>
                </Label>
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
                        <Label htmlFor="incomeBracket">수혜 당시 소득 분위</Label>
                        <Input
                            id="incomeBracket"
                            name="incomeBracket"
                            type="text"
                            value={incomeBracket}
                            onChange={(e) => setIncomeBracket(e.target.value)}
                            placeholder="수혜 당시 소득 분위"
                        />
                    </FormRow>

                    <FormRow>
                        <Label htmlFor="totalGPA">수혜 당시 전체 성적</Label>
                        <Input
                            id="totalGPA"
                            name="totalGPA"
                            type="text"
                            value={totalGPA}
                            onChange={(e) => setTotalGPA(e.target.value)}
                            placeholder="수혜 당시 전체 성적"
                        />
                    </FormRow>

                    <FormRow>
                        <Label htmlFor="univCategory">대학 유형</Label>
                        <Input
                            id="univCategory"
                            name="univCategory"
                            type="text"
                            value={univCategory}
                            onChange={(e) => setUnivCategory(e.target.value)}
                            placeholder="대학 유형 구분"
                        />
                    </FormRow>

                    <FormRow>
                        <Label htmlFor="semesterCategory">수혜 당시 수료 학기</Label>
                        <Input
                            id="semesterCategory"
                            name="semesterCategory"
                            type="text"
                            value={semesterCategory}
                            onChange={(e) => setSemesterCategory(e.target.value)}
                            placeholder="수혜 당시 수료 학기 구분"
                        />
                    </FormRow>

                    <FormRow style={{ marginBottom: '50px' }}>
                        <Label htmlFor="majorCategory">학과 계열</Label>
                        <Input
                            id="majorCategory"
                            name="majorCategory"
                            type="text"
                            value={majorCategory}
                            onChange={(e) => setMajorCategory(e.target.value)}
                            placeholder="학과 계열 구분"
                        />
                    </FormRow>

                    <FormRow style={{ marginBottom: '20px', alignItems: 'flex-start' }}>
                        <Label htmlFor="advice" style={{ marginTop: '8px' }}>
                            합격 팁<span>*</span>
                        </Label>
                        <TextArea
                            id="advice"
                            name="advice"
                            value={advice}
                            onChange={(e) => setAdvice(e.target.value)}
                            placeholder="본인의 상황과 경험을 구체적으로 공유하세요!
지원 과정에서 어떤 준비를 했고, 무엇이 도움이 되었는지에 대한 실질적인 조언이 다른 지원자들에게 큰 도움이 됩니다!"
                        />
                    </FormRow>

                    <FormRow style={{ marginBottom: '20px', alignItems: 'flex-start' }}>
                    <Label htmlFor="interview" style={{ marginTop: '8px' }}>면접 팁</Label>
                        <TextArea 
                            id="interview"
                            name="interview" 
                            value={interviewTip} 
                            onChange={(e) => setInterviewTip(e.target.value)} 
                            placeholder="면접 준비 팁을 구체적으로 적어주세요!
어떤 질문을 받았고 어떻게 대처했는지, 그리고 도움이 되었던 준비 방법을 공유하면 다른 지원자들에게 큰 도움이 됩니다!"
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