var express = require("express");
var router = express.Router();
var { User } = require("../db/models/user");
var { Question } = require("../db/models/question");
const questionController = require('../controllers/questionController')
const { authenticate } = require('../middleware/authenticate')

router.get("/list", authenticate, questionController.getUnansweredQuestion);

router.post("/delete/:id", authenticate, questionController.deleteQuestion);

router.get("/:user", authenticate, questionController.getAnsweredQuestion);

router.post("/:user", authenticate, questionController.askQuestion);

router.post("/:user/:id", authenticate, questionController.answerQuestion);

// router.get("/:user/:id", function(req, res){
//   Question.findById(req.params.id, function(err, foundQuestion){
//     if(err){
//       console.log(err)
//     } else {
//       res.render("question", {question: foundQuestion})
//     }
//   });
// });

// router.get("/:user/:id", async function (req, res) {
//   const foundUser = await User.findOne({ username: req.params.user })
//   const foundQuestion = await Question.findById(req.params.id)
//   if (!foundQuestion && !foundQuestion.asked === foundUser.username) {
//     return res.send("go awaaaaay");
//   } return res.render("question", { question: foundQuestion });
// });

// router.post("/:user", function (req, res) {
//   var text = req.body.text;
//   var asked = req.params.user;
//   var asker = req.body.asker || undefined;
//   var answer = undefined;
//   var newQuest = { text: text, asked: asked, asker: asker, answer: answer };
//   question.create(newQuest, function (err, newQuestion) {
//     if (err) {
//       console.log(err)
//       res.redirect("/");
//     } else {
//       res.redirect("/" + req.params.user);
//     }
//   });
// });

// router.get("/:user/:id/answer", checkOwner, function (req, res) {
//   Question.findById(req.params.id, function (err, foundQuestion) {
//     if (!foundQuestion.answer) {
//       res.render("answer", { question: foundQuestion });
//     } else {
//       res.redirect("/")
//     }
//   });
// });



// router.delete("/:user/:id", checkOwner, function (req, res) {
//   Question.findByIdAndRemove(req.params.id, function (err) {
//     if (err) {
//       res.redirect("/" + req.user.username);
//     } else {
//       res.redirect("back");
//     }
//   });
// });

// function checkOwner(req, res, next) {
//   if (req.isAuthenticated()) {
//     User.findOne({ username: req.params.user }, function (err, foundUser) {
//       if (req.user.username === foundUser.username) {
//         next();
//       } else {
//         res.redirect("/");
//       }
//     });
//   } else {
//     res.redirect("/")
//   }
// }

module.exports = router;