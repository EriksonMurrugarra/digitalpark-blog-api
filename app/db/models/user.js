const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      validate: [validator.isEmail, 'Invalid Email']
    },
    password: {
      type: String,
      required: true
    },
    name: {
      firstName: String,
      lastName: String
    },
    roles: [{
      type: String
    }]
  }, { timestamps: true }
);
  

userSchema
  .virtual('fullName')
  .get(function () {
    return `${this.name.firstName} ${this.name.lastName}`
  }).set(function (v) {
    this.name.firstName = v.substr(0, v.indexOf(' '))
    this.name.lastName = v.substr(v.indexOf(' ') + 1)
  });

userSchema.pre('save', function (next) {
  const me = this
  if (me.isModified('password') || me.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
    if (err) {
        return next(err)
    }
    bcrypt.hash(me.password, salt, (err, hash) => {
        if (err) {
        return next(err)
        }
        me.password = hash
        next()
    })
    })
  } else {
    return next()
  }
});
  
userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      return callback(err)
    }
    callback(null, match)
  })};

module.exports = mongoose.model('user', userSchema);
