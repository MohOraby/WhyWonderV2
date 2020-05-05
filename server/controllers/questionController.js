const _ = require('lodash');

const { User } = require("../db/models/user");
const { Question } = require("../db/models/question");

exports.getAnsweredQuestion = async (req, res) => {
  const user = await User.findOne({ _id: req.params.user })
  const questions = await Question.find({ asked: user, answer: { $ne: null } }).populate({ path: 'asker asked' }).sort({ createdAt: -1 });
  return res.send({ user, questions })
};

exports.getUnansweredQuestion = async (req, res) => {
  const user = req.user;
  const questions = await Question.find({ asked: user, answer: null }).populate({ path: 'asker asked' }).sort({ createdAt: -1 });
  return res.send({ user, questions });
};

exports.askQuestion = async (req, res) => {
  try {
    const body = _.pick(req.body, ['text']);
    const user = await User.findOne({ _id: req.params.user });
    const newQuestion = await Question.create({
      text: body.text,
      asked: user,
      asker: req.user
    });
    return res.send({ newQuestion });
  } catch (err) {
    console.log(err)
  }
};


exports.answerQuestion = async (req, res) => {
  const body = _.pick(req.body, ['answer']);
  const question = await Question.findOne({ _id: req.params.id });
  if (!question.asked.equals(req.user._id)) return res.status(401).send('Unauthorized');
  const updatedQuestion = await Question.updateOne({ _id: question.id }, { $set: { answer: body.answer } });
  return res.send({ updatedQuestion });
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.params.id });
    if (!question.asked.equals(req.user._id)) return res.status(401).send('Unauthorized');
    const deletedQuestion = await Question.deleteOne({ _id: question.id });
    return res.send({ deletedQuestion });
  } catch (err) {
    console.log(err)
  }
};