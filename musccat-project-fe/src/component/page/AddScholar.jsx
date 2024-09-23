import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../ui/NavBar";
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
    height: 20px; /* 여백 크기 설정 */
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
    const { RegisterScholarship } = useAuth();
    const [formValues, setFormValues] = useState({
        product_id: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        await RegisterScholarship(formValues); // Pass form values to RegisterScholarship function
    };

    return (
        <>
        <NavBar/>
        <PageWrapper>
            <Title>장학금 등록</Title>
            <FormContainer>
            <FormRow>
                        <Label>상품 유형</Label>
                        <Input 
                            name="product_id"
                            value={formValues.product_id} 
                            onChange={handleChange}
                            placeholder="상품 유형" />
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
                        <Input 
                            name="financial_aid_type" 
                            value={formValues.financial_aid_type} 
                            onChange={handleChange}
                            placeholder="장학금 유형" />
                    </FormRow>
                    <FormRow>
                        <Label>장학재단 홈페이지 주소</Label>
                        <Input 
                            name="website_url" 
                            value={formValues.website_url} 
                            onChange={handleChange} 
                            placeholder="장학재단 홈페이지 url"/>
                    </FormRow>

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
                        <Input 
                            name="university_type" 
                            value={formValues.university_type} 
                            onChange={handleChange} 
                            placeholder="대학 유형"/>
                    </FormRow>
                    <FormRow>
                        <Label>학과 구분</Label>
                        <Input 
                            name="major_field_type" 
                            value={formValues.major_field_type} 
                            onChange={handleChange} 
                            placeholder="학과 구분"/>
                    </FormRow>
                    <FormRow>
                        <Label>학년 구분</Label>
                        <Input 
                            name="academic_year_type" 
                            value={formValues.academic_year_type} 
                            onChange={handleChange}
                            placeholder="학년 구분" />
                    </FormRow>
                    {/* Detailed info */}
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
                        <SubmitButton onClick={handleSubmit}>입력 완료</SubmitButton>
                    </ButtonContainer>
            </FormContainer>
        </PageWrapper>
        </>

    );



};

export default AddScholar;