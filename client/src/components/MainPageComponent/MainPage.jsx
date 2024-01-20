import React, { useState, useEffect, useContext, useRef } from 'react'

// Importing the css module
import styles from './MainPage.module.css'

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

  // State to apply active class to buttons (inside create Quiz modal )
  const [activeType, setActiveType] = useState('q&a');

  // Function to handle first lvl modal form submission
  const handleFirstSubmit = (e) => {
    const formInputs = new FormData(e.target)
    const payload = Object.fromEntries(formInputs);
    console.log(payload.title);
    console.log(activeType);
  }

  // making a state for showing Create Modal
  const [showModal, setShowModal] = useState(false);

  // UseEffect for opening and closing the model using the html in-built functions
  const dialogRef = useRef();
  useEffect(() => {
    if (showModal) {
      dialogRef.current.showModal(); // method for opening Dialog tag Modal
    }
    else {
      dialogRef.current.close();     // method for closing Dialog tag Modal
    }
  }, [showModal]);

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

        {/* CreateQuiz Modal */}

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
              <span><button className={styles.submissionBtn} onClick={()=>setShowModal(false)}>Cancel</button></span>
              <span><button type='submit' className={`${styles.submissionBtn} ${styles.createActive}`} onClick={()=>setShowModal(false)}>Continue</button></span>
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