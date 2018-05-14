const express = require('express');
const router = new express.Router();
// apis
const listPosts = require('./list-posts');
const createPost = require('./create-post');

router.get('/v1/posts', listPosts);
router.post('/v1/posts', createPost);

module.exports = router;