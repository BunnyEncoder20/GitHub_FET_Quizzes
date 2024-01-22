import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

// Importing jwt-decode for decoding the JWT token
import { jwtDecode } from "jwt-decode";

// Importing formik hook for handling forms and yup for form validation
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Importing axios for RESTful API calls 
import axios from 'axios'

// Importing the css module
import styles from './Login.module.css'

// Importing react toastify module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Importing the context 
import { UserContext } from '../../context/UserContext';



// Actual Component starting from here
const Login = () => {

  // Importing navigate 
  const navigate = useNavigate();

  // React Toastify, for registration
  const registerNotify = (success, data) => {
    if (success) {
      toast.success(<>✅ User registered Successfully!<br />🥳 {data.msg}</>, {
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
    else {
      toast.error(<>☠️ There was an error <br />👉 {data.msg}</>, {
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
  }

  // React Toastify, for login 
  const loginNotify = (success, data) => {
    if (success) {
      toast.success(<>✅ User logged in Successfully!<br />😇 {data.msg}</>, {
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
    else {
      toast.error(<>☠️ There was an error <br />👉 {data.msg}</>, {
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
  }

  // Importing the user state from Context
  const { user, setUser } = useContext(UserContext)

  // Formik for signup form
  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "must be less than 15 characters")
        .required("Name is Required"),

      email: Yup.string()
        .email("Invalid Email")
        .required("Email is Required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is Required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')   // ref the password field and should be the same
        .required('Re-enter Password here'),

    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      axios
        .post('http://localhost:4000/FET/signup', values)
        .then((res) => {
          console.log("User sent Successfully !")

          // clearing the form (if needed): 
          resetForm();

          if (res.data.status) {
            registerNotify(true, res.data)    // calling function for toastify
            setActiveForm('login');           // redirecting to login form
          }
          else {
            registerNotify(false, res.data)
          }
        }
        )
        .catch((err) => console.log("[Axios@signup Error] : ", err))


    }
  })

  // Formik for login form
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("Email is Required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      axios
        .post('http://localhost:4000/FET/login', values)
        .then((res) => {
          // clearing the form (if needed): 
          // resetForm()

          if (res.data.status) {
            loginNotify(true, res.data)    // calling function for successful login

            

            // setting user context
            setUser({
              ...user,
              token: res.data.token,
              username: jwtDecode(res.data.token).username,
              userQuizData: jwtDecode(res.data.token).userQuizData
            });


            // Navigate to dashboard after successful login
            navigate('/mainpage');
          }
          else {
            loginNotify(false, res.data)   // couldn't login
          }

          // clearing the form 
          resetForm();

        })
        .catch((err) => console.log("[Axios@signup Error] : ", err))
    }
  })

  // making a state for active form 
  const [activeForm, setActiveForm] = useState('login')


  // diagnostics 
  // console.log(formik.values);

  return (
    <div className={styles.box}>
      {/* Login and Registration Page */}

      <div className={styles.rectangle}>
        <div className={styles.heading}>
          QUIZZIE
        </div>

        <div className={styles.btn_container}>
          <button className={activeForm === 'signup' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActiveForm('signup')}>Sign up</button>
          <button className={activeForm === 'login' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActiveForm('login')}>Log In</button>
        </div>

        {
          activeForm === 'signup' && (

            <form onSubmit={registerFormik.handleSubmit}>
              <table className={styles.signupForm}>
                <tbody className={styles.container}>
                  <tr className={styles.row}>
                    <td className={styles.col}>
                      <label className={styles.labels}>Name</label>
                    </td>
                    <td className={styles.col}>
                      <input className={styles.inputs}
                        type='text'
                        id='name'
                        value={registerFormik.values.name}
                        onInput={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                      />
                    </td>
                    {registerFormik.touched.name && registerFormik.errors.name ? <td className={styles.errorLabels}>{registerFormik.errors.name}</td> : null}
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.col}>
                      <label className={styles.labels}>Email</label>
                    </td>
                    <td className={styles.col}>
                      <input className={styles.inputs}
                        type='text'
                        id='email'
                        value={registerFormik.values.email}
                        onInput={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                      />
                    </td>
                    {registerFormik.touched.email && registerFormik.errors.email ? <td className={styles.errorLabels}>{registerFormik.errors.email}</td> : null}
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.col}>
                      <label className={styles.labels}>Password</label>
                    </td>
                    <td className={styles.col}>
                      <input className={styles.inputs}
                        type='password'
                        id='password'
                        value={registerFormik.values.password}
                        onInput={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                      />
                    </td>
                    {registerFormik.touched.password && registerFormik.errors.password ? <td className={styles.errorLabels}>{registerFormik.errors.password}</td> : null}
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.col}>
                      <label className={styles.labels}>Confirm Password</label>
                    </td>
                    <td className={styles.col}>
                      <input className={styles.inputs}
                        type='password'
                        id='confirmPassword'
                        value={registerFormik.values.confirmPassword}
                        onInput={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                      />
                    </td>
                    {registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword ? <td className={styles.errorLabels}>{registerFormik.errors.confirmPassword}</td> : null}
                  </tr>
                  <tr className={styles.submitRow}>
                    <button type="submit" className={styles.submit_btn}>Sign-Up</button>
                  </tr>
                </tbody>
              </table>
            </form>
          )
        }

        {
          activeForm === 'login' && (
            <form onSubmit={loginFormik.handleSubmit} className={styles.container}>
              <table className={styles.signupForm}>

                <tbody className={styles.container}>

                  <tr className={styles.row}>
                    <td className={styles.col}>
                      <label className={styles.labels}>Email</label>
                    </td>
                    <td className={styles.col}>
                      <input className={styles.inputs}
                        type='email'
                        id='email'
                        value={loginFormik.values.email}
                        onInput={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                      />
                    </td>
                    {loginFormik.touched.email && loginFormik.errors.email ? <td className={styles.errorLabels}>{loginFormik.errors.email}</td> : null}
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.col}>
                      <label className={styles.labels}>Password</label>
                    </td>
                    <td className={styles.col}>
                      <input className={styles.inputs}
                        type='password'
                        id='password'
                        value={loginFormik.values.password}
                        onInput={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                      />
                    </td>
                    {loginFormik.touched.password && loginFormik.errors.password ? <td className={styles.errorLabels}>{loginFormik.errors.password}</td> : null}
                  </tr>
                  <tr className={styles.submitRow}>
                    <button type="submit" className={styles.submit_btn}>Log In</button>
                  </tr>

                </tbody>

              </table>
            </form>
          )
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
  );
}

export default Login