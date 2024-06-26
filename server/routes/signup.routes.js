// Importing necessary packages 
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Importing the userModel
const userModelRef = require('../models/user.model')

// Creating a instance of express router
const router = express.Router()


// route for signup 
router.post('/signup', async (req, res) => {
    try {
        console.log("[SERVER]:Signup req body received")
        // console.log(req.body)
        const { name, email, password } = req.body;

        // Querying the DB to check if user already exists
        const user = await userModelRef.findOne({ email: email })
        console.log('duplicate user : ',user)

        // If user does exist : 
        if (user) {
            return res.json({
                status: false,
                msg: '[Mongo] This User already Exists',
            })
        }



        
        let saltRounds = 10                                                  //rounds of encryption
        const encryptedPassword = await bcrypt.hash(password, saltRounds);   
        console.log("[Server] Password encrypted successfully")

        await userModelRef.create({
            name: name,
            email: email,
            password: encryptedPassword
        })
        res.json({
            status: true,
            msg: `Welcome ${name} to Quizze!`
        })

        console.log("[Mongo] User Added successfully")
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            msg: '[Server] Something went wrong while adding user',
            error: err
        })
    }
})

module.exports = router;