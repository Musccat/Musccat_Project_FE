import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../ui/NavBar";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";

const styles = {
    wrapper: {  
        display: "flex",
        justifyContent: "center",  
        alignItems: "center",  
        minHeight: "100vh",  
        padding: "20px",  
        boxSizing: "border-box"  
    },
    outerContainer: {  
        border: "2px solid #348a8c", 
        borderRadius: "8px", 
        padding: "20px", 
        maxWidth: "1200px", 
        marginTop: "50px",
        backgroundColor: "white", 
        boxSizing: "border-box"
    },
    container: {
        margin: "20px",
        fontFamily: "Arial, sans-serif"
    },
    searchBarContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px", 
        marginBottom: "20px",
        zIndex: 1 
    },
    searchBar: {
        marginBottom: "30px",
        display: "flex",
        width: "100%", 
        maxWidth: "600px", 
        position: "relative"
    },
    searchInput: {
        flex: 1,
        padding: "10px 40px 10px 20px", 
        fontSize: "16px",
        border: "3px solid #2f4f5f", 
        borderRadius: "25px" 
    },
    dropdown: {  
        position: "absolute",
        top: "100%", 
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        borderRadius: "4px",
        zIndex: 1000,  
        width: "max-content",
    },
    tableContainer: {  
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        margin: "20px auto", 
        padding: "0 50px", 
        maxWidth: "1200px", 
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
    },
    buttonContainer: {  
        position: "relative",  
        display: "flex",  
        justifyContent: "flex-end",  // 오른쪽 정렬
        marginBottom: "20px",
        marginTop: "10px",  
    }
};

const SortButtonContainer = styled.div`
    position: relative;
`;

const SortButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #348a8c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative; 
    z-index: 2;
`;

const DropdownItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
`;

function EntireScholar(props) {
    // 상태 관리
    const { scholarships, likes, setLikes } = useAuth();
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

    const handleLikeClick = (index) => {
        const newLikes = [...likes];
        newLikes[index] = !newLikes[index];
        setLikes(newLikes);
    };

    return (
        <>
            <NavBar />
            <div style={styles.wrapper}>
            <div style={styles.outerContainer}>
                <div style={styles.searchBarContainer}>
                    <div style={styles.searchBar}>
                        <input type="text" placeholder="검색" style={styles.searchInput} />
                    </div>
                </div>
            <div style={styles.buttonContainer}>
                <SortButtonContainer>
                    <SortButton onClick={toggleDropdown}>
                        {sortOption} ▼
                    </SortButton>
                    {dropdownVisible && (
                        <div style={styles.dropdown}>
                            {otherOptions.map((option, index) => (
                                <DropdownItem
                                    key={index}
                                    onClick={() => handleSortOptionClick(option)}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </div>
                    )}
                </SortButtonContainer>
            </div>
            <div style={styles.container}>
                <div style={styles.tableContainer}>
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
                        <tr key={scholarship.product_id}>
                            <td style={styles.thTd}>{scholarship.foundation_name}</td>
                            <td style={{ ...styles.thTd, paddingRight: "20px" }}>
                                <Link to={`/notice/${scholarship.product_id}`} style={styles.link}>{scholarship.name}</Link>
                            </td>
                            <td style={{ ...styles.thTd, paddingRight: "90px" }}>{scholarship.recruitment_end}</td>
                            <td style={styles.thTd}>
                                <div style={styles.flexContainer}>
                                <Link to={`/benefitinfo/${scholarship.product_id}`} style={{ textDecoration: 'none' }}>
                                    <button style={styles.infoButton}>정보 보러가기</button>
                                </Link>
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
                </div>
                <div style={styles.pagination}>
                    <span style={styles.paginationSpan}>1 2 3 4 5</span>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default EntireScholar;