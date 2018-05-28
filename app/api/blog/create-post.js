const Blog = require('../../db/models/blog');
const Topic = require('../../db/models/topic');

const saveTopics = topics => {
  const topicList = topics.split(",");
  for (let tp in topicList) {
    const topic = topicList[tp];
    Topic.findOneAndUpdate({ topic }, { topic }, { upsert: true}, (err, topic) => { });
  }
}

module.exports = (req, res, next) => {
  Blog.create(req.body).then(post => {
    saveTopics(post.topics);
  	res.json(post);
  });
}
