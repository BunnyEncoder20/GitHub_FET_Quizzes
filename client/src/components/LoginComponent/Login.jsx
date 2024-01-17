import React,{ useContext } from 'react'

// Importing the css module
import styles from './Login.module.css'

// Importing the context 
import { userContext } from '../../context/userContext';

const Login = () => {
  
  // Importing the user state
  const { user, setUser } = useContext(userContext)

  // Making a request to the server to fetch user information


  return (
    <>
      <h1>Login Page</h1>
      <span>User</span>
    </>
  );
}

export default Login