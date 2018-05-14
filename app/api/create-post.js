const Blog = require('../db/models/blog');

module.exports = (req, res, next) => {
  Blog.create(req.body).then(post => {
  	res.json(post);
  });
}
