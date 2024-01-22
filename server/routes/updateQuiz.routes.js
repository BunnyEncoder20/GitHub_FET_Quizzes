const express = require('express')
const router = express.Router()

const app = express()


const userModelRef = require('../models/user.model')

router.post('/updateQuiz/:uid/:qid', async (req, res) => {
    const userId = req.params.uid;
    const quizId = req.params.qid;
    const updatedQuiz = req.body;
    
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