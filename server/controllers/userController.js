const _ = require('lodash');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models/user');

const salt = bcrypt.genSaltSync(10);

exports.register = (req, res) => {
  const body = _.pick(req.body, ['email', 'password', 'name']);
  const userData = {
    email: body.email.toLowerCase(),
    password: bcrypt.hashSync(body.password, salt),
    name: body.name
  };
  const newUser = new User(userData);
  newUser.save()
    .then((user) => {
      const token = user.generateAuthToken();
      return res.header('Authorization', token).send({ user, token: token });
    })
    .catch(err => {
      console.log(err)
      return res.status(400).send(err)
    });
}

exports.login = async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findOne({ email: body.email.toLowerCase() });
    if (user && bcrypt.compareSync(body.password, user.password)) {
      //return user info
      const token = user.generateAuthToken();
      return res.header('Authorization', token).send({ user, token: token });
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    res.send(err)
    return res.redirect('/login');
  }
}

exports.getList = async (req, res) => {
  try {
    const users = await User.find({});
    const user = req.user;
    return res.send({ user, users });
  } catch (err) {
    res.send(err)
    return res.redirect('/login');
  }
}