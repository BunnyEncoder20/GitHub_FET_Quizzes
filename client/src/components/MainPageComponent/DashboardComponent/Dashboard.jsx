import React, { useState, useContext } from 'react'

// styles 
import styles from './Dashboard.module.css'

// Importing the context 
import { UserContext } from '../../../context/UserContext';

const Dashboard = () => {

    // Fetch data from userContext
    const { user, setUser } = useContext(UserContext);
    return (
        <div className={styles.dashboard}>
            <div className={styles.stats}>
                <div className={styles.flexbox}>Quizzes Created</div>
                <div className={styles.flexbox}>Questions Asked</div>
                <div className={styles.flexbox}>Total Impressions</div>
            </div>
            <div className={styles.quizMade}>
                {/* Replace this with your actual data */}
                {Array(12).fill().map((_, i) => (
                    <div key={i} className={styles.quizBox}>Quiz {i + 1}</div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard