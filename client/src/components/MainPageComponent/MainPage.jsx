import React, { useState, useEffect, useContext, useRef } from 'react'

// Importing axios for RESTful API calls 
import axios from 'axios'

// Importing jwt-decode for decoding the JWT token
import { jwtDecode } from "jwt-decode";

// Importing react-cookie for cookie management
import Cookies from 'universal-cookie'

// Importing the css module
import styles from './MainPage.module.css'
import crossIcon from '../../assets/cancel.png'
import plusIcon from '../../assets/plus.png'
import delIcon from '../../assets/deleteImg.svg'

// for the confetti animation
import Confetti from 'react-confetti'

// Importing react toastify module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing the context 
import { UserContext } from '../../context/UserContext';

// Importing Components 
import Dashboard from './DashboardComponent/Dashboard';
import Analytics from './AnalyticsComponent/Analytics';
import { Navigate } from 'react-router-dom';




const MainPage = () => {

  // Fetch data from userContext
  const { user, setUser } = useContext(UserContext);

  // Toastify function 
  const notify = (msg) => {
    toast.success(<>{msg}</>, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }

  // for firing toastify messages , I made a useEffect to go off only on the first time loading of this component
  useEffect(() => {
    if (user && user.token) {
      notify(`😇 Welcome back ${user.username}`)
      // console.log(user);
    }
  }, []);

  // making a state for active page 
  const [activePage, setActivePage] = useState('dashboard');

  // State to apply active class to buttons (inside create Quiz modal ) & stores the type of quiz
  const [activeType, setActiveType] = useState('q&a');

  // making a state for storing the name of quiz  
  const [title, setTitle] = useState('')

  // state for holding the shareLink of created quiz
  const [shareLink, setShareLink] = useState('');

  // Function to handle first lvl modal form submission (sets Title state)
  const handleFirstSubmit = (e) => {
    const formInputs = new FormData(e.target)
    const payload = Object.fromEntries(formInputs);

    setTitle(payload.title);
  }

  // declaring constants for generating unique ids 
  const min = 1000, max = 10000

  // function to handle lvl 2 form
  const handleSecondSubmit = () => {
    // making unique id for each quiz
    let generatedQuizId = Math.floor(Math.random() * (max - min) + min)

    // Making variables for getting current date 
    let dateObject = new Date();
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // creating a quiz object to add to quizArray
    const newQuiz = {
      quizId: generatedQuizId,
      impressions: 0,
      shareLink: `http://localhost:4000/quizTime/${jwtDecode(user.token).userId}/${generatedQuizId}`,
      title: title,
      createdOn: dateObject.getDate() + ' ' + monthNames[dateObject.getMonth()] + ', ' + dateObject.getFullYear(),
      quizType: activeType,
      questions: questionsArray
    }

    // Make a POST request to the server
    axios.post(`http://localhost:4000/FET/createQuiz/${jwtDecode(user.token).userId}`, newQuiz)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("[Axios] Error in Adding quiz", error);
      });

    // Updating the shareLink state for the final share modal
    setShareLink(newQuiz.shareLink);
    setShowFinalModal(true)


    //  Updating the user Context 
    setUser(
      {
        ...user,
        userQuizData: [...user.userQuizData, newQuiz]
      }
    )



  }

  // making a state for showing initial Create Modal | Create Quiz form modal | final share modal
  const [showModal, setShowModal] = useState(false);
  const [showCreateQuizForm, setShowCreateQuizForm] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);


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

  // Function to reset the form and state variables
  const initialFormRef = useRef();
  const mainFormRef = useRef();
  const resetInitialModal = () => {
    initialFormRef.current.reset();
    setActiveType('q&a');
    setTitle('');
  }
  const resetMainModal = () => {
    // reset the initial modal
    resetInitialModal();

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

  // function 4 copying 2 clipboard of user 
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        console.log('Link copied to clipboard');
        notify('✅ Link copied to Clipboard');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  }

  // UseEffect for opening and closing the Initial model 
  const dialogRef = useRef();
  useEffect(() => {
    if (showModal) {
      dialogRef.current.showModal(); // method for opening Dialog tag Modal
    }
    else {
      dialogRef.current.close();     // method for closing Dialog tag Modal
    }
  }, [showModal]);

  // UseEffect for opening and closing the create quiz form modal
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

  // initialize cookie 
  const cookies = new Cookies();
  const logoutUser = () => {
    setUser(null);
    cookies.remove("jwt_token_cookie");
    Navigate('/');
  }

  return (
    <div className={styles.mainPage}>

      {/* Side Nav bar */}
      <div className={styles.navbar}>
        <h1>QUIZZIE</h1>
        <ul>
          <li><button className={activePage === 'dashboard' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActivePage('dashboard')}>Dashboard</button></li>
          <li><button className={activePage === 'analytics' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActivePage('analytics')}>Analytics</button></li>
          <li><button className={`${styles.btn} ${styles.inactive}`} onClick={() => setShowModal(true)}>Create Quiz</button></li>
        </ul>
        <hr />
        <button onClick={() => logoutUser()}>Logout</button>
      </div>

      <div className="content">
        {/* Dashboard Component */}
        {
          activePage === 'dashboard' && <Dashboard />
        }

        {/* Analytics Component */}
        {
          activePage === 'analytics' && <Analytics />
        }


        {/* Create Quiz Section */}

        {/* Initial CreateQuiz Modal */}
        <dialog className={styles.createContainer} ref={dialogRef}>
          <form onSubmit={handleFirstSubmit} method='dialog' className={styles.formLayout} ref={initialFormRef}>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <input type="text" name="title" id="title" className={styles.title} placeholder='Quiz Name' />
            </div>
            <div className={styles.btnContainer}>
              <span className={styles.type}>Quiz Type: </span>
              <button className={activeType === 'q&a' ? `${styles.btn} ${styles.createActive}` : `${styles.btn}`} type="button" onClick={() => setActiveType('q&a')}>Q & A</button>
              <button className={activeType === 'poll' ? `${styles.btn} ${styles.createActive}` : `${styles.btn}`} type="button" onClick={() => setActiveType('poll')}>Poll</button>
            </div>
            <div className={styles.btnContainer}>
              <span>
                <button className={styles.submissionBtn} onClick={() => {setShowModal(false); resetInitialModal()}}>
                  Cancel
                </button>
              </span>
              <span>
                <button type='submit' className={`${styles.submissionBtn} ${styles.createActive}`} onClick={() => { setShowModal(false); setShowCreateQuizForm(true) }}>
                  Continue
                </button>
              </span>
            </div>
          </form>
        </dialog>

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
                      <input type="text" onChange={(e) => handleQuestionsChange(e.target.value, question.qid, 'questionText')} className={styles.questionText} name="questionText" id="questionText" placeholder={activeType === 'q&a' ? 'Question Here...' : 'Poll Question here...'} />
                    </div>
                    <div className={styles.optionsTypeContainer}>
                      <span>Options type</span>
                      <label className={styles.optionTypeLabels}>
                        <input type="radio" name="optionType" id="optionType" value='text' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'optionType')} />
                        Text
                      </label>
                      <label className={styles.optionTypeLabels}>
                        <input type="radio" name="optionType" id="optionType" value='ImgURL' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'optionType')} />
                        ImgURL
                      </label>
                      <label className={styles.optionTypeLabels}>
                        <input type="radio" name="optionType" id="optionType" value='text&ImgURL' onClick={(e) => handleQuestionsChange(e.target.value, question.qid, 'optionType')} />
                        Text & ImgURL
                      </label>
                    </div>
                    <div>
                      <div className={styles.optionsContainer}>
                        {question.options.map((option) => {
                          return (
                            <div className={styles.options} key={option.oid}>
                              <input type="radio" name="correctOption"
                                className={activeType === 'poll' ? `${styles.noShow}` : ``}
                                onClick={() => handleOptionChange(option.optionText, option.optionImg, true, question.qid, option.oid)}
                              />

                              {question.optionsType === 'text' || question.optionsType === 'text&ImgURL' ? (
                                <input type="text" name="optionText" id="optionText"
                                  placeholder='Text'
                                  onChange={(e) => handleOptionChange(e.target.value, option.optionImg, option.isCorrect, question.qid, option.oid)}
                                  className={option.isCorrect && activeType === 'q&a' ? `${styles.optionTextBox} ${styles.activeOptionTextBox}` : `${styles.optionTextBox}`} />
                              ) : null}

                              {question.optionsType === 'text&ImgURL' || question.optionsType === 'ImgURL' ? (
                                <input type="text" name="optionImgURL3" id="optionImgURL3"
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
              <button type='button' className={styles.createCancel} onClick={() => { setShowCreateQuizForm(false);resetMainModal() }}>Cancel</button>
              <button type='Submit' className={styles.createSubmit} onClick={() => { setShowCreateQuizForm(false); handleSecondSubmit() }}>Create Quiz</button>
            </div>
          </form>
        </dialog>

        {/* Final sharing Modal */}
        <dialog ref={finalModalRef} className={styles.shareModal}>
          <Confetti width='880px' height='400px' tweenDuration={5000} />
          <div className={styles.shareContainer}>
            <h1 className={styles.shareHeading}>Congrats your Quiz is Published!</h1>
            <input type="text" value={shareLink} className={styles.shareLinkInput} readOnly />
            <button type="submit"
              onClick={() => { setShowFinalModal(false); copyToClipboard(); resetMainModal(); }}
              className={styles.shareBtn}>
              Share
            </button>
          </div>
        </dialog>

      </div>



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
        pauseOnHover={false}
        theme="light"
        icon={false}
      />
    </div>
  )
}

export default MainPage