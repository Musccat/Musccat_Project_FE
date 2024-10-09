import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";
import { useAuth } from '../contexts/AuthContext';

const styles = {
    wrapper: {  
        display: "flex",
        justifyContent: "center",  
        alignItems: "center",  
        minHeight: "100vh",  
        padding: "20px",  
        boxSizing: "border-box"  
    },
    container: {
        margin: "20px",
        fontFamily: "Arial, sans-serif"
    },
    header: {
        fontSize: "2em",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
        textAlign: "center"
    },
    highlight: {
        color: "#348a8c" 
    },
    outerContainer: {
        border: "2px solid #348a8c", 
        borderRadius: "8px", 
        padding: "20px", 
        maxWidth: "1200px", 
        marginTop: "50px",
        backgroundColor: "#white", 
        boxSizing: "border-box",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    tableContainer: {  
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        margin: "20px auto", 
        padding: "0 50px", 
        maxWidth: "1200px", 
    },
    buttonContainer: {  
        position: "relative",  
        display: "flex",  
        justifyContent: "flex-end",  // 오른쪽 정렬
        marginBottom: "20px",
        marginTop: "10px",  
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
const ScholarshipLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        color: #007bff;  /* 파란색으로 변경 */
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


const WarningBox = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px; /* 상단 마진 추가 */
    border: 3px solid #e0e0e0;

    p {
        color: #bfbfbf;
        margin: 0;
    }
`;

const Title = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #bfbfbf;
`;


function RecomScholar(props) {

const { user, scholarships, setScholarships, loadScholarships, fetchUserData, likes, handleLikeClick, authTokens  } = useAuth(); 
const [isLoading, setIsLoading] = useState(true);
const [hasFetchedData, setHasFetchedData] = useState(false); // 데이터가 이미 로드되었는지 확인

    // 사용자 데이터와 장학금 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // 사용자 데이터가 없으면 불러오기
                if (authTokens && !user) {
                    await fetchUserData();
                }

                // 장학금 데이터 불러오기
                const scholarshipsData = await loadScholarships();
                console.log("Scholarships data:", scholarshipsData);
                if (Array.isArray(scholarshipsData)) {
                    setScholarships(scholarshipsData);
                    console.log("Scholarships loaded:", scholarshipsData);
                } else {
                    console.error("Scholarships data is not an array");
                }
                setHasFetchedData(true);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        // authTokens가 존재하고, 데이터가 로드되지 않았으면 fetchData 실행
        if (authTokens && !hasFetchedData) {
            fetchData();
        }
    }, [authTokens, user, fetchUserData, loadScholarships, hasFetchedData]);

    useEffect(() => {
        loadScholarships();  // 컴포넌트가 마운트될 때 장학금 데이터를 불러옴
    }, [loadScholarships]);

    // 로딩 중일 때 보여줄 UI
    if (isLoading) {
        return <div>로딩 중...</div>;
    }


return (
    <>
        <NavBar />
            <div style={styles.wrapper}>
                <div style={styles.container}>
                <div style={styles.outerContainer}>
                    <h1 style={styles.header}><span style={styles.highlight}>{user.fullname}</span> 님의 추천 장학금</h1>

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
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                            로딩 중...
                                        </td>
                                    </tr>
                                ) : scholarships && scholarships.length > 0 ? (
                                    scholarships.map((item, index) => (
                                        <tr key={index}>
                                            <td style={styles.thTd}>{item.scholarship.foundation_name}</td>
                                            <td style={{ ...styles.thTd, paddingRight: "20px" }}>
                                                <ScholarshipLink to={`/notice/${item.scholarship.product_id}`}>
                                                    {item.scholarship.name}
                                                </ScholarshipLink>
                                            </td>
                                            <td style={{ ...styles.thTd, paddingRight: "90px" }}>
                                                ~{item.scholarship.recruitment_end}
                                            </td>
                                            <td style={styles.thTd}>
                                                <div style={styles.flexContainer}>
                                                <Link to={`/reviews/view/${item.scholarship.product_id}`} style={{ textDecoration: 'none' }}>
                                                    <button style={styles.infoButton}>정보 보러가기</button>
                                                </Link>
                                                    <button
                                                        style={styles.heartButton}
                                                        onClick={() => handleLikeClick(index, item.scholarship.product_id || item.product_id)}
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
                        </table>
                    </div>
                </div>
                <WarningBox>
                        <Title> 신청할 때는 각 장학금의 세부적인 기준과 마감일을 다시 한번 확인하시기 바랍니다.</Title>
                    <p>사용자가 확인하지 않아 발생하는 문제에 대해서는 Scholli 측에서 책임을 지지 않으며, 모든 책임은 전적으로 사용자에게 있습니다.</p>
                </WarningBox>
            </div>
        </div>
    </>

    );
}
export default RecomScholar;