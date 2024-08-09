import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../ui/NavBar";
import scholarships from "../data";
import styled from "styled-components";
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";

const styles = {
    container: {
        margin: "20px",
        fontFamily: "Arial, sans-serif"
    },
    searchBarContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        position: "relative", // 상대 위치를 기준으로 설정
        zIndex: 1 // 드롭다운 메뉴와 겹치지 않도록 설정
    },
    searchBar: {
        marginBottom: "30px",
        display: "flex",
        width: "100%", // Set to 100% for better alignment
        maxWidth: "600px", // Limit the maximum width
        position: "relative"
    },
    searchInput: {
        flex: 1,
        padding: "10px 40px 10px 20px", // 왼쪽과 오른쪽 여백 추가
        fontSize: "16px",
        border: "3px solid #2f4f5f", // 검색창 테두리 색상
        borderRadius: "25px" // 검색창 모서리 둥글게
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    thTd: {
        borderTop: "1px solid #348a8c",
        borderBottom: "1px solid #ddd",
        borderLeft: "0",
        borderRight: "0",
        textAlign: "left",
        padding: "12px"
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
    },
    link: {
        textDecoration: "none",
        color: "#000",
        cursor: "pointer"
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

function EntireScholar(props) {
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
            <NavBar />
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
            <div style={styles.container}>
                <div style={styles.searchBarContainer}>
                    <div style={styles.searchBar}>
                        <input type="text" placeholder="검색" style={styles.searchInput} />
                    </div>
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.firstThTd, ...styles.th }}>장학 재단명</th>
                            <th style={{ ...styles.firstThTd, ...styles.th }}>장학 사업명</th>
                            <th style={{ ...styles.firstThTd, ...styles.th }}>기한</th>
                            <th style={{ ...styles.firstThTd, ...styles.th }}>이전 수혜자 정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((scholarship, index) => (
                            <tr key={index}>
                                <td style={styles.thTd}>{scholarship.scholarname}</td>
                                <td style={{ ...styles.thTd, paddingRight: "20px" }}>
                                    <Link to="/notice" style={styles.link}>{scholarship.businessname}</Link>
                                </td>
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
                            <td colSpan="4" style={{ borderBottom: "1px solid #348a8c" }}></td>
                        </tr>
                    </tfoot>
                </table>
                <div style={styles.pagination}>
                    <span style={styles.paginationSpan}>1 2 3 4 5</span>
                </div>
            </div>
        </>
    );
}

export default EntireScholar;