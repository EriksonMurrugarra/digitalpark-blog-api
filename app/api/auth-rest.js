const User = require('../db/models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = user => {
  const payload = { 
    email: user.email
  };

  const token = jwt.sign(payload, config.authSecret, { expiresIn: '6h' });

  return {
    accessToken: token,
    fullName: user.fullName,
    email: user.email
  };
}

const comparePassword = async (user, password) => {
  return new Promise(resolve => {
    user.comparePassword(password, async (err, match) => {
      resolve(!err && match)
    })
  })
}


module.exports.createUser = (req, res, next) => {
  User
    .create(req.body)
    .then(user => {
      const token = generateToken(user);
      res.json(token);
    })
    .catch(err => next(err));
}

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user) {
    const match = await comparePassword(user, password);

    if (match) {
      const token = generateToken(user);
      return res.json(token);
    }
  }

  next(new Error('Authentication Failed'));
}


module.exports.getPrincipal = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email }).exec();

  if (user) {
    return res.json({
      fullName: user.fullName,
      name: user.name,
      email: user.email
    });
  }

  next(new Error('Retrieve Principal Failed'));
}
