const Topic = require('../db/models/topic');

module.exports.getTopicList = (req, res, next) => {
  Topic.find()
  	.exec()
  	.then(topics => res.json(topics));
}
