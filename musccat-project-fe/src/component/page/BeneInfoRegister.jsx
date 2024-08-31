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

const Note = styled.p`
    font-size: 0.8em;
    color: #666;
    margin-top: 5px;
    margin-bottom: 0;
`;

const NoteContainer = styled.div`
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: center;
    margin-left: 200px;
`;
const NoteContainer2 = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: center;
    margin-left: 200px;
`;

const LinkContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 210px;
`;

const StyledLink = styled.a`
    font-size: 0.8em;
    color: #348a8c;
    text-decoration: underline;
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

    const { addBenefitInfo, fetchFoundations, fetchScholarshipsByFoundation, user } = useAuth();
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

    const handleTotalGPAChange = (e) => {
        let value = e.target.value;
    
        // 음수값 또는 4.5 이상일 경우 값을 빈 값으로 설정
        if (value < 0 || value > 4.5) {
            setTotalGPA("");
        } else {
            // 소수점 둘째 자리까지만 유지
            if (value.includes('.')) {
                const [integerPart, decimalPart] = value.split('.');
                if (decimalPart.length > 2) {
                    value = `${integerPart}.${decimalPart.substring(0, 2)}`;
                }
            }
            setTotalGPA(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const selectedScholarshipData = scholarshipOptions.find(
            (scholarship) => scholarship.value === selectedScholarship
        );

        if (selectedScholarshipData) {
            const info = {
                user: {
                    id: user.id, // 로그인된 사용자의 ID를 사용
                    nickname: user.nickname // 로그인된 사용자의 닉네임을 사용
                },
                scholarship: {
                    id: selectedScholarshipData.product_id,
                    foundation_name: selectedFoundation.label,
                    name: selectedScholarshipData.value
                },
                incomeBracket: `${incomeBracket} 분위`,
                totalGPA,
                univCategory,
                semesterCategory,
                majorCategory,
                year: parseInt(year, 10), 
                advice,
                interviewTip,
            };

            await addBenefitInfo(selectedScholarshipData.product_id, info); // addBenefitInfo 함수 호출
            navigate(-1); // 이전 페이지로 이동
        } else {
            alert("장학 수혜 정보를 모두 입력해주세요.");
        }
    };


    const incomeBracketOptions = Array.from({length: 10}, (_, i) => ({ 
        value: `${i + 1}`, 
        label: `${i + 1}분위` 
    }));

    const univCategoryOptions = [
        { value: '4년제(5~6년제)', label: '4년제(5~6년제)' },
        { value: '전문대(2~3년제)', label: '전문대(2~3년제)' },
        { value: '해외대학', label: '해외대학' },
        {value: '학점은행제 대학', label: '학점은행제 대학'},
        {value: '원격대학', label: '원격대학'},
        {value: '기술대학', label: '기술대학'}
        
    ];

    const semesterCategoryOptions = [
        { value: '대학신입생', label: '대학신입생' },
        ...Array.from({ length: 9 }, (_, i) => ({ value: `${i + 2}학기`, label: `${i + 2}학기` })),
        { value: '대학 8학기이상', label: '대학 8학기이상' }
    ];

    const majorCategoryOptions = [
        { value: '공학계열', label: '공학계열' },
        { value: '교육계열', label: '교육계열' },
        { value: '사회계열', label: '사회계열' },
        { value: '예체능계열', label: '예체능계열' },
        { value: '의약계열', label: '의약계열' },
        { value: '인문계열', label: '인문계열' },
        { value: '자연계열', label: '자연계열' }
    ];

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
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="수혜 년도를 입력하세요"
                />
            </FormRow>

                    <FormRow>
                        <Label htmlFor="incomeBracket">수혜 당시 소득 분위</Label>
                        <StyledSelect
                            id="incomeBracket"
                            value={incomeBracket ? { label: `${incomeBracket} 분위`, value: incomeBracket } : null}
                            onChange={(option) => setIncomeBracket(option?.value || "")}
                            options={incomeBracketOptions}
                            placeholder="소득 분위 선택"
                        />
                    </FormRow>

                    <LinkContainer>
                        <StyledLink href="https://portal.kosaf.go.kr/CO/jspAction.do?forwardOnlyFlag=Y&forwardPage=pt/sm/custdsgn/PTSMIncpSmltMngt_01P&ignoreSession=Y" target="_blank" rel="noopener noreferrer">
                            소득 분위 정보 확인
                        </StyledLink>
                    </LinkContainer>

                    <FormRow>
                        <Label htmlFor="totalGPA">수혜 당시 전체 성적</Label>
                        <Input
                            id="totalGPA"
                            name="totalGPA"
                            type="number"
                            step="0.01"
                            value={totalGPA}
                            onChange={handleTotalGPAChange}
                            placeholder="수혜 당시 전체 성적"
                        />
                    </FormRow>

                    <NoteContainer>
                        <Note>* 직전 학기 성적과 전체 성적은 4.5 만점을 기준으로 함.</Note>
                    </NoteContainer>
                    <NoteContainer2>
                        <Note>* 소수점 둘째 자리까지 입력 가능</Note>
                    </NoteContainer2>

                    <FormRow>
                        <Label htmlFor="univCategory">대학 유형</Label>
                        <StyledSelect
                            id="univCategory"
                            value={univCategory ? { label: univCategory, value: univCategory } : null}
                            onChange={(option) => setUnivCategory(option?.value || "")}
                            options={univCategoryOptions}
                            placeholder="대학 유형 선택"
                        />
                    </FormRow>

                    <FormRow>
                        <Label htmlFor="semesterCategory">수혜 당시 수료 학기</Label>
                        <StyledSelect
                            id="semesterCategory"
                            value={semesterCategory ? { label: semesterCategory, value: semesterCategory } : null}
                            onChange={(option) => setSemesterCategory(option?.value || "")}
                            options={semesterCategoryOptions}
                            placeholder="수료 학기 선택"

                        />
                    </FormRow>

                    <FormRow style={{ marginBottom: '50px' }}>
                        <Label htmlFor="majorCategory">학과 계열</Label>
                        <StyledSelect
                            id="majorCategory"
                            value={majorCategory ? { label: majorCategory, value: majorCategory } : null}
                            onChange={(option) => setMajorCategory(option?.value || "")}
                            options={majorCategoryOptions}
                            placeholder="학과 계열 선택"
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