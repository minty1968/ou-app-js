import mongoose from 'mongoose';
import ExamLPIC1 from './lpic1';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: String,
  text: String,
  lpic1: {
    type: Schema.Types.ObjectId,
    ref: 'ExamLPIC1'
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
