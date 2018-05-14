const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

// open connection
mongoose.connect(config.mongoUrl);

const db = mongoose.connection;
db.on('error', (error) => {
  console.log('mongoose error' + error);
});

db.on('open', () => {
  console.log("mongoose connected");
});
