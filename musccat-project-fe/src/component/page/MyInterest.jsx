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
        justifyContent: "center",  
        alignItems: "center",   
        padding: "70px",  
        boxSizing: "border-box",  
    },
    mainContainer: { 
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto", 
        padding: "20px",
    },
    outerContainer: {  
        border: "2px solid #348a8c", 
        borderRadius: "8px", 
        padding: "20px", 
        maxWidth: "900px", 
        width: "100%",
        marginTop: "10px", 
        backgroundColor: "white", 
        boxSizing: "border-box"
    },
    container: {
        margin: "10px",
        fontFamily: "Arial, sans-serif"
    },
    heading: {
        textAlign: "left",
        fontSize: "2em",
        fontWeight: "bold",
        color: "black",
        marginBottom: "20px"
    },
    tableContainer: {  
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        margin: "10px auto", 
        padding: "0 20px", 
        width: "100%"
    },
    table: {
        width: "100%",
        maxWidth: "1000px",  // 테이블 최대 가로 크기를 1200px로 제한
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
            <div style={styles.mainContainer}>
            <h1 style={styles.heading}>내 관심목록</h1>
                <div style={styles.outerContainer}>
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
        </div>
        </>
    );
};

export default MyInterest;