const express = require('express')
const router = express.Router()

const app = express()


const userModelRef = require('../models/user.model')

router.post('/updateQuiz/:uid/:qid', async (req, res) => {
    const userId = req.params.uid;
    const quizId = req.params.qid;
    const updatedQuiz = req.body;
    console.log('update quiz req for uid: ',userId);
    console.log('update quiz req for qid: ',quizId);
    
    try {
        // Check if the quiz exists
        const userDoc = await userModelRef.findById(userId);
        if (!userDoc) {
            console.log('user not found');
            return res.status(404).send({ message: '[Mongo] User not found' });
        }

        const quiz = userDoc.quizzesMade.findIndex((quiz) => quiz.quizId === quizId);
        if (quiz===-1) {
            console.log('quiz not found');
            return res.status(404).send({ message: '[Mongo] Quiz not found' });
        }

        console.log('quiz found : ',userDoc.quizzesMade[quiz].title);

        // Update the quiz
        userDoc.quizzesMade[quiz] = updatedQuiz;
        
        await userDoc.save();
        

        res.status(200).send({ message: '[Mongo] OK' });

    } catch (error) {
        res.status(500).send({ message: `[Mongo] NOPE : ${error}` });
    }
})

module.exports = router;