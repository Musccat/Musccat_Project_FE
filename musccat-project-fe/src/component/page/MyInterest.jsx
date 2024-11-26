import React, { useEffect,useState } from 'react';
import NavBar from '../ui/NavBar';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import filledheart from "../ui/filledheart.jpeg";
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';

const styles = {
    wrapper: {  
        display: "flex",
        justifyContent: "flex-start",  
        alignItems: "center",   
        padding: "0",  
        boxSizing: "border-box",  
        height: "100vh", 
        flexDirection: "column",
        marginTop: "70px"
    },

    heading: {
        maxWidth: "900px",
        width: "100%",
        margin: "0 auto",
        textAlign: "left",
        fontSize: "2em",
        fontWeight: "bold",
        color: "black",
        marginBottom: "20px",  
        marginTop: "0px",
        paddingLeft: "70px", 
    },
    mainContainer: { 
        maxWidth: "880px",  
        width: "100%",  
        margin: "0 auto",  
        padding: "20px",  // 상하단 여백만 추가
        border: "2px solid #348a8c",  // 외곽선 추가
        borderRadius: "8px", 
        backgroundColor: "white", 
        boxSizing: "border-box",
    },
    centerContainer: {  // 새로운 컨테이너 추가
        display: "flex",
        justifyContent: "center",  // 가로 중앙 정렬
        alignItems: "center",  // 세로 중앙 정렬 (필요 시 제거 가능)
        width: "100%",  
        height: "100%",  // 테이블이 세로로 중앙에 오도록 높이 설정
    },
    tableContainer: {  
        display: "block", 
        margin: "0 auto", 
        padding: "0 20px", 
        width: "100%",
        maxWidth: "900px" 
    },
    table: {
        width: "100%",
        maxWidth: "1000px",
        borderCollapse: "collapse",
        margin: "0 auto"
    },
    thTd: {
        borderTop: "1px solid #348a8c",
        borderBottom: "1px solid #ddd",
        padding: "12px",  
        textAlign: "left",  
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
    }
};

const ScholarshipLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        color: #007bff; 
    }
`;

const MyInterest = () => {
    const { setScholarships,fetchLikedScholarships,likedScholarships, setLikedScholarships, authTokens, setStateChanged, stateChanged, user } = useAuth();
    const navigate = useNavigate();
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [localLikes, setLocalLikes] = useState([]);

    useEffect(() => {
        const initializeLikedScholarships = async () => {
            if (!authTokens || !authTokens.access) {
                console.warn("Auth tokens are not available. Skipping liked scholarships initialization.");
                return;
            }

            try {
                const storedLikedScholarships = JSON.parse(localStorage.getItem("likedScholarships"));
    
                if (storedLikedScholarships && storedLikedScholarships.length > 0) {
                    console.log("Loaded from localStorage:", storedLikedScholarships);
                    setLikedScholarships(storedLikedScholarships);
                } else if (authTokens && authTokens.access) {
                    console.log("Fetching liked scholarships from server...");
                    await fetchLikedScholarships();
                }
            } catch (error) {
                console.error("Error initializing liked scholarships:", error);
            }
        };

        initializeLikedScholarships();
    }, [authTokens]);


    useEffect(() => {
        if (likedScholarships && likedScholarships.length > 0) {
            setFilteredScholarships(likedScholarships);
            localStorage.setItem('likedScholarships', JSON.stringify(likedScholarships));
        }
    }, [likedScholarships]);

    const handleUnlike = async (scholarshipId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/userinfo/wishlist/delete/${scholarshipId}/`, {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });

            // 상태 업데이트
            setLikedScholarships((prev) =>
                prev.filter((scholarship) => scholarship.product_id !== scholarshipId)
            );

            setFilteredScholarships((prev) =>
                prev.filter((scholarship) => scholarship.product_id !== scholarshipId)
            );
        } catch (error) {
            console.error("Error in handleUnlike:", error.response || error.message);
            alert("서버와의 통신 중 문제가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    useEffect(() => {
        console.log("Auth tokens on MyInterest mount:", authTokens);
        console.log("Liked scholarships on mount:", likedScholarships);
    }, [authTokens, likedScholarships]);

    return (
        <>
        <NavBar />
            <div style={styles.wrapper}>
            <h1 style={styles.heading}>내 관심목록</h1>
            <div style={styles.mainContainer}>
                <div style={styles.centerContainer}>
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
                        {filteredScholarships.length > 0 ? (
                            filteredScholarships.map((scholarship, index) => (
                                <tr key={scholarship.product_id}>
                                    <td style={styles.thTd}>{scholarship.foundation_name}</td>
                                    <td style={{ ...styles.thTd, paddingRight: "20px" }}>
                                        <ScholarshipLink to={`/notice/${scholarship.product_id}`}>{scholarship.name}</ScholarshipLink>
                                    </td>
                                    <td style={{ ...styles.thTd, paddingRight: "90px" }}>~{scholarship.recruitment_end}</td>
                                    <td style={styles.thTd}>
                                        <div style={styles.flexContainer}>
                                            <Link to={`/reviews/view/${scholarship.product_id}`} style={{ textDecoration: "none" }}>
                                                <button style={styles.infoButton}>정보 보러가기</button>
                                            </Link>
                                            <button
                                                style={styles.heartButton}
                                                onClick={() => handleUnlike(scholarship.product_id)}
                                            >
                                                <img
                                                        src={filledheart}
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
                                    찜한 장학금이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default MyInterest;