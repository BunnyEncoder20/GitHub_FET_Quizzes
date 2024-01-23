const mongoose = require('mongoose')
const express = require('express')

const body_parser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')



// Initialize the express app and bringing in the dotenv variables 
const app = express()
dotenv.config()


// Setting up universal middlewares
app.use(body_parser.urlencoded({ extended: false }))  // for parsing the req.body data 
app.use(body_parser.json())                         // for parsing the req.body json data
app.use(cors())                                     // for allowing cross-domain requests


// Starting the Server & connecting to DB
app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log(`[Server] Running at http://localhost:${process.env.PORT}\n[MongoDB] Connected to DB`))
        .catch(err => console.log('[Server] Error occurred while starting the server : \n', err))
})


// Importing routes 
const signupRoute = require('./routes/signup.routes');
const loginRoute = require('./routes/login.routes');
const deleteQuizRoute = require('./routes/deleteQuiz.routes');
const createQuizRoute = require('./routes/createQuiz.routes');
const updateQuizRoute = require('./routes/updateQuiz.routes');

// Quiz Taking Route with EJS
const takeQuizRoute = require('./routes/takeQuiz.routes');
const updateQuizStats = require('./routes/updateQuizStats.routes');

// Quizze API routes 
app.use('/FET', signupRoute);
app.use('/FET', loginRoute);
app.use('/FET', deleteQuizRoute);
app.use('/FET', createQuizRoute);
app.use('/FET', updateQuizRoute);

// Route for Giving Quiz
app.use('/FET', takeQuizRoute);
app.use('/FET', updateQuizStats);