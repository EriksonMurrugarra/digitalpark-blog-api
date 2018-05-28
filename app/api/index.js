const express = require('express');
const jwt = require('express-jwt');
const config = require('../config');
// apis
const listPosts = require('./blog/list-posts');
const createPost = require('./blog/create-post');
const getPost = require('./blog/get-post');
const listTopics = require('./topic/list-topics');

const router = new express.Router();

router.get('/v1/posts', listPosts);
router.post('/v1/posts', createPost);
router.get('/v1/posts/:key', getPost);

router.get('/v1/topics', listTopics);

module.exports = router;