import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Importing styles & Assets 
import styles from './QuizPage.module.css'
import impIcon from '../../assets/icon-park-outline_eyes.svg'
import EndingImg from '../../assets/quizEnd.png'
// for the confetti animation
import Confetti from 'react-confetti'

// Importing Components
import Timer from '../../utils/Timer.js'
import QuizOptions from './QuizOptions.jsx'


const QuizPage = () => {

    // Getting params from react-router-dom
    const { uid, qid } = useParams();

    // states & Ref
    const [quiz, setQuiz] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    // const [answers, setAnswers] = useState([]);
    const answersRef = useRef([]);



    //   fetching quiz data from server
    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await axios.get(`http://localhost:4000/FET/quiztime/${uid}/${qid}`);
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

    const handleAnswersFromChild = (answersFromChild) => {
        console.log('answersFromChild came',answersFromChild);
        answersRef.current = answersFromChild;  
    }

    const getResults = () => {
        let score = 0;
        answersRef.current.forEach(answer => {
            if (answer && answer.isCorrect)
                score += 1;
        });

        return score;
    }

    const sendData = () => {
        // Sending Data to Server
        const userAnswers = answersRef.current.map(answer => answer || null);
        // console.log(userAnswers);
        if (quiz.quizType === 'q&a') {
            let data = { userAnswers: answersRef.current, isPoll: false }
            axios.post(`http://localhost:4000/FET/updateQuizStats/${uid}/${qid}`, data)
                .then(response => {
                    console.log('[Mongo] OK');
                })
                .catch(err => {
                    console.log("ERROR: ", err)
                })
        }
        else {
            let data = { userAnswers: answersRef.current, isPoll: true }
            axios.post(`http://localhost:4000/FET/updateQuizStats/${uid}/${qid}`, data)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log("ERROR: ", err)
                })
        }
    }



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
                    quiz.quizType === 'q&a' ? (
                        <>
                            
                            {window.innerWidth >= 450 ? <Confetti width='1107px' height='680px' tweenDuration={5000} /> : <Confetti width='450px' height='700px' tweenDuration={5000} numberOfPieces={100} />}

                            <div className={styles.endContainer}>
                                <div className={styles.endPage}>
                                    <div>Congrats Quiz is completed</div>
                                    <img src={EndingImg} alt="" width={320} height={323} />
                                    <div>Your Score is <span className={styles.finalScore}>0{getResults()}/0{quiz.questions.length}</span></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        quiz.quizType === 'poll' && (
                            <div className={styles.pollEnding}>
                                
                                Thank you for participating in the Poll <br /> 🙏
                            </div>
                        )
                    )

                ) : (
                    <div className={styles.questionBoxContainer}>
                        <div className={styles.questionBox}>
                            <div className={styles.indexTimer}>
                                <span className={styles.index}> 0{currentQuestionIndex + 1} / 0{quiz.questions.length}</span>
                                {quiz.questions[currentQuestionIndex].isTimed > 0 ? (<span className={styles.timer}><Timer duration={quiz.questions[currentQuestionIndex].isTimed} onTimeEnd={nextQuestion} /></span>) : <span>&emsp;&emsp;&emsp;</span>}
                            </div>

                            <div className={styles.questionText}>{quiz.questions[currentQuestionIndex].questionText}</div>

                            <QuizOptions numQuestions={quiz.questions.length} currentQuestionIndex={currentQuestionIndex} options={quiz.questions[currentQuestionIndex].options} optionType={quiz.questions[currentQuestionIndex].optionsType} callBack={handleAnswersFromChild} />

                            <button
                                onClick={currentQuestionIndex === quiz.questions.length - 1 ? () => { nextQuestion(); sendData() } : () => nextQuestion()}
                                className={styles.nextBtn}>
                                {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default QuizPage;