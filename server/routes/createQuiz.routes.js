const express = require('express')
const router = express.Router()

const app = express()
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const userModelRef = require('../models/user.model')

router.post('/createQuiz/:uid', async (req, res) => {
    const userId = req.params.uid;
    const newQuiz = req.body
    
    try {
        // Check if the user exists
        const userDoc = await userModelRef.findById(userId);
        if (!userDoc) {
            console.log('user not found');
            return res.status(404).send({ message: '[Mongo] User not found' });
        }

        // Create the quiz
        userDoc.quizzesMade.push(newQuiz);

        await userDoc.save();

        res.status(200).send({ message: '[Mongo] OK' });
    }
    catch (err) {
        res.status(500).send({ message: err.message});
    }
})

module.exports = router;