import React, { useState, useContext } from 'react'

// Importing formik hook for handling forms and yup for form validation
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'

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
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("Email is Required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is Required"),
    }),
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