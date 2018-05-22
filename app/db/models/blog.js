const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getTopics = tags => tags.join(',');
const setTopics = tags => tags.split(',');

const postSchema = new Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  topics: { type: [], get: getTopics, set: setTopics },
}, { timestamps: true });

module.exports = mongoose.model('blog', postSchema);