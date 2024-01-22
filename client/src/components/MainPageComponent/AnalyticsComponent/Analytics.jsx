import React, { useState, useRef, useEffect, useContext } from 'react'

// Importing axios for RESTful API calls 
import axios from 'axios'

// Importing jwt-decode for decoding the JWT token
import { jwtDecode } from "jwt-decode";

// styles & assets
import styles from './Analytics.module.css'
import editImg from '../../../assets/editImg.svg'
import deleteImg from '../../../assets/deleteImg.svg'
import shareImg from '../../../assets/shareImg.svg'

import crossIcon from '../../../assets/cancel.png'
import plusIcon from '../../../assets/plus.png'
import delIcon from '../../../assets/deleteImg.svg'

// for the confetti animation
import Confetti from 'react-confetti'

// Importing react toastify module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing the context 
import { UserContext } from '../../../context/UserContext';

// Importing the Questions component
import Questions from './QuestionComponent/Questions'


const Analytics = () => {

  // Importing the Context 
  const { user, setUser } = useContext(UserContext);

  // Toastify function 
  const notify = (msg) => {
    toast.info(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // Function to copy the share link of teh Quiz to clipboard 
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        notify('✅ Link copied to Clipboard');
        console.log('Link Copied to Clipboard')
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  }

  // Getting the ref for the dialog element here 
  const dialogRef = useRef();
  // State to open and close delPopup
  const [isOpen, setIsOpen] = useState({
    state: false,
    quiz: null,
  });

  // State to open and close Questions Analysis 
  const [showAnalysis, setShowAnalysis] = useState({
    state: false,
    quiz: null,
  });

  // function to open and close delPopup by changing isOpen state
  const toggleDialog = (quizId) => {
    setIsOpen({
      state: !isOpen.state,
      quiz: quizId
    });
  };

  // function to open Questions Component
  const toggleShowAnalysis = (quizId) => {
    setShowAnalysis({
      state: !showAnalysis.state,
      quiz: quizId
    });
  };




  // States, functions and useEffects for Edit Modal
  const min = 1000, max = 10000
  const handleSecondSubmit = () => {

    // Making variables for getting current date 
    let dateObject = new Date();
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // creating a quiz object to add to quizArray
    let updatedQuiz = {
      quizId: activeQuiz.quizId,
      impressions: activeQuiz.impressions,
      shareLink: activeQuiz.shareLink,
      title: activeQuiz.title,
      createdOn: dateObject.getDate() + ' ' + monthNames[dateObject.getMonth()] + ', ' + dateObject.getFullYear(),
      quizType: activeQuiz.quizType,
      questions: questionsArray
    }

    // Make a POST request to the server
    axios.post(`http://localhost:4000/FET/updateQuiz/${jwtDecode(user.token).userId}/${activeQuiz.quizId}`, updatedQuiz)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("[Axios] Error in Adding quiz", error);
      });

    // Updating the shareLink state for the final share modal
    setShareLink(updatedQuiz.shareLink);
    setShowFinalModal(true)


    //  Updating the user Context 
    setUser(
      {
        ...user,
        userQuizData: [...user.userQuizData, updatedQuiz]
      }
    )



  }

  // making a state for showing  edit Quiz form modal
  const [showCreateQuizForm, setShowCreateQuizForm] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(user.userQuizData[0]);
  const [activeType, setActiveType] = useState('q&a');
  const [title, setTitle] = useState('')
  const [shareLink, setShareLink] = useState('');


  // making a state array for adding/removing Questions & array for Options
  const [questionsArray, setQuestionsArray] = useState([{
    qid: 0,
    questionText: '',
    optionsType: 'text',
    isTimed: 0,
    options: [
      {
        oid: 0,
        optionText: '',
        optionImg: '',
        isCorrect: false
      },
      {
        oid: 1,
        optionText: '',
        optionImg: '',
        isCorrect: false
      }
    ],
    attempts: 0,
    answeredCorrect: 0,
    answeredIncorrect: 0
  }]);

  // function for handling adding questions & one for adding options
  const handleAddQuestion = () => {
    const newQuestionsArray = [...questionsArray, {
      qid: Math.floor(Math.random() * (max - min) + min),
      questionText: '',
      optionsType: 'text',
      isTimed: 0,
      options: [
        {
          oid: 1,
          optionText: '',
          optionImg: '',
          isCorrect: false
        },
        {
          oid: 2,
          optionText: '',
          optionImg: '',
          isCorrect: false
        }
      ],
      attempts: 0,
      answeredCorrect: 0,
      answeredIncorrect: 0
    }];
    setQuestionsArray(newQuestionsArray);
  }

  const addOption = (qid) => {
    // console.log('qid in addOptions: ', qid)
    // Find the correct question
    const questionIndex = questionsArray.findIndex(question => question.qid === qid);

    // getting old options array 
    const optionsArray = questionsArray[questionIndex].options;

    // add the new option
    const newOptionsArray = [...optionsArray, {
      oid: Math.floor(Math.random() * (max - min) + min),
      optionText: '',
      optionImg: '',
      isCorrect: false
    }]

    // Create a new questions array with the updated options
    const newQuestionsArray = [...questionsArray];
    newQuestionsArray[questionIndex].options = newOptionsArray;

    // Update the state
    setQuestionsArray(newQuestionsArray);
  }

  // function for handling removing questions & one to remove options
  const removeQuestion = (id) => {
    // console.log('id: ', id);
    setQuestionsArray(questionsArray.filter(question => question.qid !== id));
  };

  const removeOption = (qid, oid) => {
    // Find the correct question
    const questionIndex = questionsArray.findIndex(question => question.qid === qid);

    // Remove the correct option
    const newOptionsArray = questionsArray[questionIndex].options.filter(option => option.oid !== oid);

    // Create a new questions array with the updated options
    const newQuestionsArray = [...questionsArray];
    newQuestionsArray[questionIndex].options = newOptionsArray;

    // Update the state
    setQuestionsArray(newQuestionsArray);
  };

  // function for handling onChange in Questions & a function for handling options onChange
  const handleQuestionsChange = (value, qid, inputType) => {
    const inputData = [...questionsArray];
    const questionIndex = inputData.findIndex(question => question.qid === qid);
    switch (inputType) {
      case 'questionText':
        inputData[questionIndex].questionText = value;
        break;

      case 'optionType':
        inputData[questionIndex].optionsType = value;
        break;

      case 'isTimed':
        inputData[questionIndex].isTimed = value;
        break;

      default:
        break;
    }

    setQuestionsArray(inputData);
  }

  const handleOptionChange = (textValue = '', imgValue = '', isCorrect, qid, oid) => {
    const questionIndex = questionsArray.findIndex(question => question.qid === qid);
    const optionIndex = questionsArray[questionIndex].options.findIndex(option => option.oid === oid);


    // Creating a new questionArray with new values for option
    const newQuestionsArray = [...questionsArray];

    if (isCorrect) {
      newQuestionsArray[questionIndex].options.forEach((option) => {
        if (option.oid === oid)
          option.isCorrect = true;
        else
          option.isCorrect = false;
      })
    }
    if (questionsArray[questionIndex].optionsType === 'text&ImgURL') {
      newQuestionsArray[questionIndex].options[optionIndex].optionText = textValue;
      newQuestionsArray[questionIndex].options[optionIndex].optionImg = imgValue;
    }
    if (questionsArray[questionIndex].optionsType === 'text') {
      newQuestionsArray[questionIndex].options[optionIndex].optionText = textValue;
    }
    if (questionsArray[questionIndex].optionsType === 'ImgURL') {
      newQuestionsArray[questionIndex].options[optionIndex].optionImg = imgValue;
    }


    // updating the questionArray
    setQuestionsArray(newQuestionsArray);
  }



  const mainFormRef = useRef();
  const resetMainModal = () => {
    // reset main form | questionsArray
    mainFormRef.current.reset();
    setQuestionsArray([{
      qid: 0,
      questionText: '',
      optionsType: 'text',
      isTimed: 0,
      options: [
        {
          oid: 0,
          optionText: '',
          optionImg: '',
          isCorrect: false
        },
        {
          oid: 1,
          optionText: '',
          optionImg: '',
          isCorrect: false
        }
      ],
      attempts: 0,
      answeredCorrect: 0,
      answeredIncorrect: 0
    }])

  }

  const createDialogRef = useRef();
  useEffect(() => {
    if (showCreateQuizForm) {
      createDialogRef.current.showModal();
    }
    else {
      createDialogRef.current.close();
    }
  }, [showCreateQuizForm]);

  const finalModalRef = useRef();
  useEffect(() => {
    if (showFinalModal) {
      finalModalRef.current.showModal();
    }
    else {
      finalModalRef.current.close();
    }
  }, [showFinalModal]);

  // UseEffect for setting the Quiz with quiz details
  useEffect(() => {
    if(activeQuiz){
      setQuestionsArray(activeQuiz.questions)
      setActiveType(activeQuiz.quizType)
      setTitle(activeQuiz.title)
    }
  }, [activeQuiz]);
  


  // Creating a useEffect to listen for changes to isOpen state
  useEffect(() => {
    if (isOpen.state) {
      dialogRef.current.showModal(); // method for opening Dialog tag Modal
    }
    else {
      dialogRef.current.close();     // method for closing Dialog tag Modal
    }
  }, [isOpen]);

  // Creating a useEffect to listen for changes to userContext
  useEffect(() => {
    console.log('User after update:', user);
  }, [user]);

  // Function to delete quiz from db  | unstable function cause of react-toastify issue
  const delQuiz = async () => {
    try {
      // replace 'quizId' with the id of the quiz you want to delete
      console.log('sending delete request now...');
      const response = await axios.delete(`http://localhost:4000/FET/deleteQuiz/${jwtDecode(user.token).userId}/${isOpen.quiz}`);
      console.log("FrontEnd response : ", response);

      if (response.status === 200) {
        // update user context after successful deletion
        console.log(response.data.message);
        console.log('User before update:', user);
        const updatedUser = { ...user, userQuizData: user.userQuizData.filter(quiz => quiz.quizId !== isOpen.quiz) };
        await setUser(updatedUser);




        //notify('✅ Quiz Deleted');   // causing a double render of the toastify message and causing app to crash when placed inside this delQuiz function

      } else {
        console.error('Failed to delete quiz');
        console.log('Failed to Delete the quiz <br/>Server sent back status 500');
        // notify('☠️ Failed to Delete the quiz <br/>Server sent back status 500');
      }

      toggleDialog(''); // closing the delPopup

    }
    catch (error) {
      //notify(<>☠️ Error while Sending deleting Request to DB<br />error</>);
      console.log('Error while Sending deleting Request to DB', error);
    }
  };

  return (
    <>
      {
        !showAnalysis.state && (
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
                <span style={{ color: '#5076FF' }}>Actions</span>
                <span style={{ color: '#5076FF' }}>Question Wise Analysis</span>
              </div>
              <div className={styles.rowContainer}>
                {user && user.userQuizData && user.userQuizData.map((_, index) => (
                  <div className={index % 2 === 0 ? `${styles.tableRow} ${styles.mainRow}` : `${styles.tableRow} ${styles.alternateRow}`}>
                    <span>{index + 1}</span>
                    <span>{user.userQuizData[index].title}</span>
                    <span>{user.userQuizData[index].createdOn}</span>
                    <span>{user.userQuizData[index].impressions}</span>
                    <span>
                      <button className={styles.editBtn} onClick={() => {setShowCreateQuizForm(true); setActiveQuiz(user.userQuizData[index]); console.log(user.userQuizData)}}> <img src={editImg} alt='edit' /> </button>
                      <button className={styles.deleteBtn} onClick={() => toggleDialog(user.userQuizData[index].quizId)}> <img src={deleteImg} alt='del' /> </button>
                      <button className={styles.shareBtn} onClick={() => copyToClipboard(user.userQuizData[index].shareLink)}>
                        <img src={shareImg} alt='share' />
                      </button>
                    </span>
                    <span>
                      <button className={styles.questionWiseAnalysis} onClick={() => toggleShowAnalysis(user.userQuizData[index].quizId)}>Question Wise Analysis</button>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Creating Quiz Modal */}
            <dialog ref={createDialogRef} className={styles.mainCreateModal}>
              <form method='dialog' ref={mainFormRef}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span className={styles.qBtnContainer}>
                    {questionsArray.map((question, index) => (
                      <button key={question.qid} type='button' className={styles.qBtn}>Q{index + 1} {question.qid !== 0 && <img src={crossIcon} className={styles.cross} alt='' onClick={() => removeQuestion(question.qid)} />} </button>
                    ))}
                    <span>
                      <img src={plusIcon}
                        alt=''
                        className={questionsArray.length === 5 ? `${styles.noShow}` : `${styles.plus}`}
                        onClick={() => {
                          if (questionsArray.length !== 5)
                            handleAddQuestion()
                        }} />
                    </span>
                  </span>
                  <span className={styles.limit}>Max 5 Questions</span>
                </div>
                <div className={styles.mappedInputs} >
                  {questionsArray.map((question, index) => {
                    return (
                      <div key={question.qid}>
                        <div className={styles.questionTextInput}>
                          <input type="text" value={question.questionText} onChange={(e) => handleQuestionsChange(e.target.value, question.qid, 'questionText')} className={styles.questionText} name="questionText" id="questionText" placeholder={activeType === 'q&a' ? 'Question Here...' : 'Poll Question here...'} />
                        </div>
                        <div className={styles.optionsTypeContainer}>
                          <span>Options type</span>
                          <label className={styles.optionTypeLabels}>
                            <input type="radio" defaultChecked={question.optionType === 'text'} name="optionType" id="optionType" value='text' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'optionType')} />
                            Text
                          </label>
                          <label className={styles.optionTypeLabels}>
                            <input type="radio" defaultChecked={question.optionType === 'ImgURL'} name="optionType" id="optionType" value='ImgURL' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'optionType')} />
                            ImgURL
                          </label>
                          <label className={styles.optionTypeLabels}>
                            <input type="radio" defaultChecked={question.optionType === 'text&ImgURL'} name="optionType" id="optionType" value='text&ImgURL' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'optionType')} />
                            Text & ImgURL
                          </label>
                        </div>
                        <div>
                          <div className={styles.optionsContainer}>
                            {question.options.map((option) => {
                              return (
                                <div className={styles.options} key={option.oid}>
                                  <input type="radio" name="correctOption"
                                    defaultChecked={option.isCorrect}
                                    className={activeType === 'poll' ? `${styles.noShow}` : ``}
                                    onClick={() => handleOptionChange(option.optionText, option.optionImg, true, question.qid, option.oid)}
                                  />

                                  {question.optionsType === 'text' || question.optionsType === 'text&ImgURL' ? (
                                    <input type="text" name="optionText" id="optionText"
                                      value={option.optionText}
                                      placeholder='Text'
                                      onChange={(e) => handleOptionChange(e.target.value, option.optionImg, option.isCorrect, question.qid, option.oid)}
                                      className={option.isCorrect && activeType === 'q&a' ? `${styles.optionTextBox} ${styles.activeOptionTextBox}` : `${styles.optionTextBox}`} />
                                  ) : null}

                                  {question.optionsType === 'text&ImgURL' || question.optionsType === 'ImgURL' ? (
                                    <input type="text" name="optionImgURL3" id="optionImgURL3"
                                      value={option.optionImg}
                                      placeholder='Image URL'
                                      onChange={(e) => handleOptionChange(option.optionText, e.target.value, option.isCorrect, question.qid, option.oid)}
                                      className={option.isCorrect && activeType === 'q&a' ? `${styles.optionTextBox} ${styles.activeOptionTextBox}` : `${styles.optionTextBox}`} />
                                  ) : null}

                                  {option.oid > 2 && <span> <img src={delIcon} alt="" className={styles.delIcon} onClick={() => removeOption(question.qid, option.oid)} /> </span>}
                                </div>
                              )
                            })}

                            <div className={styles.options}>
                              <button type='button'
                                className={question.options.length === 4 ? `${styles.noShow}` : `${styles.addOption}`}
                                onClick={() => {
                                  if (question.options.length < 4)
                                    addOption(question.qid)
                                }}>
                                Add Option
                              </button>
                              <div className={activeType === 'poll' ? `${styles.noShow}` : `${styles.timerContainer}`}>
                                <button type='button' className={styles.timerTitle}>Timer</button>
                                <button type='button' className={Number(question.isTimed) === 0 ? `${styles.times} ${styles.activeTimes}` : `${styles.times}`} value='0' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'isTimed')}>Off</button>
                                <button type='button' className={Number(question.isTimed) === 5 ? `${styles.times} ${styles.activeTimes}` : `${styles.times}`} value='5' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'isTimed')}>5 sec</button>
                                <button type='button' className={Number(question.isTimed) === 10 ? `${styles.times} ${styles.activeTimes}` : `${styles.times}`} value='10' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'isTimed')}>10 sec</button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )
                  })}

                </div>
                <div className={styles.createSubmitBtnContainer}>
                  <button type='button' className={styles.createCancel} onClick={() => { setShowCreateQuizForm(false); /*resetMainModal()*/ }}>Cancel</button>
                  <button type='Submit' className={styles.createSubmit} onClick={() => { setShowCreateQuizForm(false); handleSecondSubmit() }}>Update Quiz</button>
                </div>
              </form>
            </dialog>

            {/* Dialog element for the delete popup */}
            <dialog className={styles.delPopup} ref={dialogRef}>
              <div>Are you confirm you want to delete ?</div>
              <span><button className={styles.confirmBtn} onClick={() => delQuiz()}>Confirm Delete</button></span>
              <span><button onClick={() => toggleDialog('')}>Cancel</button></span>
            </dialog>

          </div>

        )
      }

      {/* Final sharing Modal */}
      <dialog ref={finalModalRef} className={styles.shareModal}>
        <Confetti width='880px' height='400px' tweenDuration={5000} />
        <div className={styles.shareContainer}>
          <h1 className={styles.shareHeading}>Congrats your Quiz is Published!</h1>
          <input type="text" value={shareLink} className={styles.shareLinkInput} readOnly />
          <button type="submit"
            onClick={() => { setShowFinalModal(false); copyToClipboard(); resetMainModal(); }}
            className={styles.modalShareBtn}>
            Share
          </button>
        </div>
      </dialog>

      {/* Question Wise Analysis Page */}
      {
        showAnalysis.state && <Questions quizId={showAnalysis.quiz} />
      }

      {/* Toastify Container added here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        icon={false}
      />

    </>
  )
}

export default Analytics