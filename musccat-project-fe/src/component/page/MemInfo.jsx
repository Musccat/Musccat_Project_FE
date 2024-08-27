import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    & label {
        flex: 0 0 150px; 
        font-weight: bold;
        text-align: right;
        margin-right: 40px;
    }

    & input, & select, & textarea {
        flex: 1.5;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #D0D0D0;
        border-radius: 4px;
    }
    & button {
        margin-left: 10px; /* 검색 버튼을 입력 필드와 더 가깝게 배치 */
        padding: 8px 16px;
        font-size: 14px;
        border: none;
        background-color: #348a8c;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
            background-color: #267073;
        }
    }

    & textarea {
        height: 80px;
    }
`;


const RadioGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    align-items: center;

    & label {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }

    & input {
        margin-right: 5px;
    }
`;
const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    font-size: 0.9em; /* 글꼴 크기 조정 */
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
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
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
    padding-left: 190px;
`;
const NoteContainer2 = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: center;
    padding-left: 190px;
`;

const Space = styled.div`
    height: 20px; /* 여백 크기 설정 */
`;


const MemInfo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const isInfoSubmitted = state?.isInfoSubmitted || false;
    const { user, fetchUserData, updateUser } = useAuth();
    const [formValid, setFormValid] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user?.fullname || '',
        dob: `${user?.birthYear}-${user?.birthMonth}-${user?.birthDay}` || '',
        email: user?.email || '',
        nickname: user?.userNickname || '',
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

    useEffect(() => {
        if (isInfoSubmitted) {
            // 기존 정보 수정 시 이미 모든 필드가 채워져 있으므로 폼을 유효하다고 설정
            setFormValid(true);
        } else {
            // 신규 정보 입력 시 모든 필드가 채워져 있는지 확인
            const isFormValid = () => {
                const requiredFields = [
                    'nickname',
                    'region',
                    'district',
                    'incomeBracket',
                    'applicantCategory',
                    'school',
                    'major',
                    'year',
                    'semester',
                    'currentGPA',
                    'totalGPA'
                ];
            
            return requiredFields.every(field => {
                if (Array.isArray(formData[field])) {
                    return formData[field].length > 0;
                }
                return formData[field]?.trim() !== '';
            });
        };
    
        setFormValid(isFormValid());
        }
    }, [formData, isInfoSubmitted]);
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();  // 사용자 데이터를 가져오는 비동기 함수 호출
            if (user) {
                setFormData({
                    ...formData,
                    fullname: user.fullName,
                    dob: user.userBirthdate,
                    email: user.email,
                    nickname: user.userNickname || '',
                    region: user.region || '',
                    district: user.district || '',
                    incomeBracket: user.incomeBracket || '',
                    applicantCategory: user.applicantCategory || '',
                    school: user.school || '',
                    major: user.major || '',
                    year: user.year || '',
                    semester: user.semester || '',
                    currentGPA: user.currentGPA || '',
                    totalGPA: user.totalGPA || '',
                    familyStatus: user.familyStatus || '',
                    additionalInfo: user.additionalInfo || '',
                });
            }
        };
        fetchData();
    }, [user, fetchUserData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            let updatedFamilyStatus = [...formData.familyStatus];
            if (checked) {
                updatedFamilyStatus.push(value); // 체크된 항목 추가
            } else {
                updatedFamilyStatus = updatedFamilyStatus.filter(status => status !== value); // 체크 해제된 항목 제거
            }
            setFormData({
                ...formData,
                familyStatus: updatedFamilyStatus
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        // 수정된 사용자 정보를 서버에 업데이트
        await updateUser({
            nickname: formData.nickname, // 수정된 닉네임 반영
            region: formData.region,
            district: formData.district,
            incomeBracket: formData.incomeBracket,
            applicantCategory: formData.applicantCategory,
            school: formData.school,
            major: formData.major,
            year: formData.year,
            semester: formData.semester,
            currentGPA: formData.currentGPA,
            totalGPA: formData.totalGPA,
            familyStatus: formData.familyStatus,
            additionalInfo: formData.additionalInfo
        });
        
        navigate("/users/mypage", { state: { infoSubmitted: true } });
    };

    return (
        <>
        <NavBar />
        <Container>
            <Title>{isInfoSubmitted ? "기존 정보 수정" : "신규 정보 입력"}</Title>
            <Space />
            <form onSubmit={handleSubmit}>
            <FormGroup>
                    <label>이름</label>
                    <div className="valueDisplay">{user?.fullname}</div>
                </FormGroup>

                <FormGroup>
                    <label>생년월일</label>
                    <div className="valueDisplay">{user?.dob}</div>
                </FormGroup>

                <FormGroup>
                    <label>이메일</label>
                    <div className="valueDisplay">{user?.email}</div>
                </FormGroup>

                <FormGroup>
                    <label>닉네임</label>
                    <input 
                        type="text" 
                        name="nickname" 
                        value={user?.nickname} 
                        onChange={handleChange} 
                    />
                </FormGroup>

                <FormGroup>
                    <label>거주 지역</label>
                    <select 
                        name="region" 
                        value={formData.region} 
                        onChange={handleChange}>
                        <option value="">지역을 선택하세요</option>
                        <option value="서울">서울</option>
                        <option value="부산">부산</option>
                        {/* Add more options as needed */}
                    </select>

                    <select 
                        name="district" 
                        value={formData.district} 
                        onChange={handleChange}>
                        <option value="">구/군을 선택하세요</option>
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
                        <option value="">소득 분위를 선택하세요</option> 
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
                            <option key={value} value={`${value}분위`}>{value} 분위</option>
                        ))}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>지원 계열</label>
                    <select 
                        name="applicantCategory" 
                        value={formData.applicantCategory} 
                        onChange={handleChange}>
                        <option value="">지원 계열을 선택하세요</option>
                        <option value="인문계">공학계열</option>
                        <option value="인문계">교육계열</option>
                        <option value="인문계">사회계열</option>
                        <option value="인문계">예체능계열</option>
                        <option value="인문계">의약계열</option>
                        <option value="이공계">인문계열</option>
                        <option value="이공계">자연계열</option>
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
                    <button type="button">검색</button>
                </FormGroup>

                <FormGroup>
                    <label>학과/학년</label>
                    <select 
                        name="major" 
                        value={formData.major} 
                        onChange={handleChange}>
                        <option value="">학과 선택</option>
                        <option value="컴퓨터공학과">컴퓨터공학과</option>
                        <option value="인공지능학과">인공지능학과</option>
                    </select>
                    <select 
                        name="year" 
                        value={formData.year} 
                        onChange={handleChange}>
                        <option value="">학년 선택</option> 
                        {Array.from({ length: 6 }, (_, i) => {
                            const year = `${i + 1}학년`;
                            if (year) {
                                return <option key={year} value={year}>{year}</option>;
                            }
                            return null;
                        })}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>수료 학기</label>
                    <select 
                        name="semester" 
                        value={formData.semester} 
                        onChange={handleChange}>
                        <option value="">수료 학기 선택</option>
                        {Array.from({ length: 8 }, (_, i) => {
                        const semester = `${i + 1} 학기`;
                        if (semester) {
                            return <option key={semester} value={semester}>{semester}</option>;
                        }
            return null;
        })}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>성적</label>
                    <input 
                        type="number" 
                        name="currentGPA" 
                        value={formData.currentGPA} 
                        onChange={handleChange} 
                        placeholder="직전 학기 성적"
                        step="0.01"  // 소수점 둘째 자리까지 입력 가능
                        min="0"      // 최소값 0
                        max="4.5"    // 최대값 4.5로 설정
                    />
                    <input 
                        type="number" 
                        name="totalGPA" 
                        value={formData.totalGPA} 
                        onChange={handleChange} 
                        placeholder="전체 성적"
                        step="0.01"  // 소수점 둘째 자리까지 입력 가능
                        min="0"      // 최소값 0
                        max="4.5"    // 최대값 4.5로 설정
                    />
                </FormGroup>

                <NoteContainer>
                    <Note>* 직전 학기 성적과 전체 성적은 4.5 만점을 기준으로 함.</Note>
                </NoteContainer>
                <NoteContainer2>
                    <Note>* 소수점 둘째 자리까지 입력 가능</Note>
                </NoteContainer2>

                <FormGroup>
                    <label>기타</label>
                    <RadioGroup>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="다문화 가정" 
                                checked={formData.familyStatus.includes("다문화 가정")}
                                onChange={handleChange} 
                            />
                            다문화 가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="한부모 가정" 
                                checked={formData.familyStatus.includes("한부모 가정")}
                                onChange={handleChange} 
                            />
                            한부모 가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="기초 생활 수급자" 
                                checked={formData.familyStatus.includes("기초 생활 수급자")}
                                onChange={handleChange} 
                            />
                            기초 생활 수급자
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="국가(독립) 유공자" 
                                checked={formData.familyStatus.includes("국가(독립) 유공자")}
                                onChange={handleChange} 
                            />
                            국가(독립) 유공자
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="다자녀 가정" 
                                checked={formData.familyStatus.includes("다자녀 가정")}
                                onChange={handleChange} 
                            />
                            다자녀 가정
                        </RadioLabel>
                    </RadioGroup>
                </FormGroup>

                <SubmitButton type="submit" disabled={!formValid}>입력 완료</SubmitButton>
            </form>
        </Container>
        </>
    );

};


export default MemInfo;