const Blog = require('../db/models/blog');

module.exports = (req, res, next) => {
  Blog.findOne({ key: req.params.key })
  	.then(post => res.json(post));
}
