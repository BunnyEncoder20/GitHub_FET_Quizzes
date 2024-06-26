import React, { useContext } from 'react'

// Importing the styles
import styles from './Questions.module.css'

import { UserContext } from '../../../../context/UserContext';


const Questions = ({ quizId }) => {

    // Importing the Context 
    const { user } = useContext(UserContext);

    // Finding the specific quiz and loading it's data into the Quiz variable
    let quiz = user.userQuizData.find(quizData => quizData.quizId === quizId);

    return (
        <div className={styles.questionsComponent}>
            <h1 className={styles.heading}>
                {quiz.title} - Questions Analysis
                <div className={styles.sideHeading}>
                    <span>Created On: {quiz.createdOn}</span>
                    <span>Impressions: {quiz.impressions}</span>
                </div>
            </h1>


            {user && quiz.quizType === 'q&a' && quiz.questions.map((question, index) => (
                <div className={styles.container} key={index}>
                    <h3 className={styles.questionText}>Q{index+1}. {question.questionText}</h3>
                    <div className={styles.stats}>
                        <div className={styles.statsBox}> <span className={styles.BigNum}>{question.attempts}</span> people Attempted the question</div>
                        <div className={styles.statsBox}><span className={styles.BigNum}>{question.answeredCorrect}</span> people Answered Correctly</div>
                        <div className={styles.statsBox}><span className={styles.BigNum}>{question.answeredIncorrect}</span> people Answered Incorrectly</div>
                    </div>
                    <hr />
                </div>
            ))}

            {user && quiz.quizType === 'poll' && quiz.questions.map((question, index) => (
                <div className={styles.container} key={index}>
                    <h3 className={styles.questionText}>Q{index+1}. {question.questionText}</h3>
                    <div className={styles.stats}>
                        {question.options[0] && <div className={styles.statsBox}><span className={styles.BigNum}>{question.options[0].opted}</span> {question.options[0].optionText} </div>}
                        {question.options[1] && <div className={styles.statsBox}><span className={styles.BigNum}>{question.options[1].opted}</span> {question.options[1].optionText} </div>}
                        {question.options[2] && <div className={styles.statsBox}><span className={styles.BigNum}>{question.options[2].opted}</span> {question.options[2].optionText} </div>}
                        {question.options[3] && <div className={styles.statsBox}><span className={styles.BigNum}>{question.options[3].opted}</span> {question.options[3].optionText} </div>}
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Questions