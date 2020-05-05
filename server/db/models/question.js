const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: {
		type: String,
		required: true
	},
  asked: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
  answer: {
		type: String,
		required: false
	},
  asker: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
 },
{ timestamps: true}
);

const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };