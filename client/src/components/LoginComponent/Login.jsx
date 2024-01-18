import React, { useState, useContext } from 'react'

// Importing formik hook for handling forms 
import { useFormik } from 'formik'

// Importing the css module
import styles from './Login.module.css'

// Importing the context 
import { UserContext } from '../../context/UserContext';

const Login = () => {

  // giving formik initial values for register
  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
    }
  })

  // giving formik initial values
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    }
  })

  // making a state for active form 
  const [activeForm, setActiveForm] = useState('login')

  // making a state for user trying to login
  // will be handled by formik now

  // Importing the user state
  const { user, setUser } = useContext(UserContext)

  // Making a request to the server to fetch user information


  // diagnostics 
  // console.log(formik.values);

  return (
    <div className={styles.box}>
      {/* Login and Registration Page */}

      <div className={styles.rectangle}>
        <div className={styles.heading}>
          QUIZZE
        </div>

        <div className={styles.btn_container}>
          <button className={activeForm === 'signup' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActiveForm('signup')}>Sign up</button>
          <button className={activeForm === 'login' ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.inactive}`} onClick={() => setActiveForm('login')}>Log in</button>
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
                      />
                    </td>
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
                      />
                    </td>
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
                      />
                    </td>
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
                      />
                    </td>
                  </tr>
                  <tr className={styles.submitRow}>
                    <button type="submit" className={styles.submit_btn}>Submit</button>
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
                      />
                    </td>
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
                      />
                    </td>
                  </tr>
                  <tr className={styles.submitRow}>
                    <button type="submit" className={styles.submit_btn}>Submit</button>
                  </tr>

                </tbody>

              </table>
            </form>
          )
        }



      </div>

    </div>
  );
}

export default Login