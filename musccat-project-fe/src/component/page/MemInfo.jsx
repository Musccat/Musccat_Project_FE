import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from "../ui/NavBar";
import { useAuth } from "../contexts/AuthContext"; 
import Select from 'react-select';

const Container = styled.div`
    max-width: 800px;
    margin: 50px auto; 
    padding: 20px;
    border: 1px solid #348a8c;
    border-radius: 8px;
    background-color: #white;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const NoticeText = styled.p`
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
    margin-right: 10px;
    text-align: right;
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
        display: flex;
        align-items: center;
        margin-left: 40px;
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
const StyledSelect = styled(Select)`
    flex: 1;
`;

const RadioGroupWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const RadioGroupLabel = styled.label`
    flex: 0 0 150px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-left: 40px;
`;

const RadioGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    align-items: center;
    margin-left: 0px;
    & label {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }

    & input {
        margin-right: 10px;
    }
`;
const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    font-size: 0.9em; /* 글꼴 크기 조정 */
    font-weight: bold;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    margin-left: 190px;
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

const LinkContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 200px;
`;

const StyledLink = styled.a`
    font-size: 0.8em;
    color: #348a8c;
    text-decoration: underline;
`;

const Space = styled.div`
    height: 20px; /* 여백 크기 설정 */
`;

const RequiredIndicator = styled.span`
    color: red;
    margin-left: 4px;
`;


