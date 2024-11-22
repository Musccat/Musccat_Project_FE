import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../ui/NavBar';
import DefaultProfileImage from '../ui/ProfileImage.jpeg';
import Calendar from "react-calendar"; // 캘린더 라이브러리


const Container = styled.div`
    margin: 20px;
    font-family: Arial, sans-serif;
    margin-top: 60px; /* NavBar와의 간격 추가 */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CalendarContainer = styled.div`
    margin-bottom: 20px;
    max-width: 600px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

    .react-calendar {
    font-family: Arial, sans-serif;
    border: none;
}

.react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.react-calendar__navigation button {
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #4f4f4f;
    cursor: pointer;
}
    .react-calendar__navigation button:hover {
    color: #c4c4c4;
}

.react-calendar__month-view__weekdays {
    display: grid;
    font-size: 14px;
    font-weight: bold;
    color: #888888;
    text-align: center;
    margin-bottom: 10px;
}

.react-calendar__tile {
    text-align: center;
    padding: 0;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: auto; /* 상위 요소 크기에 맞추기 */
    height: auto; /* 상위 요소 크기에 맞추기 */
    margin: 25px 0px;
}

.react-calendar__tile--now {
    color: #348a8c; /* 오늘 날짜의 숫자 색상 */
    font-weight: bold; /* 강조 (선택 사항) */
}

.react-calendar__tile--active {
    background-color: #348a8c; /* 선택된 날짜의 배경색 */
    color: white; /* 선택된 날짜의 숫자 색상 */
    font-weight: bold;
    border-radius: 50%; /* 선택된 날짜만 원형 */
    display: flex;
    align-items: center;
    justify-content: center;
}
    
.react-calendar__tile:hover {
    background-color: #f0f8f8;
    color: #348a8c;
}
.react-calendar__tile--active:hover {
    background-color: #348a8c;
    color: white;
    border-radius: 50%;
}
.event {
    background-color: #2d7374;
    color: white;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 5px;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
}

`;


const Header = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    max-width: 600px;
    width: 100%;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
`;

const ProImage = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

const UserName = styled.h1`
    margin: 5px 0 0 0;
    font-size: 1.5em;
`;

const NormalText = styled.span`
    font-weight: normal;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const UserNickname = styled.p`
    margin: 5px 0 0 0;
`;

const ButtonGroup = styled.div`
    margin-left: auto;
    display: flex;
    gap: 10px;
    margin: 15px 0 0 0;
`;

const Button = styled.button`
    background-color: #348a8c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2d7374;
    }
`;

const Section = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #348a8c;
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
`;

const Separator = styled.hr`
    border: 0;
    height: 1px;
    background: #348a8c;
    margin: 20px 0;
    margin-bottom: 0px;
`;


const Title = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
`;

const InfoList = styled.ul`
    margin-top: 35px;
    list-style-type: none;
    padding: 0;
