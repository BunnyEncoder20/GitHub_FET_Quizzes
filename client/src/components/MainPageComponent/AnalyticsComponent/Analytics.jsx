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
    toast.info(<>{msg}</>, {
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

  // Function to copy the share link of teh Quiz to clipboard 
  const copyToClipboard = (shareLink) => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        console.log('Link copied to clipboard');
        notify('✅ Link copied to Clipboard');
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

  // Function to delete quiz from db
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





        // notify('✅ Deleted Quiz');   // causing a double render of the toastify message and causing app to crash when placed inside this delQuiz function
      } else {
        console.error('Failed to delete quiz');
        notify('☠️ Failed to Delete the quiz <br/>Server sent back status 500');
      }
      toggleDialog(''); // closing the delPopup

    }
    catch (error) {
      notify(<>☠️ Error while Sending deleting Request to DB<br />error</>);
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
                      <button className={styles.editBtn}> <img src={editImg} alt='edit' /> </button>
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

            {/* Dialog element for the delete popup */}
            <dialog className={styles.delPopup} ref={dialogRef}>
              <div>Are you confirm you want to delete ?</div>
              <span><button className={styles.confirmBtn} onClick={() => delQuiz()}>Confirm Delete</button></span>
              <span><button onClick={() => toggleDialog('')}>Cancel</button></span>
            </dialog>



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
      {
        showAnalysis.state && <Questions quizId={showAnalysis.quiz} />
      }
    </>
  )
}

export default Analytics