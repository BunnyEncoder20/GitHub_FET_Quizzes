import React, { useState, useEffect, useContext, useRef } from 'react'

// Importing the css module
import styles from './MainPage.module.css'
import crossIcon from '../../assets/cancel.png'
import plusIcon from '../../assets/plus.png'

// Importing react toastify module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing the context 
import { UserContext } from '../../context/UserContext';

// Importing Components 
import Dashboard from './DashboardComponent/Dashboard';
import Analytics from './AnalyticsComponent/Analytics';




const MainPage = () => {

  // Fetch data from userContext
  const { user } = useContext(UserContext);

  // Toastify function 
  const notify = (msg) => {
    toast.success(<>✅ Log in Successful!<br />😇 {msg}</>, {
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
      notify(`Welcome back ${user.username}`)
      // console.log(user);
    }
  }, []);

  // making a state for active page 
  const [activePage, setActivePage] = useState('dashboard');

  // State to apply active class to buttons (inside create Quiz modal ) & stores the type of quiz
  const [activeType, setActiveType] = useState('q&a');

  // making a state for storing the name of quiz  
  const [title, setTitle] = useState('')

  // Function to handle first lvl modal form submission
  const handleFirstSubmit = (e) => {
    const formInputs = new FormData(e.target)
    const payload = Object.fromEntries(formInputs);
    console.log(payload.title);
    console.log(activeType);
    setTitle(payload.title);
  }

  // function to handle lvl 2 form
  const handleSecondSubmit = (e) => { }

  // making a state for showing Create Modal
  const [showModal, setShowModal] = useState(false);

  // making a state for showing Crate Quiz form modal
  const [showCreateQuizForm, setShowCreateQuizForm] = useState(false);

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
      createDialogRef.current.showModal(); // method for opening Dialog tag Modal
    }
    else {
      createDialogRef.current.close();     // method for closing Dialog tag Modal
    }
  }, [showCreateQuizForm]);

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
        <button>Logout</button>
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

        {/* Initial CreateQuiz Modal */}

        <dialog className={styles.createContainer} ref={dialogRef}>
          <form onSubmit={handleFirstSubmit} method='dialog' className={styles.formLayout}>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <input type="text" name="title" id="title" className={styles.title} placeholder='Quiz Name' />
            </div>
            <div className={styles.btnContainer}>
              <span className={styles.type}>Quiz Type: </span>
              <button className={activeType === 'q&a' ? `${styles.btn} ${styles.createActive}` : `${styles.btn}`} type="button" onClick={() => setActiveType('q&a')}>Q & A</button>
              <button className={activeType === 'poll' ? `${styles.btn} ${styles.createActive}` : `${styles.btn}`} type="button" onClick={() => setActiveType('poll')}>Poll</button>
            </div>
            <div className={styles.btnContainer}>
              {/* add later : onClick={()=>setShowModal(false)} */}
              <span><button className={styles.submissionBtn} onClick={() => setShowModal(false)}>Cancel</button></span>
              <span><button type='submit' className={`${styles.submissionBtn} ${styles.createActive}`} onClick={() => { setShowModal(false); setShowCreateQuizForm(true) }}>Continue</button></span>
            </div>
          </form>
        </dialog>

        {/* Main Creating Quiz Modal */}
        <dialog ref={createDialogRef}>
          <form method='dialog' className={styles.mainCreateModal}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span className={styles.qBtnContainer}>
                <button type='button' className={styles.qBtn}>Q1 <img src={crossIcon} className={styles.cross} alt='' /> </button>
                <button type='button' className={styles.qBtn}>Q2 <img src={crossIcon} className={styles.cross} alt='' /> </button>
                <button type='button' className={styles.qBtn}>Q3 <img src={crossIcon} className={styles.cross} alt='' /> </button>
                <span> <img src={plusIcon} className={styles.plus} alt='' /> </span>
              </span>
              <span className={styles.limit}>Max 5 Questions</span>
            </div>

            <div className={styles.questionTextInput}>
              <input type="text" className={styles.questionText} name="questionText" id="questionText" placeholder={activeType === 'q&a' ? 'Question Here' : 'Poll Question here'} />
            </div>
            <div>
              <span>Options type</span>
              <label>
                <input type="radio" name="optionType" id="optionType" value='Text' />
                Text
              </label>
              <label>
                <input type="radio" name="optionType" id="optionType" value='ImgURL' />
                ImgURL
              </label>
              <label>
                <input type="radio" name="optionType" id="optionType" value='Text&Img' />
                Text & ImgURL
              </label>
            </div>
            <div>
              <div>
                <input type="text" name="optionText" id="optionText" />
                <input type="text" name="optionText" id="optionText" />
                <input type="text" name="optionText" id="optionText" /> <span>Delete Icon</span>
                <input type="text" name="optionText" id="optionText" /> <span>Delete Icon</span>
                <button type='button' >Add Option</button>
              </div>
              <div>
                <span>Timer</span>
                <button type='button'>Off</button>
                <button type='button'>5 seconds</button>
                <button type='button'>10 seconds</button>
              </div>
              <div>
                <button type='button'>Cancel</button>
                <button type='Submit'>Create Quiz</button>
              </div>
            </div>
          </form>
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