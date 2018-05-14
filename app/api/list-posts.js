const Blog = require('../db/models/blog');

module.exports = (req, res, next) => {
  Blog.find({})
  	.exec()
  	.then(posts => res.json(posts));
}
