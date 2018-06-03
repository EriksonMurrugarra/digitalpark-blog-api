const Blog = require('../db/models/blog');
const Topic = require('../db/models/topic');

const saveTopics = topics => {
  const topicList = topics.split(",");
  for (let tp in topicList) {
    const topic = topicList[tp].trim();
    Topic.findOneAndUpdate({ topic }, { topic }, { upsert: true}, (err, topic) => { });
  }
}

module.exports.createPost = (req, res, next) => {
  const blog = new Blog(req.body);

  blog.author = req.user.email;
  
  blog.save().then(post => {
    saveTopics(post.topics);
  	res.json(post);
  });
}

module.exports.getPost = (req, res, next) => {
  Blog.findOne({ key: req.params.key })
    .then(post => res.json(post))
    .catch(err => next(err));
}

module.exports.updatePost = async (req, res, next) => {
  const { key } = req.params;

  Blog.findOneAndUpdate({ key }, req.body, (err, post) => {
    if (err) {
      return next(err);
    }

    res.json(post);
  });
}

module.exports.getPostList = (req, res, next) => {
	const criteria = {};
	const topic = req.query.topic;
	if (topic) {
		criteria.topics = topic ;
	}

  Blog.find(criteria)
  	.sort('-updatedAt')
  	.exec()
  	.then(posts => res.json(posts));
}

