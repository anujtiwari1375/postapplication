const mongoose = require('mongoose');

const Commentschema = new mongoose.Schema({
    comment_post_id: {
        type: String,
        required: true
    },
    comment_parent_id: {
        type: String,
        default: ''
    },
    comment_author: {
        type: String,
        required: true
    },
    comment_content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', Commentschema); 