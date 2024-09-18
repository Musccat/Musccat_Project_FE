import React, { useState } from 'react';
import NavBar from '../ui/NavBar';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import emptyheart from "../ui/emptyheart.jpeg";
import filledheart from "../ui/filledheart.jpeg";
import scholarships from '../data/interestdata';
import { useAuth } from "../contexts/AuthContext";

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
        paddingLeft: "20px", 
    },
    mainContainer: { 
        maxWidth: "900px",  
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

const MyInterest = () => {
    const navigate = useNavigate();

    const {likes, setLikes } = useAuth();

    const handleLikeClick = (index) => {
        const newLikes = [...likes];
        newLikes[index] = !newLikes[index];
        setLikes(newLikes);
    };

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
                            {scholarships.map((scholarship, index) => (
                                <tr key={scholarship.product_id}>
                                    <td style={styles.thTd}>{scholarship.foundation_name}</td>
                                    <td style={{ ...styles.thTd, paddingRight: "20px" }}>
                                        <Link to={`/notice/${scholarship.product_id}`} style={{ textDecoration: "none", color: "black" }}>
                                            {scholarship.name}
                                        </Link>
                                    </td>
                                    <td style={{ ...styles.thTd, paddingRight: "90px" }}>
                                        ~{scholarship.recruitment_end}
                                    </td>
                                    <td style={styles.thTd}>
                                        <div style={styles.flexContainer}>
                                            <Link to={`/notice/${scholarship.product_id}`} style={{ textDecoration: "none" }}>
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
                </div>
            </div>
        </div>
        </>
    );
};

export default MyInterest;