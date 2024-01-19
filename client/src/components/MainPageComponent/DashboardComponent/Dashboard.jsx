import React, { useState, useEffect, useContext } from 'react'

// Importing jwt-decode for decoding the JWT token
import { jwtDecode } from "jwt-decode";

// styles & assets
import styles from './Dashboard.module.css'
import impIcon from '../../../assets/icon-park-outline_eyes.svg'

// Importing the context 
import { UserContext } from '../../../context/UserContext';

const Dashboard = () => {

    // States for holding data : 
    const [userQuizData, setUserQuizData] = useState([]);
    const [stats, setStats] = useState({
        numberOfQuizzes:0,
        numberOfQuestions:0,
        impressions:0,
    });

    // Fetch data from userContext
    const { user } = useContext(UserContext);

    // useEffect for loading user data from context
    useEffect(() => {
        if (user && user.token) {

            const numberOfQuizzes = user.userQuizData.length

            let numberOfQuestions = 0
            for (let i = 0; i < user.userQuizData.length; i++) 
                numberOfQuestions += user.userQuizData[i].questions.length

            let impressions = 0 
            for (let i = 0; i<user.userQuizData.length; i++)
                impressions += Number(user.userQuizData[i].impressions)
            
            // Setting the State of stats 
            setStats({
                numberOfQuizzes,
                numberOfQuestions,
                impressions,
            })
            
        }
    }, [user]);


    // function to format the numbers above a 1000
    const formatNumber = (num) => {
        if (num > 10000)
            return (num / 1000).toFixed(0) + 'K';
        if (num > 1000)
            return (num / 1000).toFixed(1) + 'K';
        return num;
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.stats}>
                <div className={`${styles.flexbox} ${styles.qc}`}><span className={styles.bigNum}>{formatNumber(stats.numberOfQuizzes)}</span> Quizzes Created</div>
                <div className={`${styles.flexbox} ${styles.qa}`}><span className={styles.bigNum}>{formatNumber(stats.numberOfQuestions)}</span> Questions Asked</div>
                <div className={`${styles.flexbox} ${styles.imp}`}><span className={styles.bigNum}>{formatNumber(stats.impressions)}</span> Total Impressions</div>
            </div>
            <div className={styles.heading}>Treading Quizs</div>
            <div className={styles.quizMade}>
                {/* Replace this with your actual data */}
                {user.userQuizData.map((_, i) => (
                    <div key={i} className={styles.quizBox}>
                        <div>
                            <span className={styles.quizTitle}>{user.userQuizData[i].title}</span>
                            <span className={styles.impCount}>{user.userQuizData[i].impressions} <img src={impIcon} /></span>
                        </div>
                        <span className={styles.date}>Created On: {user.userQuizData[i].createdOn}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard