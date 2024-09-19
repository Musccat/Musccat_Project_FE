import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
    const location = useLocation();
    const info = location.state?.info || {};

    const [selectedFoundation, setSelectedFoundation] = useState(
    info.scholarship ? { value: info.scholarship.foundation_name, label: info.scholarship.foundation_name } : null
    );
    const [foundationOptions, setFoundationOptions] = useState([]);
    const [scholarshipOptions, setScholarshipOptions] = useState([]);
    const [selectedScholarship, setSelectedScholarship] = useState(
        info.scholarship ? { name: info.scholarship.name, product_id: info.scholarship.id } : null
    );

    const [income, setIncome] = useState(info.income?info.income.replace("분위", "") : ""); // 수혜 당시 소득 분위
    const [totalGPA, setTotalGPA] = useState(info.totalGPA || ""); // 수혜 당시 전체 성적
    const [univCategory, setUnivCategory] = useState(info.univCategory || ""); // 대학 유형 구분
    const [semesterCategory, setSemesterCategory] = useState(info.semesterCategory || ""); // 수혜 당시 수료 학기 구분 
    const [majorCategory, setMajorCategory] = useState(info.majorCategory || ""); // 학과 계열 구분

    const [year, setYear] = useState(info.year?.toString() || ""); // 수혜 년도
    const [advice, setAdvice] = useState(info.advice || ""); // 합격팁
    const [interviewTip, setInterviewTip] = useState(info.interviewTip || "");// 면접팁
    const [isFormValid, setIsFormValid] = useState(false);
    const [missingFields, setMissingFields] = useState([]);

    const { addBenefitInfo, fetchFoundations, fetchScholarshipsByFoundation, user, updateBenefitInfo, fetchUserData } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {  // user가 없을 때만 fetchUserData를 호출
                await fetchUserData();
            }
            setLoading(false);  // 데이터가 로드되면 로딩 상태 해제
        };
        fetchData();
    }, [user, fetchUserData]);

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
        const isValid =  (
                (!info.id || (selectedFoundation !== null && selectedScholarship !== null)) &&
                    income.trim() !== "" &&
                    totalGPA.trim() !== "" &&
                    univCategory.trim() !== "" &&
                    semesterCategory.trim() !== "" &&
                    majorCategory.trim() !== "" &&
                    year.trim() !== "" &&
                    advice.trim() !== "" &&
                    interviewTip.trim() !== ""
            );
        setIsFormValid(isValid);
    }, [selectedFoundation, selectedScholarship,  income, totalGPA, univCategory, semesterCategory, majorCategory, year, advice, interviewTip]); 

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

    const handleFoundationChange = async (selectedOption) => {
        console.log("Selected Foundation:", selectedOption);
        setSelectedFoundation(selectedOption);
        setSelectedScholarship(null);  // 장학금 선택 초기화
    
        if (selectedOption) {
            const scholarships = await fetchScholarshipsByFoundation(selectedOption.value);
            console.log("Scholarships:", scholarships);
            setScholarshipOptions(
                scholarships.map(scholarship => ({
                    value: scholarship.product_id, // product_id를 value로 설정
                    label: scholarship.name, // 장학 사업명을 표시
                }))
            );
        } else {
            setScholarshipOptions([]);
        }
    };

    const handleScholarshipSelect = (selectedOption) => {
        if (selectedOption) {
            setSelectedScholarship({
                name: selectedOption.label,  // 선택한 장학 사업명
                product_id: selectedOption.value,  // 선택한 product_id
            });
        } else {
            setSelectedScholarship(null);  // 선택 초기화
        }
    };

    const checkMissingFields = () => {
        const fields = [];

        if (!selectedFoundation) fields.push("장학 재단명");
        if (!selectedScholarship) fields.push("장학 사업명");
        if (!income.trim()) fields.push("수혜 당시 소득 분위");
        if (!totalGPA.trim()) fields.push("수혜 당시 전체 성적");
        if (!univCategory.trim()) fields.push("대학 유형");
        if (!semesterCategory.trim()) fields.push("수료 학기");
        if (!majorCategory.trim()) fields.push("학과 계열");
        if (!year.trim()) fields.push("수혜 년도");
        if (!advice.trim()) fields.push("합격 팁");
        if (!interviewTip.trim()) fields.push("면접 팁");

        return fields;
    };

    useEffect(() => {
        if (info) {
            setSelectedFoundation(info.scholarship ? { value: info.scholarship.foundation_name, label: info.scholarship.foundation_name } : selectedFoundation);
            setSelectedScholarship(info.scholarship ? { name: info.scholarship.name, product_id: info.scholarship.id } : selectedScholarship);
            setIncome(info.income ? info.income.replace("분위", "") : "");
            setTotalGPA(info.totalGPA || "");
            setUnivCategory(info.univCategory || "");
            setSemesterCategory(info.semesterCategory || "");
            setMajorCategory(info.majorCategory || "");
            setYear(info.year?.toString() || "");
            setAdvice(info.advice || "");
            setInterviewTip(info.interviewTip || "");
        }
    }, [info]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const missingFields = checkMissingFields();  // 빈 필드 배열 받기

        if (missingFields.length > 0) {  // 빈 필드가 있을 때만 알림 표시
            alert(`모든 필드를 입력해주세요.\n비어있는 항목: ${missingFields.join(', ')}`);
            console.log(`모든 필드를 입력해주세요.\n비어있는 항목: ${missingFields.join(', ')}`);
            return;
        }
    
        if (!selectedScholarship || !selectedScholarship.product_id) {
            alert("장학 수혜 정보를 모두 입력해주세요.");
            return;
        }

        const infoData = {
            user: {
                id: user.id
            },
            scholarship: {
                id: info.scholarship ? info.scholarship.id : selectedScholarship.product_id,
                foundation_name: info.scholarship ? info.scholarship.foundation_name : selectedFoundation.value,  // 장학 재단명
                name:  info.scholarship ? info.scholarship.name : selectedScholarship.name //장학 사업명
            },
            income: `${income}분위`,
            totalGPA,
            univCategory,
            semesterCategory,
            majorCategory,
            year: parseInt(year, 10),
            advice,
            interviewTip,
        };
    

        // 수혜 정보가 이미 존재하면 업데이트, 아니면 새로 추가
        try {
            if (info.id) {
                await updateBenefitInfo(selectedScholarship.product_id, info.id, infoData); // 수정
            } else {
                await addBenefitInfo(selectedScholarship.product_id, infoData); // 추가
            }
            navigate(`/reviews/${selectedScholarship.product_id}`); // 페이지 이동
        } catch (error) {
            console.error("정보 저장에 실패했습니다.", error);
            alert("정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;  // 로딩 중일 때 메시지 표시
    }

    const incomeOptions = Array.from({length: 10}, (_, i) => ({ 
        value: `${i + 1}`, 
        label: `${i + 1}분위` 
    }));

    const univCategoryOptions = [
        { value: '4년제(5~6년제)', label: '4년제(5~6년제)' },
        { value: '전문대(2~3년제)', label: '전문대(2~3년제)' },
        { value: '해외대학', label: '해외대학' },
        { value: '학점은행제 대학', label: '학점은행제 대학'},
        { value: '원격대학', label: '원격대학'},
        { value: '기술대학', label: '기술대학'}
        
    ];

    const semesterCategoryOptions = [
        { value: '대학신입생', label: '대학신입생' },
        ...Array.from({ length: 7 }, (_, i) => ({ value: `${i + 2}학기`, label: `${i + 2}학기` })),
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
        <Title>{info.id ? "장학 수혜 정보 수정" : "장학 수혜 정보 입력"}</Title>
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
                    isDisabled={!!info.id}
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
                            ? { label: selectedScholarship.name, value: selectedScholarship.name }
                            : null
                    }
                    onChange={handleScholarshipSelect}
                    options={scholarshipOptions}
                    placeholder="장학 사업명을 선택하세요"
                    isDisabled={!selectedFoundation || !!info.id} 
                    isSearchable

                />
            </FormRow>

            <FormRow>
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
                <Label htmlFor="income">수혜 당시 소득 분위</Label>
                    <StyledSelect
                        id="income"
                        value={income ? { label: `${income}분위`, value: income } : null}
                        onChange={(option) => setIncome(option?.value || "")}
                        options={incomeOptions}
                        placeholder="소득 분위 선택"
                    />
            </FormRow>

            <LinkContainer>
                <StyledLink href="https://portal.kosaf.go.kr/CO/jspAction.do?forwardOnlyFlag=Y&forwardPage=pt/sm/custdsgn/PTSMIncpSmltMngt_01P&ignoreSession=Y" target="_blank" rel="noopener noreferrer">
                    소득 분위 정보 확인
                </StyledLink>
            </LinkContainer>

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
                <Label htmlFor="majorCategory">학과 계열</Label>
                    <StyledSelect
                        id="majorCategory"
                        value={majorCategory ? { label: majorCategory, value: majorCategory } : null}
                        onChange={(option) => setMajorCategory(option?.value || "")}
                        options={majorCategoryOptions}
                        placeholder="학과 계열 선택"
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
                <Note>* 직전 학기 성적과 전체 성적은 4.5 만점을 기준으로 함</Note>
            </NoteContainer>
            <NoteContainer2>
                <Note>* 소수점 둘째 자리까지 입력 가능</Note>
            </NoteContainer2>

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
                {info.id ? "수정 완료" : "입력 완료"}
            </SubmitButton>
            </ButtonContainer>
        </FormContainer>
        </PageWrapper>
        </>
    );

};

export default BeneInfoRegister;