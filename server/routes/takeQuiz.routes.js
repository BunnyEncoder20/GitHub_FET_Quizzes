const express = require('express');

// Creating a instance of express router
const router = express.Router();

// Importing the userModel
const userModelRef = require('../models/user.model')

router.post('/quizTime/:uid/:qid', async (req, res) => {
    const userId = req.params.uid
    const quizId = req.params.qid

    console.log('req for uid:',userId);
    console.log('req for qid:',quizId);
})

module.exports = router;