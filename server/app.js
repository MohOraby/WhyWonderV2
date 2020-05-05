require('./config/config')
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const methodoverride = require("method-override");
const cors = require("cors");

require('./db/mongoose');

const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/questions");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodoverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("express-session")({
  secret: "IVSA",
  resave: false,
  saveUninitialized: false
}));
app.use(cors());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const biasApiRoute = "/api/v1/";

const generateApiRoute = (route) => `${biasApiRoute}${route}`;

app.use(generateApiRoute('user'), userRoutes);
app.use(generateApiRoute('question'), questionRoutes);

app.get("/", function (req, res) {
  if (req.user) {
    res.redirect("/" + req.user.username);
  } else {
    res.render("home");
  }
})

const port = process.env.PORT;
const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// app.get("/*", function (req, res) {
//   res.send("Goooo away");
// });

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server is up on port ${port} in a (${env}) environment`);
});