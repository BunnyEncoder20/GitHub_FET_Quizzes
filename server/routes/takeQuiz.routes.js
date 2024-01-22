const express = require('express');

// Creating a instance of express router
const router = express.Router();

// Importing the userModel
const userModelRef = require('../models/user.model')

router.get('/quiztime/:uid/:qid', async (req, res) => {
    const userId = req.params.uid
    const quizId = req.params.qid
    

    try {
        // Check if the quiz exists
        const userDoc = await userModelRef.findById(userId);
        if (!userDoc) {
            console.log('user not found');
            return res.status(404).send({ message: '[Mongo] User not found' });
        }

        const quiz = userDoc.quizzesMade.findIndex((quiz) => quiz.quizId === quizId);
        if (quiz === -1) {
            console.log('quiz not found');
            return res.status(404).send({ message: '[Mongo] Quiz not found' });
        }

        // console.log('quiz found : ', userDoc.quizzesMade[quiz].title);

        res.json({
            quiz: userDoc.quizzesMade[quiz]
        })

    } catch (error) {
        res.status(500).send({ message: `[Mongo] NOPE : ${error}` });
    }
})

module.exports = router;