import React, { useState, useContext } from 'react'

// Importing axios for RESTful API calls 
import axios from 'axios'

// Importing the css module
import styles from './Dashboard.module.css'

// Importing react toastify module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing the context 
import { UserContext } from '../../context/UserContext';

const Dashboard = () => {
  return (
    <h1>Dashboard Page Here</h1>
  )
}

export default Dashboard