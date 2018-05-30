const express = require('express');
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')({
  permissionsProperty: 'roles'
});
const asyncify = require('express-asyncify');
const config = require('../config');

const postRest = require('./blog-rest');
const topicRest = require('./topic-rest');
const authRest = require('./auth-rest');

const api = asyncify(new express.Router());

api.route('/posts')
  .get(postRest.getPostList)
  .post(
    auth({secret: config.authSecret}),
    guard.check('writer'),
    postRest.createPost
  );

api.route('/posts/:key')
  .get(postRest.getPost);

api.route('/topics')
  .get(topicRest.getTopicList);

api.route('/auth/register')
  .post(authRest.createUser);

api.route('/auth/login')
  .post(authRest.loginUser);

api.route('/auth/me')
  .post(
    auth({secret: config.authSecret}),
    authRest.getPrincipal
  );

module.exports = api;
