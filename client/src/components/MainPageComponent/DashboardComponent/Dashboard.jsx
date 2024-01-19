import React, { useState, useContext } from 'react'

// styles & assets
import styles from './Dashboard.module.css'
import impIcon from '../../../assets/icon-park-outline_eyes.svg'

// Importing the context 
import { UserContext } from '../../../context/UserContext';

const Dashboard = () => {

    // Fetch data from userContext
    const { user, setUser } = useContext(UserContext);

    // function to format the numbers above a 1000
    const formatNumber = (num) => {
        if (num > 10000)
            return (num / 1000) + 'K';
        if (num > 1000)
            return (num / 1000).toFixed(1) + 'K';
        return num;
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.stats}>
                <div className={`${styles.flexbox} ${styles.qc}`}><span className={styles.bigNum}>{formatNumber(12)}</span> Quizzes Created</div>
                <div className={`${styles.flexbox} ${styles.qa}`}><span className={styles.bigNum}>{formatNumber(1200)}</span> Questions Asked</div>
                <div className={`${styles.flexbox} ${styles.imp}`}><span className={styles.bigNum}>{formatNumber(14000)}</span> Total Impressions</div>
            </div>
            <div className={styles.heading}>Treading Quizs</div>
            <div className={styles.quizMade}>
                {/* Replace this with your actual data */}
                {Array(12).fill().map((_, i) => (
                    <div key={i} className={styles.quizBox}>
                        <div>
                            <span className={styles.quizTitle}>QuizTitle</span>
                            <span className={styles.impCount}>{600} <img src={impIcon} /></span>
                        </div>
                        <span className={styles.date}>Created On: 20 Sep 2024</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard