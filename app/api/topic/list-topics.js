const Topic = require('../../db/models/topic');

module.exports = (req, res, next) => {

  Topic.find()
  	.exec()
  	.then(topics => res.json(topics));
}
