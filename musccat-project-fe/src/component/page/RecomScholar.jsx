import React, { useState } from "react";
import NavBar from "../ui/NavBar";
import scholarships from "../data";
import styled from 'styled-components';
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";
import LightBulb from '../ui/LightBulb.jpeg';

const styles = {
    container: {
        margin: "20px",
        fontFamily: "Arial, sans-serif"
    },
    header: {
        fontSize: "2em",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333"
    },
    highlight: {
        color: "#348a8c" 
    },
    table: {
        marginTop: "50px",
        width: "100%",
        borderCollapse: "collapse"
    },
    thTd: {
        borderTop: "1px solid #348a8c",
        borderBottom: "1px solid #ddd",
        borderLeft: "0",
        borderRight: "0",
        textAlign: "left",
        padding: "12px",

    },
    th: {
        fontWeight: "bold",
        borderTop: "0"
    },
    firstThTd: {
        borderBottom: "2px solid #348a8c", 
        textAlign: "left",
        padding: "12px"
    },
    infoButton: {
        backgroundColor: "#348a8c",
        color: "white",
        border: "none",
        padding: "8px 16px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "14px",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: "4px"
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between" 
    },
    heartButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        marginLeft: "60px"

    },
    heartImage: {
        width: "20px",
        height: "20px"
    },
    pagination: {
        marginTop: "20px",
        textAlign: "center"
    },
    paginationSpan: {
        cursor: "pointer",
        padding: "8px 16px",
        textDecoration: "none",
        color: "#348a8c"
    },
    paginationSpanHover: {
        textDecoration: "underline"
    }
};

const SortButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #348a8c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative; // For dropdown positioning
    z-index: 2;
`;

const DropdownContainer = styled.div`
    position: absolute;
    top: 160px; // 네비게이션으로부터 아래 위치
    right: 100px; // 오른쪽 여백
    z-index: 1000; // ensure it appears above other elements
`;

const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 4px); // 버튼 바로 아래에 위치하도록 설정
    left: 50%;
    transform: translateX(-50%); // 중앙 정렬
    background-color: white;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    z-index: 3;
    border-radius: 4px;
    overflow-y: auto;
    max-height: 200px;
    width: max-content;
`;

const DropdownItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
`;

const WarningBox = styled.div`
    background-color: #e0e0e0 ;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px; /* 상단 마진 추가 */
`;

const Title = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
`;

const TitleWithIcon = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Icon2 = styled.img`
    margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
    width: 15px; 
    height: 20px; 
`;




function RecomScholar(props) {
// 상태 관리
const [likes, setLikes] = useState(Array(scholarships.length).fill(false));

const [dropdownVisible, setDropdownVisible] = useState(false);

const [sortOption, setSortOption] = useState('기한 순');
const [otherOptions, setOtherOptions] = useState(['가나다 순', '좋아요 순']);

const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
};

const handleSortOptionClick = (option) => {
    setOtherOptions([sortOption, ...otherOptions.filter(opt => opt !== option)]);
    setSortOption(option);
    setDropdownVisible(false);
};

// 좋아요 버튼 클릭 핸들러
const handleLikeClick = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);

};

return (
    <>
        <NavBar/>
        <div style={styles.container}>
        <h1 style={styles.header}><span style={styles.highlight}>김키티 </span>님의 추천장학금</h1>
        <DropdownContainer>
                <SortButton onClick={toggleDropdown}>
                    {sortOption} ▼
                </SortButton>
                {dropdownVisible && (
                    <Dropdown>
                        {otherOptions.map((option, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => handleSortOptionClick(option)}
                            >
                                {option}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                )}
            </DropdownContainer>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={{ ...styles.firstThTd, ...styles.th }}>장학 재단명</th>
                        <th style={{ ...styles.firstThTd, ...styles.th }}>장학 사업명</th>
                        <th style={{ ...styles.firstThTd, ...styles.th }}>기한</th>
                        <th style={{ ...styles.firstThTd, ...styles.th}}>이전 수혜자 정보</th>
                    </tr>
                </thead>
                <tbody>
                {scholarships.map((scholarship, index) => (
                        <tr key={index}>
                            <td style={styles.thTd}>{scholarship.scholarname}</td>
                            <td style={{ ... styles.thTd, paddingRight: "20px"}}>{scholarship.businessname}</td>
                            <td style={{ ...styles.thTd, paddingRight: "90px" }}>{scholarship.period}</td>
                            <td style={styles.thTd}>
                            <div style={styles.flexContainer}>
                                <button style={styles.infoButton}>정보 보러가기</button>
                                <button
                                    style={styles.heartButton}
                                    onClick={() => handleLikeClick(index)}
                                >
                                    <img
                                            src={likes[index] ? filledheart : emptyheart}
                                            alt="heart"
                                            style={styles.heartImage}
                                        />
                                </button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" style={{borderBottom: "1px solid #348a8c"}}></td>
                    </tr>
                </tfoot>
            </table>
            <WarningBox>
                <TitleWithIcon>
                    <Icon2 src={LightBulb} alt="LightBulb Icon" />
                    <Title> 신청할 때는 각 장학금의 세부적인 기준과 마감일을 다시 한번 확인하시기 바랍니다.</Title>
                </TitleWithIcon>
                <p>사용자가 확인하지 않아 발생하는 문제에 대해서는 Scholli 측에서 책임을 지지 않으며, 모든 책임은 전적으로 사용자에게 있습니다.</p>
            </WarningBox>
            <div style={styles.pagination}>
                <span style={styles.paginationSpan}>1 2 3 4 5</span>
            </div>
    </>
);


}
export default RecomScholar;