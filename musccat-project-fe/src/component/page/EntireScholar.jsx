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
        borderRight: "12px solid", // 기본 삼각형 형태
        borderRightColor: "#ccc", // 비활성화된 상태는 회색
        cursor: "not-allowed", // 비활성화 시 커서 처리
        marginRight: "8px",
        background: "none", // 회색 상자 제거
    },
    triangleRight: {
        display: "inline-block",
        width: "0",
        height: "0",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderLeft: "12px solid", // 기본 삼각형 형태
        borderLeftColor: "#ccc", // 비활성화된 상태는 회색
        cursor: "not-allowed", // 비활성화 시 커서 처리
        marginLeft: "8px",
        background: "none", // 회색 상자 제거
    },

    triangleEnabledLeft: {
        borderRightColor: "#348a8c", // 활성화된 상태는 지정된 색상
        cursor: "pointer", // 활성화 시 커서 변경
    },

    triangleEnabledRight: {
        borderLeftColor: "#348a8c", // 활성화된 상태는 지정된 색상
        cursor: "pointer", // 활성화 시 커서 변경
    },

    pagination: {
        marginTop: "20px",
        display: "flex",  // 플렉스 박스 설정
        justifyContent: "center",  // 중앙 정렬
        alignItems: "center",  // 수직 중앙 정렬 (선택 사항)
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

const SortButton1 = styled.button`
    width: 180px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #2F6877;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative; 
    z-index: 2;
    text-align: center;
`;

const SortButton2 = styled.button`
    width: 220px;
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

const Dropdown1 = styled.div`
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
    width: 150px;
`;

const Dropdown2 = styled.div`
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
    width: 180px;
`;

function EntireScholar(props) {
    // 상태 관리
    const { fetchScholarships, 
            handleLikeClick,
            fetchScholarshipsByNameOrFoundation,
            fetchScholarshipsByFoundation,
            likes, 
            scholarships,
            setScholarships,
            filterScholarshipsByType,
            fetchScholarshipsByOrder,
            goToNextPage, 
            goToPreviousPage, 
            currentPage,
            setCurrentPage, 
            nextPageUrl, 
            previousPageUrl,
            totalPages,
        } = useAuth();

    const [searchTerm, setSearchTerm] = useState(''); // 사용자가 입력한 검색어
    const [suggestions, setSuggestions] = useState([]); // 자동완성 제안 목록
    const [filteredScholarships, setFilteredScholarships] = useState(scholarships); // 필터링된 장학금 목록

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [sortOption, setSortOption] = useState('장학금 정렬');
    const [otherOptions, setOtherOptions] = useState(['모집 시작 - 최신순', '모집 시작 - 오래된 순', '모집 종료 - 최신순', '모집 종료 - 오래된 순']);

    const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

    const [typeOption, setTypeOption] = useState('장학금 유형구분');

    const [pageRange, setPageRange] = useState({ start: 1, end: 5 });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentPage > pageRange.end) {
            setPageRange({ start: pageRange.end + 1, end: Math.min(pageRange.end + 5, totalPages) });
        } else if (currentPage < pageRange.start) {
            setPageRange({ start: Math.max(pageRange.start - 5, 1), end: pageRange.start - 1 });
        }
    }, [currentPage, pageRange, totalPages]);

    // 페이지 번호 클릭 핸들러
    const handlePageClick = async (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber); // 먼저 페이지 상태 업데이트
            setScholarships([]); // 페이지 전환 시 기존 데이터를 초기화하여 중복 방지
            await fetchScholarships(pageNumber); // 페이지에 해당하는 데이터를 가져옴
        }
    };

    const handleNextRange = async () => {
        const newStart = pageRange.end + 1;
        if (newStart <= totalPages) {
            // 백엔드에서 새로운 페이지 데이터를 가져옴
            await fetchScholarships(newStart);  // 새로운 페이지로 장학금 데이터 불러오기
            setPageRange({
                start: newStart,
                end: Math.min(newStart + 4, totalPages),
        });
        setCurrentPage(newStart);
    }
    };

    const handlePreviousRange = async () => {
        const newEnd = pageRange.start - 1;
        if (newEnd >= 1) {
            // 백엔드에서 새로운 페이지 데이터를 가져옴
            await fetchScholarships(newEnd);  // 이전 페이지로 장학금 데이터 불러오기
            setPageRange({
                start: Math.max(1, newEnd - 4),
                end: newEnd,
            });
        setCurrentPage(newEnd);
        }
    };


    useEffect(() => {
        // currentPage 변경 시에만 fetchScholarships 호출
        setIsLoading(true);  // 데이터를 가져오기 시작할 때 로딩 상태로 전환
        fetchScholarships(currentPage)  // 데이터를 가져오는 비동기 함수 호출
            .finally(() => setIsLoading(false));  // 데이터 가져오기가 끝나면 로딩 상태 해제ships(currentPage); 
    }, [currentPage]);
    
    useEffect(() => {
        if (Array.isArray(scholarships)) {
            setFilteredScholarships(scholarships);  // 장학금 데이터가 배열일 때만 설정
        }
    }, [scholarships]);

    // 필터링 적용
    useEffect(() => {
        if (typeOption !== '장학금 유형구분' && typeOption !== '') {
            const filtered = filterScholarshipsByType(typeOption);
            setFilteredScholarships(filtered);
        }
    }, [typeOption, filterScholarshipsByType]);

    // 정렬
    useEffect(() => {
        if (sortOption !== '장학금 정렬' && sortOption !== '') {
            fetchScholarshipsByOrder(sortOption);  // 선택된 정렬 옵션에 맞춰 데이터 로드
        }
    }, [sortOption, fetchScholarshipsByOrder]);


    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        if (value.length > 0) {
            try {
                // 장학 사업명과 재단명을 모두 검색
                const { scholarshipsByName, scholarshipsByFoundation } = await fetchScholarshipsByNameOrFoundation(value);
    
                // 자동완성 제안 목록을 장학 사업명과 재단명을 합쳐서 설정
                const scholarshipNames = scholarshipsByName.map(s => s.name);
                const foundationScholarships = scholarshipsByFoundation.map(s => s.name);
    
                setSuggestions([...scholarshipNames, ...foundationScholarships]);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]); // 검색어가 없을 경우 자동완성 목록 숨기기
        }
    };
    


    const handleSuggestionClick = async (suggestion) => {
        setSearchTerm(suggestion); // 선택된 제안으로 검색창을 업데이트
        setSuggestions([]); // 제안을 숨김
    
        // 선택된 장학 재단명에 해당하는 모든 장학금 필터링
        const filteredScholarships = await fetchScholarshipsByFoundation(suggestion);
        setFilteredScholarships(filteredScholarships);
    };

    // 장학금 유형 선택 시 호출될 함수 추가
    const handleTypeOptionClick = (option) => {
        setTypeOption(option);  // 선택된 유형을 저장
        setTypeDropdownVisible(false);  // 드롭다운 닫기
    };


    const handleSortOptionClick = (option) => {
        setSortOption(option);
        setDropdownVisible(false);


    let orderOption = '';
    switch (option) {
        case '모집 종료 - 최신순':
            orderOption = '-recruitment_end';
            break;
        case '모집 종료 - 오래된 순':
            orderOption = 'recruitment_end';
            break;
        case '모집 시작 - 최신순':
            orderOption = '-recruitment_start';
            break;
        case '모집 시작 - 오래된 순':
            orderOption = 'recruitment_start';
            break;
        default:
            orderOption = '';  // 기본값
    }

    // AuthContext에서 정렬 함수 호출
    fetchScholarshipsByOrder(orderOption);

    };

    const handleDropdownToggle = (dropdownType) => {
        if (dropdownType === 'sort') {
            setDropdownVisible(!dropdownVisible);
            setTypeDropdownVisible(false);  // 다른 드롭다운 닫기
        } else if (dropdownType === 'type') {
            setTypeDropdownVisible(!typeDropdownVisible);
            setDropdownVisible(false);  // 다른 드롭다운 닫기
        }
    };

    // 제목처럼 보이는 텍스트를 관리하는 로직 추가
    const renderTypeOptionTitle = () => {
        return typeOption === '장학금 유형구분' ? '장학금 유형구분' : typeOption;
    };

    const renderSortOptionTitle = () => {
        return sortOption === '장학금 정렬' ? '장학금 정렬' : sortOption;
    };


    const scholarshipsToDisplay = searchTerm.length > 0 ? filteredScholarships : scholarships;


    return (
        <>
            <NavBar />
            <div style={styles.wrapper}>
            <div style={styles.outerContainer}>
            {isLoading ? (
                    <div>로딩 중...</div>
                ) : (
                    <>
                <div style={styles.searchBarContainer}>
                    <div style={styles.searchBar}>
                        <input type="text" 
                        placeholder="장한 재단명, 장학 사업명 검색" 
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
                    <SortButton1 onClick={() => handleDropdownToggle('type')}>
                        {renderTypeOptionTitle()} ▼
                        </SortButton1>

                        {typeDropdownVisible && (
                            <Dropdown1>
                                {['지역연고', '성적우수', '소득구분', '특기자', '기타'].map((option, index) => (
                                    <DropdownItem
                                        key={index}
                                        onClick={() => handleTypeOptionClick(option)}
                                    >
                                        {option}
                                    </DropdownItem>
                                ))}
                            </Dropdown1>
                        )} 
                </SortButtonContainer>
                <SortButtonContainer>
                    <SortButton2 onClick={() => handleDropdownToggle('sort')}>
                    {renderSortOptionTitle()} ▼
                    </SortButton2>
                    
                    {dropdownVisible && (
                        <Dropdown2 visible={dropdownVisible}>
                            {otherOptions.map((option, index) => (
                                <DropdownItem
                                    key={index}
                                    onClick={() => handleSortOptionClick(option)}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </Dropdown2>
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
                                        <Link to={`/reviews/view/${scholarship.product_id}`} style={{ textDecoration: 'none' }}>
                                            <button style={styles.infoButton}>정보 보러가기</button>
                                        </Link>
                                        <button
                                            style={styles.heartButton}
                                            onClick={() => handleLikeClick(index, scholarship.product_id)}
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
                 {/* 이전 페이지 화살표 */}
                {pageRange.start > 1 ? (
                    <span onClick={() => {
                        handlePreviousRange();
                    }}>
                        <div style={{ ...styles.triangleLeft, ...styles.triangleEnabledLeft }}></div>
                    </span>
                ) : (
                    <span>
                        <div style={styles.triangleLeft}></div>
                    </span>
                )}


                    {/* 페이지 번호 표시 */}
                    {totalPages <= 5 ? (
                        // 페이지가 5개 이하일 때
                        Array.from({ length: totalPages }, (_, index) => (
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
                        ))
                    ) : (
                        Array.from({ length: Math.min(5, totalPages - pageRange.start + 1) }, (_, index) => (
                            <button
                                key={index}
                                style={{
                                    margin: '0 5px',
                                    padding: '5px 10px',
                                    backgroundColor: currentPage === pageRange.start + index ? '#348a8c' : '#ccc',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handlePageClick(pageRange.start + index)}
                            >
                                {pageRange.start + index}
                            </button>
                        ))
                    )}

                    {currentPage < totalPages ? (
                            <span onClick={() => {
                                // 범위 끝에 도달했을 때만 다음 범위로 이동
                                handleNextRange(); 
                            }}>
                                <div style={{ ...styles.triangleRight, ...styles.triangleEnabledRight }}></div>
                            </span>
                        ) : (
                            <span>
                                <div style={styles.triangleRight}></div>
                            </span>
                        )}
                    </div>  

                    </div>
                    </>
                )}
                </div>
        </div>
        </>
        );
 }


export default EntireScholar;