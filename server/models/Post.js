const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var findById = function (id, callback) {
    Post.findById(id, callback);
}

var findall = function (id, callback) {
    Post.find();
}

module.exports = mongoose.model('post', Post); 