import React, { useState, useEffect, useContext } from 'react'

// Importing axios for RESTful API calls 
import axios from 'axios'

// Importing jwt-decode for decoding the JWT token
import { jwtDecode } from "jwt-decode";

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
import CreateQuiz from './CreateQuizComponent/CreateQuiz';



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
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }

  // for firing toastify messages , I made a useEffect to go off only on the first time loading of this component
  useEffect(() => {
    if (user && user.token) {
      const userInfo = jwtDecode(user.token)
      notify(`Welcome back ${userInfo.username}`)
    }
  }, []);

  // making a state for active page 
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className={styles.mainPage}>
      {/* Side Nav bar */}
      <div className={styles.navbar}>
        <h1>QUIZZIE</h1>
        <ul>
          <li><button className={activePage === 'dashboard' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActivePage('dashboard')}>Dashboard</button></li>
          <li><button className={activePage === 'analytics' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActivePage('analytics')}>Analytics</button></li>
          <li><button className={activePage === 'createQuiz' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActivePage('createQuiz')}>Create Quiz</button></li>
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

        {/* CreateQuiz Component */}
        {
          activePage === 'createQuiz' && <CreateQuiz />
        }
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