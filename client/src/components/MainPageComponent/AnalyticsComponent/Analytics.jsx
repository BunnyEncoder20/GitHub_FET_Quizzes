import React, { useState, useEffect, useContext } from 'react'

// Importing jwt-decode for decoding the JWT token
import { jwtDecode } from "jwt-decode";

// styles & assets
import styles from './Analytics.module.css'
import editImg from '../../../assets/editImg.svg'
import deleteImg from '../../../assets/deleteImg.svg'
import shareImg from '../../../assets/shareImg.svg'


// Importing the context 
import { UserContext } from '../../../context/UserContext';

const Analytics = () => {

  // Importing the Context 
  const { user } = useContext(UserContext);

  return (
    <div className={styles.analytics}>
      {/* Heading */}
      <div className={styles.heading}>Quiz Analysis</div>

      {/* Tables */}
      <div className={styles.table}>
        <div className={styles.tableRow + ' ' + styles.tableHeader}>
          <span>S no.</span>
          <span>Quiz Name</span>
          <span>Created On</span>
          <span>Impressions</span>
          <span>Actions</span>
          <span>Share Link</span>
        </div>
        {user && user.userQuizData &&   user.userQuizData.map((_, index) => (
          <div className={index % 2 === 0 ? `${styles.tableRow} ${styles.mainRow}` : `${styles.tableRow} ${styles.alternateRow}`}>
            <span>{index}</span>
            <span>{user.userQuizData[index].title}</span>
            <span>{user.userQuizData[index].createdOn}</span>
            <span>{user.userQuizData[index].impressions}</span>
            <span>
              <button className={styles.editBtn}> <img src={editImg} /> </button>
              <button className={styles.deleteBtn}> <img src={deleteImg} /> </button>
              <button className={styles.shareBtn}> <img src={shareImg} /> </button>
            </span>
            <span>
              <button className={styles.questionWiseAnalysis}>Question Wise Analysis</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics