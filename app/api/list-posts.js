const Blog = require('../db/models/blog');

module.exports = (req, res, next) => {
  Blog.find({})
  	.sort('-createdAt')
  	.exec()
  	.then(posts => res.json(posts));
}
