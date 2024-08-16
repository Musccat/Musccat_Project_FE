import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from "../ui/NavBar";
import { useAuth } from "../contexts/AuthContext"; 

const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #D0D0D0;
    border-radius: 8px;
    background-color: #F9F9F9;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & label {
        flex: 1;
        font-weight: bold;
    }

    & input, & select, & textarea {
        flex: 2;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #D0D0D0;
        border-radius: 4px;
    }

    & textarea {
        height: 80px;
    }
`;

const RadioGroup = styled.div`
    display: flex;
    justify-content: space-between;

    & label {
        display: flex;
        align-items: center;
    }

    & input {
        margin-right: 5px;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #348a8c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        background-color: #267073;
    }
`;

const Space = styled.div`
    height: 20px; /* 여백 크기 설정 */
`;

const MemInfoFirst = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        dob: `${user?.birthYear}-${user?.birthMonth}-${user?.birthDay}` || '',
        region: '',
        district: '',
        incomeBracket: '',
        applicantCategory: '',
        school: '',
        major: '',
        year: '',
        semester: '',
        currentGPA: '',
        totalGPA: '',
        familyStatus: '',
        additionalInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };



    return (
        <>
        <NavBar />
        <Container>
            <Title>장학 정보 신규 입력</Title>
            <Space />
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <label>이름</label>
                    <div className="valueDisplay">{formData.name}</div>
                </FormGroup>

                <FormGroup>
                    <label>생년월일</label>
                    <div className="valueDisplay">{formData.dob}</div>
                </FormGroup>

                <FormGroup>
                    <label>거주 지역</label>
                    <select 
                        name="region" 
                        value={formData.region} 
                        onChange={handleChange}>
                        <option value="서울">서울</option>
                        <option value="부산">부산</option>
                        {/* Add more options as needed */}
                    </select>

                    <select 
                        name="district" 
                        value={formData.district} 
                        onChange={handleChange}>
                        <option value="서대문구">서대문구</option>
                        <option value="해운대구">해운대구</option>
                        {/* Add more options as needed */}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>소득 분위</label>
                    <select 
                        name="incomeBracket" 
                        value={formData.incomeBracket} 
                        onChange={handleChange}>
                        <option value="4분위">4 분위</option>
                        {/* Add more options as needed */}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>지원 계열</label>
                    <select 
                        name="applicantCategory" 
                        value={formData.applicantCategory} 
                        onChange={handleChange}>
                        <option value="이공계">이공계</option>
                        {/* Add more options as needed */}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>학교</label>
                    <input 
                        type="text" 
                        name="school" 
                        value={formData.school} 
                        onChange={handleChange} 
                        placeholder="학교명을 입력하세요"
                    />
                    <button>검색</button>
                </FormGroup>

                <FormGroup>
                    <label>학과/학년</label>
                    <select 
                        name="major" 
                        value={formData.major} 
                        onChange={handleChange}>
                        <option value="컴퓨터공학과">컴퓨터공학과</option>
                        {/* Add more options as needed */}
                    </select>
                    <select 
                        name="year" 
                        value={formData.year} 
                        onChange={handleChange}>
                        <option value="3학년">3학년</option>
                        {/* Add more options as needed */}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>수료 학기</label>
                    <select 
                        name="semester" 
                        value={formData.semester} 
                        onChange={handleChange}>
                        <option value="6학기">6학기</option>
                        {/* Add more options as needed */}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>성적</label>
                    <input 
                        type="text" 
                        name="currentGPA" 
                        value={formData.currentGPA} 
                        onChange={handleChange} 
                        placeholder="직전 학기 성적"
                    />
                    <input 
                        type="text" 
                        name="totalGPA" 
                        value={formData.totalGPA} 
                        onChange={handleChange} 
                        placeholder="전체 성적"
                    />
                </FormGroup>

                <FormGroup>
                    <label>기타</label>
                    <RadioGroup>
                        <label>
                            <input 
                                type="radio" 
                                name="familyStatus" 
                                value="다문화 가정" 
                                onChange={handleChange} 
                            />
                            다문화 가정
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="familyStatus" 
                                value="한부모 가정" 
                                onChange={handleChange} 
                            />
                            한부모 가정
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="familyStatus" 
                                value="기초 생활 수급자" 
                                onChange={handleChange} 
                            />
                            기초 생활 수급자
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="familyStatus" 
                                value="국가(독립) 유공자" 
                                onChange={handleChange} 
                            />
                            국가(독립) 유공자
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="familyStatus" 
                                value="다자녀 가정" 
                                onChange={handleChange} 
                            />
                            다자녀 가정
                        </label>
                    </RadioGroup>
                </FormGroup>

                <FormGroup>
                    <label>추가 정보</label>
                    <textarea 
                        name="additionalInfo" 
                        value={formData.additionalInfo} 
                        onChange={handleChange} 
                        placeholder="예: 프렌차이즈 카페에서 주 7시간 근무 중. 소득 분위 관련 장학금을 찾고 있음."
                    />
                </FormGroup>

                <SubmitButton type="submit">입력 완료</SubmitButton>
            </form>
        </Container>
        </>
    );

};


export default MemInfoFirst;