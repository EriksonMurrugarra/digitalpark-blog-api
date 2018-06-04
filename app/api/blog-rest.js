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
  blog.status = 'TO_APPROVE';
  
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

module.exports.getPostList = async (req, res, next) => {
	const criteria = {};
	const topic = req.query.topic;
	if (topic) {
		criteria.topics = topic ;
  }
  const perPage = 10;
  let { page } = req.query || 1;  

  const count = await Blog.count(criteria);
  const pages = Math.ceil(count/perPage);
  page = parseInt(page) -1;
  Blog.find(criteria)
  .sort('-updatedAt')
  .skip(perPage * page)
  .select('key updatedAt title description topics')
  .limit(perPage)
  .exec()
  .then(posts => res.json({
    posts,
    stats: {
      pages,
      perPage,
      page: page + 1
    }
  }));
}

