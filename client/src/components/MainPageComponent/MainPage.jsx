import React, { useState, useContext } from 'react'

// Importing axios for RESTful API calls 
import axios from 'axios'

// Importing the css module
import styles from './MainPage.module.css'

// Importing react toastify module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Importing Components 
import Dashboard from './DashboardComponent/Dashboard';
import Analytics from './AnalyticsComponent/Analytics';
import CreateQuiz from './CreateQuizComponent/CreateQuiz';



const MainPage = () => {

  

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
    </div>
  )
}

export default MainPage