const express = require('express');
const router = express.Router()
const commentController = require('../controller/comment');
const postController = require('../controller/post');

// New Post
router.post('/create-post', (request, response) => {
    postController.create(request , response)
})

// New Comment
router.post('/new-comment', (request, response) => {
    commentController.create(request , response)
})

// List Post
router.get('/list-post', async (request, response) => {
    postController.list(request , response)
})

// Single Post
router.post('/single-post', async (request, response) => {
    postController.get(request , response)
})

// List comment
router.post('/list-comment', async (request, response) => {
    commentController.list(request , response)
})


module.exports = router