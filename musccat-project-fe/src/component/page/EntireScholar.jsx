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
    triangleLeft: {
        display: "inline-block",
        width: "0",
        height: "0",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderRight: "12px solid #348a8c", // 왼쪽을 향한 삼각형
        cursor: "pointer",
        marginRight: "8px"
    },
    triangleRight: {
        display: "inline-block",
        width: "0",
        height: "0",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderLeft: "12px solid #348a8c", // 오른쪽을 향한 삼각형
        cursor: "pointer",
        marginLeft: "8px"
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
const ScholarshipLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        color: #007bff; 
    }
`;

const SortButtonContainer = styled.div`
    position: relative;
    margin-right: 10px;
`;

const SortButton = styled.button`
    width: 140px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: ${props => props.bgColor || "#348a8c"};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative; 
    z-index: 2;
    text-align: center;
`;

const DropdownItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
`;

const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 4px); 
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    z-index: 3;
    border-radius: 4px;
    overflow-y: auto;
    max-height: 200px;
    width: 120px;
`;

function EntireScholar(props) {
    // 상태 관리
    const { fetchScholarships, 
            likes, 
            setLikes, 
            scholarships,
            filterScholarshipsByType,
            goToNextPage, 
            goToPreviousPage, 
            currentPage, 
            nextPageUrl, 
            previousPageUrl,
            totalPages,
        } = useAuth();

    const [searchTerm, setSearchTerm] = useState(''); // 사용자가 입력한 검색어
    const [suggestions, setSuggestions] = useState([]); // 자동완성 제안 목록
    const [filteredScholarships, setFilteredScholarships] = useState(scholarships); // 필터링된 장학금 목록

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [sortOption, setSortOption] = useState('기한 순');
    const [otherOptions, setOtherOptions] = useState(['가나다 순', '좋아요 순']);

    const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

    const [typeOption, setTypeOption] = useState('장학금 전체');

    useEffect(() => {
        fetchScholarships(currentPage);
    }, [currentPage]);

    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        if (pageNumber !== currentPage) {
            fetchScholarships(pageNumber);
        }
    };

    useEffect(() => {
        if (Array.isArray(scholarships)) {
            setFilteredScholarships(scholarships);  // 장학금 데이터가 배열일 때만 설정
        }
    }, [scholarships]);

    // 필터링 적용
    useEffect(() => {
        const filtered = filterScholarshipsByType(typeOption);
        setFilteredScholarships(filtered);
    }, [scholarships, typeOption, filterScholarshipsByType]);


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        // 검색어가 있는 경우에만 자동완성 제안
        if (value.length > 0) {
            const filteredSuggestions = scholarships
                .map(s => s.foundation_name)
                .filter(name => name.toLowerCase().includes(value.toLowerCase()))
                .filter((name, index, self) => self.indexOf(name) === index); // 중복 제거
    
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };
    


    // 제안 목록에서 항목을 선택했을 때 필터링된 장학금 목록을 설정
    const handleSuggestionClick = (foundationName) => {
        setSearchTerm(foundationName); // 선택된 제안으로 검색창을 업데이트
        setSuggestions([]); // 제안을 숨김
    
        // 선택된 재단명에 해당하는 장학금만 필터링
        const filtered = scholarships.filter(s => s.foundation_name === foundationName);
        setFilteredScholarships(filtered);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleSortOptionClick = (option) => {
        setOtherOptions([sortOption, ...otherOptions.filter(opt => opt !== option)]);
        setSortOption(option);
        setDropdownVisible(false);
    };

    const handleTypeOptionClick = (option) => {
        setTypeOption(option);
        setTypeDropdownVisible(false);
    };

    const handleLikeClick = (index) => {
        const newLikes = [...likes];
        newLikes[index] = !newLikes[index];
        setLikes(newLikes);
    };

    const scholarshipsToDisplay = searchTerm.length > 0 ? filteredScholarships : scholarships;


    return (
        <>
            <NavBar />
            <div style={styles.wrapper}>
            <div style={styles.outerContainer}>
                <div style={styles.searchBarContainer}>
                    <div style={styles.searchBar}>
                        <input type="text" 
                        placeholder="장한 재단명 검색" 
                        style={styles.searchInput}
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        />
                    {suggestions.length > 0 && (
                        <div style={styles.dropdown}>
                            {suggestions.map((suggestion, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => handleSuggestionClick(suggestion)} 
                                    style={{ padding: "10px", cursor: "pointer" }}>
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                </div>
            <div style={styles.buttonContainer}>
                <SortButtonContainer>
                    <SortButton bgColor="#2F6877" onClick={() => setTypeDropdownVisible(!typeDropdownVisible)}>
                            {typeOption} ▼
                        </SortButton>
                        {typeDropdownVisible && (
                            <Dropdown>
                                {['장학금 전체', '지역연고', '성적우수', '소득구분', '특기자', '기타'].map((option, index) => (
                                    <DropdownItem
                                        key={index}
                                        onClick={() => handleTypeOptionClick(option)}
                                    >
                                        {option}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        )}
                </SortButtonContainer>
                <SortButtonContainer>
                    <SortButton onClick={toggleDropdown}>
                        {sortOption} ▼
                    </SortButton>
                    {dropdownVisible && (
                        <Dropdown visible={dropdownVisible}>
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
                    {Array.isArray(scholarshipsToDisplay) && scholarshipsToDisplay.length > 0 ? (
                        scholarshipsToDisplay.map((scholarship, index) => (
                            <tr key={scholarship.product_id}>
                                <td style={styles.thTd}>{scholarship.foundation_name}</td>
                                <td style={{ ...styles.thTd, paddingRight: "20px" }}>
                                    <ScholarshipLink to={`/notice/${scholarship.product_id}`}>{scholarship.name}</ScholarshipLink>
                                </td>
                                <td style={{ ...styles.thTd, paddingRight: "90px" }}>~{scholarship.recruitment_end}</td>
                                <td style={styles.thTd}>
                                    <div style={styles.flexContainer}>
                                        <Link to={`/reviews/${scholarship.product_id}`} style={{ textDecoration: 'none' }}>
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                해당 정보가 존재하지 않습니다
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" style={{ borderBottom: "1px solid #348a8c" }}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* 페이지네이션 */}
                <div style={styles.pagination}>
                    {previousPageUrl && (
                        <span onClick={goToPreviousPage}>
                            <div style={styles.triangleLeft}></div>
                        </span>
                    )}

                    {/* 페이지 번호 표시 */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                backgroundColor: currentPage === index + 1 ? '#348a8c' : '#ccc',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {nextPageUrl && (
                        <span onClick={goToNextPage}>
                            <div style={styles.triangleRight}></div>
                        </span>
                    )}
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default EntireScholar;