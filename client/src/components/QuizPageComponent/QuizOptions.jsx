import React, { useState, useEffect } from 'react'

// Importing Styles 
import styles from './QuizPage.module.css';


const QuizOptions = ({ numQuestions, currentQuestionIndex, options, optionType, callBack }) => {

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if(answers.length === numQuestions) {
            callBack(answers);
        }
    }, [answers,numQuestions,callBack]);

    const handleAnswer = (optionIndex) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = options[optionIndex];

            return newAnswers;
        })
    }

    // console.log(answers);


    return (

        <div className={styles.optionTable}>
            <table>
                <tbody>
                    <tr className={styles.optionRow}>
                        {options[0] &&
                            <td className={styles.optionCol}>
                                <button
                                    className={answers[currentQuestionIndex] === options[0] ? `${styles.optionColBtn} ${styles.optionActive}` : `${styles.optionColBtn}`}
                                    onClick={() => handleAnswer(0)}>
                                    {
                                        optionType === 'text' ? (
                                            options[0].optionText
                                        ) : optionType === 'ImgURL' ? (
                                            <img src={options[0].optionImg} alt='' />
                                        ) : (
                                            <div className={styles.textImgURL}>
                                                {options[0].optionText}
                                                <img src={options[0].optionImg} alt='' />
                                            </div>
                                        )
                                    }
                                </button>
                            </td>
                        }
                        {
                            options[1] &&
                            <td className={styles.optionCol}>
                                <button
                                    className={answers[currentQuestionIndex] === options[1] ? `${styles.optionColBtn} ${styles.optionActive}` : `${styles.optionColBtn}`}
                                    onClick={() => handleAnswer(1)}>
                                    {
                                        optionType === 'text' ? (
                                            options[1].optionText
                                        ) : optionType === 'ImgURL' ? (
                                            <img src={options[1].optionImg} alt='' />
                                        ) : (
                                            <div className={styles.textImgURL}>
                                                {options[1].optionText}
                                                <img src={options[1].optionImg} alt='' />
                                            </div>
                                        )
                                    }
                                </button>
                            </td>
                        }
                    </tr>
                    <tr className={styles.optionRow}>
                        {
                            options[2] &&
                            <td className={styles.optionCol}>
                                <button
                                    className={answers[currentQuestionIndex] === options[2] ? `${styles.optionColBtn} ${styles.optionActive}` : `${styles.optionColBtn}`}
                                    onClick={() => handleAnswer(2)}>
                                    {
                                        optionType === 'text' ? (
                                            options[2].optionText
                                        ) : optionType === 'ImgURL' ? (
                                            <img src={options[2].optionImg} alt='' />
                                        ) : (
                                            <div className={styles.textImgURL}>
                                                {options[2].optionText}
                                                <img src={options[2].optionImg} alt='' />
                                            </div>
                                        )
                                    }
                                </button>
                            </td>
                        }
                        {
                            options[3] &&
                            <td className={styles.optionCol}>
                                <button
                                    className={answers[currentQuestionIndex] === options[3] ? `${styles.optionColBtn} ${styles.optionActive}` : `${styles.optionColBtn}`}
                                    onClick={() => handleAnswer(3)}>
                                    {
                                        optionType === 'text' ? (
                                            options[3].optionText
                                        ) : optionType === 'ImgURL' ? (
                                            <img src={options[3].optionImg} alt='' />
                                        ) : (
                                            <div className={styles.textImgURL}>
                                                {options[3].optionText}
                                                <img src={options[3].optionImg} alt='' />
                                            </div>
                                        )
                                    }
                                </button>
                            </td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default QuizOptions