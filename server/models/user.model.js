const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  optionText: String,
  optionImg: String,
  isCorrect: Boolean,
  opted: Number
});

const QuestionSchema = new Schema({
  qid: String,
  questionText: String,
  optionsType: String,
  isTimed: Number,
  options: [OptionSchema],
  attempts: String,
  answeredCorrect: String,
  answeredIncorrect: String
});

const QuizSchema = new Schema({
  quizId: String,
  impressions: String,
  shareLink: String,
  title: String,
  createdOn: String,
  quizType: String,
  questions: [QuestionSchema]
});

const UserSchema = new Schema({
    name: {
        type: String,
        required:true,
        trim:true       // for removing white spaces if any
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,  
        trim:true
    },
    quizzesMade: [QuizSchema]
});

module.exports = mongoose.model('QuizzeUsers', UserSchema);