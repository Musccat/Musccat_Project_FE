import React, { useState, useEffect  } from "react";
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

const Space = styled.div`
    height: 10px; /* 여백 크기 설정 */
`;

const Line = styled.hr`
    border: none;
    border-top: 3px dashed #348a8c; 
    margin: 10px 0;
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
    const navigate = useNavigate();

    const { RegisterScholarship } = useAuth();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formValues, setFormValues] = useState({
        product_type: '장학금', // 디폴트 값 설정
        managing_organization_type: '',
        foundation_name: '',
        name: '',
        financial_aid_type: '',
        website_url: '',
        recruitment_start: '',
        recruitment_end: '',
        university_type: '',
        major_field_type: '',
        academic_year_type: '',
        selection_method_details: '',
        number_of_recipients_details: '',
        grade_criteria_details: '',
        income_criteria_details: '',
        residency_requirement_details: '',
        eligibility_restrictions: '',
        required_documents_details: '',
        support_details: '',
        recommendation_required: '',
        specific_qualification_details: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인하고 isFormValid 업데이트
        const isValid =  (
        formValues.managing_organization_type.trim() !== "" &&
        formValues.foundation_name.trim() !== "" &&
        formValues.name.trim() !== "" &&
        formValues.financial_aid_type.trim() !== "" &&
        formValues.website_url.trim() !== "" &&
        formValues.recruitment_start.trim() !== "" &&
        formValues.recruitment_end.trim() !== "" &&
        formValues.university_type.trim() !== "" &&
        formValues.major_field_type.trim() !== "" &&
        formValues.academic_year_type.trim() !== "" &&
        formValues.selection_method_details.trim() !== "" &&
        formValues.number_of_recipients_details.trim() !== "" &&
        formValues.grade_criteria_details.trim() !== "" &&
        formValues.income_criteria_details.trim() !== "" &&
        formValues.residency_requirement_details.trim() !== "" &&
        formValues.eligibility_restrictions.trim() !== "" &&
        formValues.required_documents_details.trim() !== "" &&
        formValues.support_details.trim() !== "" &&
        formValues.recommendation_required.trim() !== "" &&
        formValues.specific_qualification_details.trim() !== ""
            );
        setIsFormValid(isValid);
    }, [
    formValues.managing_organization_type,
    formValues.foundation_name,
    formValues.name,
    formValues.financial_aid_type,
    formValues.website_url,
    formValues.recruitment_start,
    formValues.recruitment_end,
    formValues.university_type,
    formValues.major_field_type,
    formValues.academic_year_type,
    formValues.selection_method_details,
    formValues.number_of_recipients_details,
    formValues.grade_criteria_details,
    formValues.income_criteria_details,
    formValues.residency_requirement_details,
    formValues.eligibility_restrictions,
    formValues.required_documents_details,
    formValues.support_details,
    formValues.recommendation_required,
    formValues.specific_qualification_details 
    ]); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await RegisterScholarship(formValues);  // RegisterScholarship 내부에서 alert 처리
        navigate("/main");  // 입력 성공 시 메인 페이지로 이동
    };

    const univCategoryOptions = [
        { value: '4년제(5~6년제포함)', label: '4년제(5~6년제포함)' },
        { value: '전문대(2~3년제)', label: '전문대(2~3년제)' },
        { value: '해외대학', label: '해외대학' },
        { value: '학점은행제 대학', label: '학점은행제 대학'},
        { value: '원격대학', label: '원격대학'},
        { value: '기술대학', label: '기술대학'}
        
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

    const semesterCategoryOptions = [
        { value: '대학신입생', label: '대학신입생' },
        ...Array.from({ length: 7 }, (_, i) => ({ value: `대학${i + 2}학기`, label: `대학${i + 2}학기` })),
        { value: '대학8학기이상', label: '대학8학기이상' }
    ];

    const financialOptions = [
        { value: '지역연고', label: '지역연고'},
        { value: '성적우수', label: '성적우수'},
        { value: '소득구분', label: '소득구분'},
        { value: '특기자', label: '특기자'},
        { value: '기타', label:'기타'}
    ];

    return (
        <>
        <NavBar/>
        <PageWrapper>
            <Title>장학금 등록</Title>
            <FormContainer>
                <FormRow>
                    <Label>상품 유형</Label>
                    <Input 
                        name="product_type"
                        value="장학금" 
                        disabled />
                    </FormRow>
                    <FormRow>
                        <Label>장학 운영기관</Label>
                        <Input 
                            name="managing_organization_type" 
                            value={formValues.managing_organization_type} 
                            onChange={handleChange}
                            placeholder="장학 운영기관" />
                    </FormRow>
                    <FormRow>
                        <Label>장학 운영기관명 (재단명)</Label>
                        <Input 
                            name="foundation_name" 
                            value={formValues.foundation_name} 
                            onChange={handleChange}
                            placeholder="장학 운영기관명" />
                    </FormRow>
                    <FormRow>
                        <Label>장학 사업명</Label>
                        <Input 
                            name="name" 
                            value={formValues.name} 
                            onChange={handleChange}
                            placeholder="장학 운영기관명"/>
                    </FormRow>
                    <FormRow>
                        <Label>장학금 유형</Label>
                        <StyledSelect 
                            name="financial_aid_type" 
                            options={financialOptions}
                            value={financialOptions.find(option => option.value === formValues.financial_aid_type)} 
                            onChange={(selectedOption) => handleChange({ target: { name: 'financial_aid_type', value: selectedOption.value } })}
                            placeholder="장학금 유형"/>
                    </FormRow>
                    <FormRow>
                        <Label>장학재단 홈페이지 주소</Label>
                        <Input 
                            type="url"
                            name="website_url" 
                            value={formValues.website_url} 
                            onChange={handleChange} 
                            placeholder="https://example.com"/>
                    </FormRow>

                    <Space />
                    <Line />
                    <Space />
                    <Space />

                    <FormRow>
                        <Label>모집 시기</Label>
                        <Input
                            type="date"
                            name="recruitment_start"
                            value={formValues.recruitment_start}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    recruitment_start: e.target.value,
                                })
                            }
                        />
                        <span style={{ margin: "0 10px" }}> ~ </span>
                        <Input
                            type="date"
                            name="recruitment_end"
                            value={formValues.recruitment_end}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    recruitment_end: e.target.value,
                                })
                            }
                        />
                    </FormRow>

                    <FormRow>
                        <Label>대학 유형</Label>
                        <StyledSelect
                            name="university_type" 
                            options={univCategoryOptions}
                            value={univCategoryOptions.find(option => option.value === formValues.university_type)} 
                            onChange={(selectedOption) => handleChange({ target: { name: 'university_type', value: selectedOption.value } })}
                            placeholder="대학 유형"/>
                    </FormRow>
                    <FormRow>
                        <Label>학과 구분</Label>  
                        <StyledSelect 
                            name="major_field_type" 
                            options={majorCategoryOptions}
                            value={majorCategoryOptions.find(option => option.value === formValues.major_field_type)} 
                            onChange={(selectedOption) => handleChange({ target: { name: 'major_field_type', value: selectedOption.value } })}
                            placeholder="학과 구분"/>
                    </FormRow>
                    <FormRow>
                        <Label>학년 구분</Label>
                        <StyledSelect
                            name="academic_year_type"
                            options={semesterCategoryOptions} 
                            value={semesterCategoryOptions.find(option => option.value === formValues.academic_year_type)} 
                            onChange={(selectedOption) => handleChange({ target: { name: 'academic_year_type', value: selectedOption.value } })}
                            placeholder="학년 구분" />
                    </FormRow>

                    <Space />
                    <Line />
                    <Space />
                    <Space />

                    <FormRow>
                        <Label>선발방법 상세 내용</Label>
                        <Input 
                            name="selection_method_details" 
                            value={formValues.selection_method_details} 
                            onChange={handleChange}
                            placeholder="선발방법 상세 내용" />
                    </FormRow>
                    <FormRow>
                        <Label>선발인원 상세 내용</Label>
                        <Input 
                            name="number_of_recipients_details" 
                            value={formValues.number_of_recipients_details} 
                            onChange={handleChange}
                            placeholder="선발인원 상세 내용" />
                    </FormRow>
                    <FormRow>
                        <Label>성적기준 상세 내용</Label>
                        <Input 
                            name="grade_criteria_details" 
                            value={formValues.grade_criteria_details} 
                            onChange={handleChange}
                            placeholder="성적기준 상세 내용" />
                    </FormRow>
                    <FormRow>
                        <Label>소득기준 상세 내용</Label>
                        <Input 
                            name="income_criteria_details" 
                            value={formValues.income_criteria_details} 
                            onChange={handleChange} 
                            placeholder="소득기준 상세 내용"/>
                    </FormRow>
                    <FormRow>
                        <Label>거주지역여부 상세 내용</Label>
                        <Input 
                            name="residency_requirement_details" 
                            value={formValues.residency_requirement_details} 
                            onChange={handleChange} 
                            placeholder="거주지역여부 상세 내용"/>
                    </FormRow>
                    <FormRow>
                        <Label>자격제한 상세 내용</Label>
                        <Input 
                            name="eligibility_restrictions" 
                            value={formValues.eligibility_restrictions} 
                            onChange={handleChange}
                            placeholder="자격제한 상세 내용" />
                    </FormRow>
                    <FormRow>
                        <Label>제출서류 상세 내용</Label>
                        <Input 
                            name="required_documents_details" 
                            value={formValues.required_documents_details} 
                            onChange={handleChange}
                            placeholder="제출서류 상세 내용" />
                    </FormRow>
                    <FormRow>
                        <Label>지원내역 상세 내용</Label>
                        <Input 
                            name="support_details" 
                            value={formValues.support_details} 
                            onChange={handleChange}
                            placeholder="지원내역 상세 내용" />
                    </FormRow>
                    <FormRow>
                        <Label>추천필요여부 상세 내용</Label>
                        <Input 
                            name="recommendation_required" 
                            value={formValues.recommendation_required} 
                            onChange={handleChange} 
                            placeholder="추천필요여부 상세 내용"/>
                    </FormRow>
                    <FormRow>
                        <Label>특정자격 상세 내용</Label>
                        <Input
                            name="specific_qualification_details" 
                            value={formValues.specific_qualification_details} 
                            onChange={handleChange} 
                            placeholder="특정자격 상세 내용"/>
                    </FormRow>

                    <ButtonContainer>
                        <SubmitButton 
                            type="button" 
                            onClick={handleSubmit}
                            disabled={!isFormValid} >
                                입력 완료
                        </SubmitButton>
                    </ButtonContainer>
            </FormContainer>
        </PageWrapper>
        </>

    );



};

export default AddScholar;