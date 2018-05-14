const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  topics: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('blog', postSchema);