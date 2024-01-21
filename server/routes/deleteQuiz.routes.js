const express = require('express');

// Creating a instance of express router
const router = express.Router();

// Importing the userModel
const userModelRef = require('../models/user.model')

router.delete('/deleteQuiz/:uid/:qid', async (req, res) => {
    const userId = req.params.uid;
    const delId = req.params.qid;

    try {
        // Check if the quiz exists
        const userDoc = await userModelRef.findById(userId);
        
        
        const quiz = userDoc.quizzesMade.find((quiz) => quiz.quizId === delId);
        
        

        if (!quiz) {
            console.log('quiz not found');
            return res.status(404).send({ message: '[Mongo] Quiz not found' });
        }

        // Delete the quiz
        userDoc.quizzesMade = userDoc.quizzesMade.filter((q) => q.quizId.toString() !== delId);
        
        await userDoc.save();
        

        res.status(200).send({ message: '[Mongo] Quiz deleted successfully' });

    } catch (error) {
        res.status(500).send({ message: `[Mongo] : ${error}` });
    }

});

module.exports = router;

