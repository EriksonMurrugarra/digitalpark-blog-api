const Blog = require('../db/models/blog');
const Topic = require('../db/models/topic');

const saveTopics = topics => {
  const topicList = topics.split(",");
  for (let tp in topicList) {
    const topic = topicList[tp];
    Topic.findOneAndUpdate({ topic }, { topic }, { upsert: true}, (err, topic) => { });
  }
}

module.exports.createPost = (req, res, next) => {
  const blog = new Blog(req.body);

  blog.author = req.user.email;
  console.log(blog);
  blog.save().then(post => {
    saveTopics(post.topics);
  	res.json(post);
  });
}

module.exports.getPost = (req, res, next) => {
  Blog.findOne({ key: req.params.key })
  	.then(post => res.json(post));
}

module.exports.getPostList = (req, res, next) => {
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

