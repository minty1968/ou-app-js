import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let LPIC1Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  qNum: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  message: String,
  imageFile: {
    type: String,
    required: true
  },
  imgLocation: String,
  answer1: {
    type: String,
    required: true
  },
  answer2: String,
  answer3: String,
  answer4: String,
  answer5: String,
  correct: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('LPIC1', LPIC1Schema);
