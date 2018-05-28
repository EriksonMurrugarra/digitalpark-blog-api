const Blog = require('../../db/models/blog');

module.exports = (req, res, next) => {
	const criteria = {};
	const topic = req.query.topic;
	if (topic) {
		criteria.topics = topic ;
	}

  Blog.find(criteria)
  	.sort('-createdAt')
  	.exec()
  	.then(posts => res.json(posts));
}