`;

const InfoItem = styled.li`
    display: grid;
    grid-template-columns: 150px 1fr; /* 간격을 추가
    margin-bottom: 10px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 5px;
`;

const Th = styled.th`
    text-align: left;
    border-bottom: 2px solid #348a8c;
    padding: 10px;
`;

const Td = styled.td`
    text-align: left;
    border-bottom: 1px solid #348a8c;
    padding: 10px;
`;

const Space = styled.div`
    margin-top: 20px;
`;

const MyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {  user, fetchUserData, calendarScholarships, fetchCalendarScholarships } = useAuth();

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthdate, setUserBirthdate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userResidence, setUserResidence] = useState('');
    const [income, setIncome] = useState('');
    const [univCategory, setUnivCategory] = useState('');
    const [university, setUniversity] = useState('');
    const [majorCategory, setMajorCategory] = useState('');
    const [major, setMajor] = useState('');
    const [semester, setSemester] = useState('');
    const [totalGPA, setTotalGPA] = useState('');
    const [etc, setEtc] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); // 캘린더 선택 날짜
    const [isInfoSubmitted, setIsInfoSubmitted] = useState(false);
    

    // 장학 기본 정보는 fetchUserData로 불러옴
    useEffect(() => {
        const initializeUserData = async () => {
            await fetchUserData();    

            if (user) {
                setFullName(user.fullname);
                setUserName(user.username);
                setUserNickname(user.nickname);
                setUserBirthdate(user.birth);
                setUserGender(user.gender);
                setUserEmail(user.email);
            }

        };

        initializeUserData();
    }, [user, fetchUserData]);

     // 추가 정보는 isInfoSubmitted가 true일 때만 updateUser로 불러옴
    useEffect(() => {
        if (user) {
            setFullName(user.fullname);
            setUserName(user.username);
            setUserNickname(user.nickname);
            setUserBirthdate(user.birth);
            setUserGender(user.gender);
            setUserEmail(user.email);

            const residence = user.residence ? user.residence : '';
            setUserResidence(residence);
            setIncome(user.income);
            setUnivCategory(user.univ_category);
            setUniversity(user.university);
            setMajorCategory(user.major_category);
            setMajor(user.major);
            setSemester(user.semester);
            setTotalGPA(user.totalGPA);
            setEtc(user.etc || '');
        }
    }, [user]);

    useEffect(() => {
        fetchCalendarScholarships();
    }, []);

    useEffect(() => {
        const infoSubmitted = localStorage.getItem('isInfoSubmitted') === 'true';
        if (infoSubmitted) {
            setIsInfoSubmitted(true);
        }
    }, []);

    const handleNewInfoClick = () => {
        localStorage.setItem('isInfoSubmitted', true);
        navigate("/users/meminfo", { state: { isInfoSubmitted } });
    };

    // location.state.isUpdated가 true일 때 사용자 정보 다시 가져오기
    useEffect(() => {
        if (location.state?.isUpdated) {
            fetchUserData(); // 사용자 정보 업데이트
        }
    }, [location.state?.isUpdated, fetchUserData]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected date:", date); // 디버깅용
    };

    return (
        <>
            <NavBar />
            <Container>
                <Header>
                    <ProfileContainer>
                        <ProImage src={DefaultProfileImage} alt="Profile" />
                        <UserNickname>{userNickname}</UserNickname>
                </ProfileContainer>
                <UserInfo>
                    <UserName>
                        <BoldText>{fullName}</BoldText>
                        <NormalText> 님의 마이페이지</NormalText>
                        </UserName>
                    <ButtonGroup>
                        <Button onClick={handleNewInfoClick}>
                            {isInfoSubmitted ? '기본 정보 수정' : '신규 정보 입력'}
                        </Button>
                        <Button onClick={() => navigate('/reviews')}>수혜 정보 제출</Button>
                        <Button onClick={() => navigate('/users/myinterest')}>내 관심목록</Button>
                    </ButtonGroup>
                </UserInfo>
                </Header>

                <CalendarContainer>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    locale="en-US"
                    tileContent={({ date }) => {
                        console.log("Tile date:", date.toDateString());
                        const scholarshipsForDate = calendarScholarships.filter((scholarship) => {
                            const scholarshipDate = new Date(scholarship.recruitment_end).toISOString().split("T")[0];
                            const calendarDate = date.toISOString().split("T")[0];
                            return scholarshipDate === calendarDate;
                        });

                        return scholarshipsForDate.length > 0 ? (
                            <div className="event">
                                {scholarshipsForDate.map((scholarship) => (
                                    <span key={scholarship.scholarship_id}>{scholarship.name}</span>
                                ))}
                            </div>
                        ) : null;
                    }}
                />
                </CalendarContainer>

                <Section>
                    <Title>장학 기본 정보</Title>
                    <InfoList>
                        <InfoItem>
                            <span>이름</span>
                            <span>{fullName}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>아이디</span>
                            <span>{userName}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>닉네임</span>
                            <span>{userNickname}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>생년월일</span>
                            <span>{userBirthdate}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>이메일</span>
                            <span>{userEmail}</span>
                            <Space />
                        </InfoItem>
                    </InfoList>
                </Section>
                
            {isInfoSubmitted && (
                <Section>
                    <Title>추가 정보</Title>
                    <InfoList>
                        <InfoItem>
                            <span>성별</span>
                            <span>{userGender}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>거주 지역</span>
                            <span>{userResidence}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>소득 분위</span>
                            <span>{income}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>대학 구분</span>
                            <span>{univCategory}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>대학명</span>
                            <span>{university}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>학과 계열</span>
                            <span>{majorCategory}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>학과</span>
                            <span>{major}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>수료 학기</span>
                            <span>{semester}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>전체 성적</span>
                            <span>{totalGPA}</span>
                            <Space />
                        </InfoItem>
                        <InfoItem>
                            <span>기타</span>
                            <span>{etc}</span>
                            <Space />
                        </InfoItem>
                    </InfoList>
                </Section>
                )}
            </Container>
        </>
    );
};

export default MyPage;