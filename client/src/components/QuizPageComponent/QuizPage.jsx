import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Importing styles & Assets 
import styles from './QuizPage.module.css'
import impIcon from '../../assets/icon-park-outline_eyes.svg'

const QuizPage = ({ match }) => {

    // Getting params from react-router-dom
    const { uid, qid } = useParams();

    // states 
    const [quiz, setQuiz] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);


    //   fetching quiz data from server
    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await axios.get(`http://localhost:4000/FET/quiztime/${uid}/${qid}`);
            console.log(response.data.quiz);
            setQuiz(response.data.quiz);
        };

        fetchQuiz();
    }, [uid, qid]);

    if (!quiz) {
        return <h1>Loading...</h1>;
    }

    const nextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    return (
        <div className={styles.quizPage}>
            <div className={styles.quizContainer}>
                {currentQuestionIndex === -1 ? (
                    <div>
                        <div className={styles.topRow}>
                            <span className={styles.quizTitle}>{quiz.title}</span>
                            <span className={styles.impCount}>{quiz.impressions}<img height={70} width={70} alt='' src={impIcon} /></span>
                        </div>
                        <span className={styles.createdOnContainer}>Created On: {quiz.createdOn}</span>
                        <div className={styles.startContainer}>
                            <button className={styles.startBtn} onClick={() => nextQuestion()}> Start </button>
                        </div>
                    </div>
                ) : currentQuestionIndex >= quiz.questions.length ? (
                    <div className={styles.endContainer}>
                        
                    </div>
                ) : (
                    <div className={styles.questionBoxContainer}>
                        <div className={styles.questionBox}>
                            <div className={styles.indexTimer}>
                                <span className={styles.index}> 0{currentQuestionIndex + 1} / 0{quiz.questions.length}</span>
                                <span className={styles.timer}>Timer : {`00:10s`}</span>
                            </div>

                            <div className={styles.questionText}>{quiz.questions[currentQuestionIndex].questionText}</div>

                            <div className={styles.optionTable}>
                                <table>
                                    <tbody>
                                        <tr className={styles.optionRow}>
                                            {quiz.questions[currentQuestionIndex].options[0] && <td className={styles.optionCol}> <button className={styles.optionColBtn}>{quiz.questions[currentQuestionIndex].options[0].optionText}</button> </td>}
                                            {quiz.questions[currentQuestionIndex].options[1] && <td className={styles.optionCol}> <button className={styles.optionColBtn}> {quiz.questions[currentQuestionIndex].options[1].optionText}</button> </td>}
                                        </tr>
                                        <tr className={styles.optionRow}>
                                            {quiz.questions[currentQuestionIndex].options[2] && <td className={styles.optionCol}> <button className={styles.optionColBtn}> {quiz.questions[currentQuestionIndex].options[2].optionText}</button> </td>}
                                            {quiz.questions[currentQuestionIndex].options[3] && <td className={styles.optionCol}> <button className={styles.optionColBtn}> {quiz.questions[currentQuestionIndex].options[3].optionText}</button> </td>}
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>

                            <button onClick={nextQuestion} className={styles.nextBtn}>Next</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default QuizPage;