const MemInfo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const isInfoSubmitted = state?.isInfoSubmitted || false;
    const { user, fetchUserData, updateUser } = useAuth();
    const [formValid, setFormValid] = useState(false);

    const [formData, setFormData] = useState({
        fullname: user?.fullname || '',
        username: user?.username || '',
        birth: `${user?.birthYear}-${user?.birthMonth}-${user?.birthDay}` || '',
        age: user?.age || '',
        email: user?.email || '',
        nickname: user?.nickname || '',
        gender: '',
        region: '',
        district: '',
        income: '',
        univ_category: '',
        university: '',
        major_category: '',
        major: '',
        semester: '',
        totalGPA: '',
        familyStatus: '',
        additionalInfo: ''
    });

    useEffect(() => {
        const isFormValid = () => {
            const requiredFields = [
                'nickname','gender', 'region', 'district', 'income', 'univ_category', 'university', 'major_category', 'major', 'semester', 'totalGPA'
            ];
    
            
            return requiredFields.every(field => {
                // 값이 공백인지 확인
                if (typeof formData[field] === 'string') {
                    return formData[field]?.trim() !== '';
                }
                // familyStatus 배열 형식의 필드 처리
                if (Array.isArray(formData[field])) {
                    return formData[field].length > 0;
                }
                return formData[field] !== undefined && formData[field] !== null;
            });
        };
    
        const valid = isFormValid();
        console.log('formValid:', valid);  // 유효성 검사 결과를 로그로 출력
        setFormValid(valid);
    }, [formData]);
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();  // 사용자 데이터를 가져오는 비동기 함수 호출
            if (user) {
                const [region, district] = user.residence ? user.residence.split(' ') : ['', ''];
                setFormData((prevData) => ({
                    ...prevData,
                    fullname: user.fullname,
                    username: user.username,
                    birth: user.birth,
                    email: user.email,
                    age: user.age,
                    nickname: prevData.nickname !== '' ? prevData.nickname : user.nickname || '', 
                    gender: user.gender || '',
                    region: region || '',
                    district: district || '',
                    income: user.income || '',
                    univ_category: user.univ_category || '',
                    university: user.university || '',
                    major_category: user.major_category || '',
                    major: user.major || '',
                    semester: user.semester || '',
                    totalGPA: user.totalGPA || '',
                    familyStatus: user.familyStatus || '',
                    additionalInfo: user.additionalInfo || '',
                }));
            }
        };
        fetchData();
    }, [user, fetchUserData]);

    const handleChange = (e) => {
        if (e && e.value !== undefined) {
        const { name } = e;
        setFormData((prevData) =>({
            ...prevData,
            [name]: e.value,
        }));
    } else {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prevData) => {
                let updatedFamilyStatus = [...prevData.familyStatus];
                if (checked) {
                    updatedFamilyStatus.push(value); // Add checked item
                } else {
                    updatedFamilyStatus = updatedFamilyStatus.filter(
                        (status) => status !== value
                    ); // Remove unchecked item
                }
                return {
                    ...prevData,
                    familyStatus: updatedFamilyStatus, // Update familyStatus array
                };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value, // Update other form fields
            }));
        }
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // residence로 region과 district 합치기
        const residence = `${formData.region} ${formData.district}`;

        // 필수 항목이 비어있지 않은지 확인
        const requiredFields = [
            'nickname','gender', 'region', 'district', 'income', 'univ_category','university', 'major_category', 'major', 'semester', 'totalGPA'];
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                alert(`필수 항목 ${field}를(을) 입력하세요.`);
                return;
            }
        }

        // familyStatus 배열을 쉼표로 구분된 문자열로 변환
        const familyStatusStr = formData.familyStatus.join(', ');

        // etc 변수에 familyStatus와 additionalInfo를 하나의 문자열로 합치기
        const etc = `${familyStatusStr}(${formData.familyStatus.length > 0 ? 'familyStatus값' : ''}), ${formData.additionalInfo}(additionalInfo값)`;


        // 수정된 사용자 정보를 서버에 업데이트
        await updateUser({
            gender: formData.gender,
            nickname: formData.nickname, // 수정된 닉네임 반영
            residence,
            income: formData.income,
            univ_category: formData.univ_category,
            university: formData.university,
            major_category: formData.major_category,
            major: formData.major,
            semester: formData.semester,
            totalGPA: formData.totalGPA,
            etc
        });
        
        navigate("/users/mypage", { state: { isInfoSubmitted: true } });
    };

    const handleTotalGPAChange = (e) => {
        let value = e.target.value;
    
        // 음수값 또는 4.5 이상일 경우 값을 빈 값으로 설정
        if (value < 0 || value > 4.5) {
            value = "";  // Clear the value
        } else {
            // 소수점 둘째 자리까지만 유지
            if (value.includes('.')) {
                const [integerPart, decimalPart] = value.split('.');
                if (decimalPart.length > 2) {
                    value = `${integerPart}.${decimalPart.substring(0, 2)}`;
                }
            }
        }
        setFormData({
            ...formData,
            totalGPA: value,
        });
    };

    const incomeOptions = Array.from({length: 10}, (_, i) => ({ 
        value: `${i + 1}`, 
        label: `${i + 1}분위` 
    }));

    const semesterCategoryOptions = [
        { value: '대학신입생', label: '대학신입생' },
        ...Array.from({ length: 7 }, (_, i) => ({ value: `대학${i + 2}학기`, label: `대학${i + 2}학기` })),
        { value: '대학8학기이상', label: '대학8학기이상' }
    ];

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

    // 데모용 대학명
    const universityOptions = [
        { value: '서울대학교', label: '서울대학교' },
        { value: '연세대학교', label: '연세대학교' },
        { value: '고려대학교', label: '고려대학교' },
        { value: '이화여자대학교', label: '이화여자대학교' },
        { value: '서강대학교', label: '서강대학교' },
        { value: '성균관대학교', label: '성균관대학교' },
        { value: '한양대학교', label: '한양대학교' },
        { value: '중앙대학교', label: '중앙대학교' },
        { value: '경희대학교', label: '경희대학교' },
        { value: '한국외국어대학교', label: '한국외국어대학교' },
        { value: '서울시립대학교', label: '서울시립대학교' },
        
    ];

    //데모용 학과명
    const majorOptions = [
        { value: '경영학과', label: '경영학과' },
        { value: '경제학과', label: '경제학과' },
        { value: '국어교육학과', label: '국어교육학과' },
        { value: '수학교육학과', label: '수학교육학과' },
        { value: '사회학과', label: '사회학과' },
        { value: '심리학과', label: '심리학과' },
        { value: '수학과', label: '수학과' },
        { value: '물리학과', label: '물리학과' },
        { value: '화학과', label: '화학과' },
        { value: '기계공학과', label: '기계공학과' },
        { value: '컴퓨터공학과', label: '컴퓨터공학과' },
        { value: '의학과', label: '의학과' },
        { value: '수의학과', label: '수의학과' },
        { value: '서양화과', label: '서양화과' },
        { value: '동양화과', label: '동양화과' },

    ];

    return (
        <>
        <NavBar />
        <Container>
            <Title>{isInfoSubmitted ? "기존 정보 수정" : "신규 정보 입력"}</Title>
            <NoticeText>* 표시 항목은 필수 항목입니다.</NoticeText>
            <Space />
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <label>이름</label>
                    <div className="valueDisplay">{user?.fullname}</div>
                </FormGroup>

                <FormGroup>
                    <label>아이디</label>
                    <div className="valueDisplay">{user?.username}</div>
                </FormGroup>

                <FormGroup>
                    <label>생년월일</label>
                    <div className="valueDisplay">{user?.birth}</div>
                </FormGroup>

                <FormGroup>
                    <label>나이</label>
                    <div className="valueDisplay">{user?.age}</div>
                </FormGroup>

                <FormGroup>
                    <label>이메일</label>
                    <div className="valueDisplay">{user?.email}</div>
                </FormGroup>
                <Space />
                <Space />

                <RadioGroupWrapper>
                    <RadioGroupLabel>성별<RequiredIndicator>*</RequiredIndicator></RadioGroupLabel>
                    <RadioGroup>
                        <RadioLabel>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="남성" 
                                checked={formData.gender === "남성"} 
                                onChange={handleChange} 
                            />
                            남성
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="여성" 
                                checked={formData.gender === "여성"} 
                                onChange={handleChange} 
                            />
                            여성
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="선택안함" 
                                checked={formData.gender === "선택안함"} 
                                onChange={handleChange} 
                            />
                            선택안함
                        </RadioLabel>
                    </RadioGroup>
                </RadioGroupWrapper>

                
                <FormGroup>
                    <label>닉네임<RequiredIndicator>*</RequiredIndicator></label>
                    <input 
                        type="text" 
                        name="nickname" 
                        value={formData.nickname} 
                        onChange={handleChange} 
                    />
                </FormGroup>

                <FormGroup>
                    <label>거주 지역<RequiredIndicator>*</RequiredIndicator></label>
                    <select 
                        name="region" 
                        value={formData.region} 
                        onChange={handleChange}>
                        <option value="">지역을 선택하세요</option>
                        <option value="서울">서울특별시</option>
                        <option value="부산광역시">부산광역시</option>
                        <option value="대구광역시">대구광역시</option>
                        <option value="인천광역시">인천광역시</option>
                        <option value="광주광역시">광주광역시</option>
                        <option value="대전광역시">대전광역시</option>
                        {/* Add more options as needed */}
                    </select>

                    <select 
                        name="district" 
                        value={formData.district} 
                        onChange={handleChange}>
                        <option value="">구/군을 선택하세요</option>
                        <option value="강남구">강남구</option>
                        <option value="강동구">강동구</option>
                        <option value="강북구">강북구</option>
                        <option value="강서구">강서구</option>
                        <option value="관악구">관악구</option>
                        <option value="광진구">광진구</option>
                        <option value="구로구">구로구</option>
                        <option value="금천구">금천구</option>
                        <option value="노원구">노원구</option>
                        {/* Add more options as needed */}
                    </select>
                </FormGroup>

                <FormGroup>
                    <label>소득 분위<RequiredIndicator>*</RequiredIndicator></label>
                    <StyledSelect
                        name="income"
                        value={incomeOptions.find(option => option.value === formData.income) || null}
                        onChange={(option) => handleChange({ name: "income", value: option.value })}
                        options={incomeOptions}
                        placeholder="소득 분위 선택"
                    />
                </FormGroup>

                <LinkContainer>
                    <StyledLink href="https://portal.kosaf.go.kr/CO/jspAction.do?forwardOnlyFlag=Y&forwardPage=pt/sm/custdsgn/PTSMIncpSmltMngt_01P&ignoreSession=Y" target="_blank" rel="noopener noreferrer">
                        소득 분위 정보 확인
                    </StyledLink>
                </LinkContainer>
                
                <FormGroup>
                    <label>대학 유형<RequiredIndicator>*</RequiredIndicator></label>
                    <StyledSelect
                        name="univ_category" 
                        value={univCategoryOptions.find(option => option.value === formData.univ_category) || ''}
                        onChange={(option) => handleChange({ name: "univ_category", value: option.value })}
                        options={univCategoryOptions}
                        placeholder="대학 유형 선택"
                    />
                </FormGroup>

                <FormGroup>
                    <label>대학명<RequiredIndicator>*</RequiredIndicator></label>
                    <StyledSelect
                        name="university" 
                        value={universityOptions.find(option => option.value === formData.university) || ''}
                        onChange={(option) => handleChange({ name: "university", value: option.value })}
                        options={universityOptions}
                        placeholder="대학명 선택"
                    />
                </FormGroup>

                <FormGroup>
                    <label>학과 계열<RequiredIndicator>*</RequiredIndicator></label>
                    <StyledSelect
                        name="major_category" 
                        value={majorCategoryOptions.find(option => option.value === formData.major_category) || ''}
                        onChange={(option) => handleChange({ name: "major_category", value: option.value })}
                        options={majorCategoryOptions}
                        placeholder="학과 계열 선택"
                    />
                </FormGroup>

                <FormGroup>
                    <label>학과명<RequiredIndicator>*</RequiredIndicator></label>
                    <StyledSelect
                        name="major" 
                        value={majorOptions.find(option => option.value === formData.major) || ''}
                        onChange={(option) => handleChange({ name: "major", value: option.value })}
                        options={majorOptions}  
                        placeholder="학과명 선택"
                    />
                </FormGroup>

                <FormGroup>
                    <label>수료 학기<RequiredIndicator>*</RequiredIndicator></label>
                    <StyledSelect
                            name="semester"
                            value={formData.semester ?{ label: formData.semester, value: formData.semester } : null}
                            onChange={(option) => setFormData({ ...formData, semester: option?.value || '' })}
                            options={semesterCategoryOptions}
                            placeholder="수료 학기 선택"
                    />
                </FormGroup>

                <FormGroup>
                    <label>전체 성적<RequiredIndicator>*</RequiredIndicator></label>
                    <input 
                        type="number" 
                        name="totalGPA" 
                        value={formData.totalGPA} 
                        onChange={handleTotalGPAChange} 
                        placeholder="전체 성적"
                    />
                </FormGroup>

                <NoteContainer>
                    <Note>* 전체 성적은 4.5 만점을 기준으로 함.</Note>
                </NoteContainer>
                <NoteContainer2>
                    <Note>* 소수점 둘째 자리까지 입력 가능</Note>
                </NoteContainer2>
                <Space />

                <RadioGroupWrapper>
                    <RadioGroupLabel>기타</RadioGroupLabel>
                    <RadioGroup>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="차상위계층" 
                                checked={formData.familyStatus.includes("차상위계층")}
                                onChange={handleChange} 
                            />
                            차상위계층
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="다문화가정" 
                                checked={formData.familyStatus.includes("다문화가정")}
                                onChange={handleChange} 
                            />
                            다문화가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="장애인가정" 
                                checked={formData.familyStatus.includes("장애인가정")}
                                onChange={handleChange} 
                            />
                            장애인가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="농어촌자녀" 
                                checked={formData.familyStatus.includes("농어촌자녀")}
                                onChange={handleChange} 
                            />
                            농어촌자녀
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="보훈대상자" 
                                checked={formData.familyStatus.includes("보훈대상자")}
                                onChange={handleChange} 
                            />
                            보훈대상자
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="조부모가정" 
                                checked={formData.familyStatus.includes("조부모가정")}
                                onChange={handleChange} 
                            />
                            조부모가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="다자녀가정" 
                                checked={formData.familyStatus.includes("다자녀가정")}
                                onChange={handleChange} 
                            />
                            다자녀가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="한부모가정" 
                                checked={formData.familyStatus.includes("한부모가정")}
                                onChange={handleChange} 
                            />
                            한부모가정
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="기초생활수급자" 
                                checked={formData.familyStatus.includes("기초생활수급자")}
                                onChange={handleChange} 
                            />
                            기초생활수급자
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="checkbox" 
                                name="familyStatus" 
                                value="새터민가정(탈북이주민)" 
                                checked={formData.familyStatus.includes("새터민가정(탈북이주민)")}
                                onChange={handleChange} 
                            />
                            새터민가정(탈북이주민)
                        </RadioLabel>
                        </RadioGroup>
                    </RadioGroupWrapper>

                    <FormGroup>
                        <TextArea 
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            placeholder="부모 직업, 연구/프로젝트/대회 성과, 종교, 봉사 시간, 자격증, 진로 및 관심분야 등을 자세히 작성할 수록 정확도가 올라갑니다!"
                        />
                    </FormGroup>

                <SubmitButton type="submit" disabled={!formValid}>입력 완료</SubmitButton>
            </form>
        </Container>
        </>
    );

};


export default MemInfo;