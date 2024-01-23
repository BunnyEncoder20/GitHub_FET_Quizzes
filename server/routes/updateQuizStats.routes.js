const express = require('express')
const router = express.Router()


const userModelRef = require('../models/user.model')

router.post('/updateQuizStats/:uid/:qid', async (req, res) => {
    const userId = req.params.uid;
    const quizId = req.params.qid;

    const { userAnswers, isPoll } = req.body;

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

        console.log('Someone attempted: ', userDoc.quizzesMade[quiz].title);
        console.log('attempting to update records...')


        // Update the quiz
        if (!isPoll) {
            console.log('q&a quiz sent...')
            userDoc.quizzesMade[quiz].questions.forEach((question, index) => {
                const userAnswered = userAnswers[index];


                if (userAnswered) {

                    question.attempts += 1;
                    if (userAnswered.isCorrect)
                        question.answeredCorrect += 1;
                    else
                        question.answeredIncorrect += 1;
                }
            })
        }
        else {
            try {
                console.log('poll sent...')

                userDoc.quizzesMade[quiz].questions.forEach(async (question, index) => {
                    const userAnswered = userAnswers[index];
                    
                    const selectedOption = question.options.find(option => option._id.toString() === userAnswered._id);
                    if (selectedOption) {
                        console.log('selected option found...');
                        selectedOption.opted += 1;
                    }
                });
            }
            catch (err) { console.log(err); }
        }


        console.log('quiz updated successfully');

        await userDoc.save();

        console.log('should have saved');

        res.status(200).send({ message: '[Mongo] OK' });

    } catch (error) {
        res.status(500).send({ message: `[Mongo] NOPE : ${error}` });
    }
})

module.exports = router;