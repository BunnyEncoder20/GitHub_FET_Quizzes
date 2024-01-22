// Importing necessary packages 
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Importing the userModel
const userModelRef = require('../models/user.model')

// Creating a instance of express router
const router = express.Router()


// Route for Login
router.post('/login', async (req, res) => {
    try {
        // console.log("[SERVER]:Login req body received")
        // console.log(req.body)
        const { email, password } = req.body;
        

        // Querying the DB to find the specific user
        const user = await userModelRef.findOne({ email: email })
        // console.log('Record found : \n',user)



        // If user doesn't exist : 
        if (!user) {
            return res.json({
                status: false,
                msg: '[Mongo] Email not found',
            })
        }

        // comparing the password entered and in db : 
        const samePassword = await bcrypt.compare(password, user.password)

        // if the password is not same 
        if (!samePassword) {
            return res.json({
                status: false,
                msg: '[Mongo] Incorrect password',
            })
        }


        // console.log('userId',user._id.toString());
        // Creating the jwt token
        const jwtPayload = {
            userId: user._id.toString(),
            username: user.name,
            userQuizData: user.quizzesMade
        };

        // Signing the JWT with the payload  
        const JWTToken = jwt.sign(jwtPayload, process.env.JWT_PASSWORD, { expiresIn: '1h' })

        console.log(`[Server] ${user.name} logged in`);

        // return the user info : 
        res.json({
            status: true,
            msg: `Welcome back ${user.name} !`,
            token: JWTToken         // to look at the JWT token 
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: '[Server] Something went wrong while logging in ... ',
            error: err
        })
    }
})

module.exports = router;