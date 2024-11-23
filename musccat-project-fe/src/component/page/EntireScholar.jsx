import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../ui/NavBar";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";
import { sharedMarginStyle } from "../ui/sharedStyle";


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
        width: "1200px", // 고정된 가로 크기
        border: "2px solid #348a8c",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "white",
        boxSizing: "border-box",
        ...sharedMarginStyle, // 공통 여백 적용
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
        position: "relative",
        overflow: "hidden", // 직사각형 오른쪽을 잘 보이게 처리
    },
    searchInput: {
        flex: 1,
        padding: "10px 40px 10px 20px", 
        fontSize: "16px",
        border: "3px solid #2f4f5f", 
        borderRadius: "25px 0 0 25px", // 오른쪽을 직사각형으로
        marginLeft: "0", // 버튼이 입력창과 바로 붙도록
    },
    searchButton: {
        padding: "10px 20px",
        backgroundColor: "#2f4f5f",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "10px"
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


function EntireScholar() {
    // 상태 관리
    const { fetchScholarships, 
            handleLikeClick,
            likes, 
            likedScholarships,
            scholarships,
            currentPage,
            setCurrentPage, 
            goToNextPage, 
            goToPreviousPage,
            totalPages,
            stateChanged,
            setStateChanged
        } = useAuth();

    const [search, setSearch] = useState(''); // 단일 검색어 상태
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
            await fetchScholarships(pageNumber, '', '', search);  // 검색어가 있을 경우 검색어 유지
        }
    };

    const handleNextPage = async () => {
        if (currentPage < pageRange.end) {
            goToNextPage(); // 다음 페이지로 이동
            await fetchScholarships(currentPage + 1, '', '', search);  // 검색어 유지
        } else {
            await handleNextRange(); // 페이지 범위가 끝났을 때는 범위 변경
        }
    };

    const handlePreviousPage = async () => {
        if (currentPage > pageRange.start) {
            goToPreviousPage(); // 이전 페이지로 이동
            await fetchScholarships(currentPage - 1, '', '', search);  // 검색어 유지
        } else {
            await handlePreviousRange(); // 페이지 범위가 시작점일 때는 범위 변경
        }
    };

    const handleNextRange = async () => {
        const newStart = pageRange.end + 1;
        const newEnd = Math.min(newStart + 4, totalPages);

        if (newStart <= totalPages) {
            setPageRange({
                start: newStart,
                end: newEnd
            });

            setCurrentPage(newStart);

            await fetchScholarships(newStart);
        }
    };

    const handlePreviousRange = async () => {
        const newEnd = pageRange.start - 1;
        const newStart = Math.max(1, newEnd - 4);

        if (newEnd >= 1) {
            setPageRange({
                start: newStart,
                end: newEnd
            });

            setCurrentPage(newStart); 

            await fetchScholarships(newStart); 
        }
    };



    useEffect(() => {
        setIsLoading(true);  
        fetchScholarships(1, search).finally(() => setIsLoading(false));  
    }, [currentPage]);

    useEffect(() => {
        if (currentPage !== 1) {
            setIsLoading(true);  
            fetchScholarships(currentPage, search).finally(() => setIsLoading(false));  // 페이지 변경 시 해당 페이지의 장학금 목록 가져오기
        }
    }, [currentPage]);
    
    useEffect(() => {
        if (Array.isArray(scholarships)) {
            setFilteredScholarships(scholarships);  // 장학금 데이터가 배열일 때만 설정
        }
    }, [scholarships]);

    useEffect(() => {
        setFilteredScholarships(scholarships);
    }, [stateChanged]);

    useEffect(() => {
        // likedScholarships를 기반으로 scholarships의 isLiked 필드 업데이트
        const updatedScholarships = scholarships.map(scholarship => ({
            ...scholarship,
            isLiked: likedScholarships.some(like => like.product_id === scholarship.product_id),
        }));
        setFilteredScholarships(updatedScholarships); // 필터링된 장학금 목록 업데이트
    }, [likedScholarships, scholarships]); // likedScholarships가 변경될 때 실행

    useEffect(() => {
        if (stateChanged) {
            fetchScholarships(currentPage).finally(() => setStateChanged(false)); // 상태 초기화
        }
    }, [stateChanged, currentPage]); // 상태 변경 감지

    const handleSearchChange = (e) => {
        setSearch(e.target.value);  // 검색어 설정
    };

    // 검색 버튼 클릭 시 검색 수행
    const handleSearchButtonClick = async () => {
        setCurrentPage(1);  // 검색 시 첫 페이지로 이동
        await fetchScholarships(1, '', '', search).finally(() => setIsLoading(false));  // 검색어에 맞는 장학금 목록 가져오기
    };

    // 장학금 유형 선택 시 호출될 함수 추가
    const handleTypeOptionClick = (option) => {
        setTypeOption(option);  // 선택된 유형을 저장
        setTypeDropdownVisible(false);  // 드롭다운 닫기

        setCurrentPage(1);  // 첫 페이지로 이동

        // 선택된 유형을 기준으로 장학금을 다시 가져오는 로직
        fetchScholarships(currentPage, option, sortOption, search);
    };


    const handleSortOptionClick = (option) => {
        setSortOption(option);
        setDropdownVisible(false);

        setCurrentPage(1);  // 첫 페이지로 이동

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
        fetchScholarships(1, typeOption, orderOption, search);

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


    const scholarshipsToDisplay = search.length > 0 ? filteredScholarships : scholarships;

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
                        <input 
                            type="text" 
                            placeholder="장학 사업명 검색" 
                            //placeholder="장학 사업명 또는 장학 재단명 검색"
                            style={styles.searchInput}
                            value={search}
                            onChange={handleSearchChange} 
                        />
                        <button style={styles.searchButton} onClick={handleSearchButtonClick}>
                            검색
                        </button>
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
                                            onClick={() => handleLikeClick(index, scholarship.product_id, likes[index], search)}
                                        >
                                            <img
                                                src={scholarships[index]?.isLiked ? filledheart : emptyheart}
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
                    <span onClick=
                        {handlePreviousRange}>
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
                            <span onClick={handleNextRange}>
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