const Postschema = require('../models/Post');
const {responsesuccess , responseerror} = require('../common/resType');

async function create(request, response) {
    if (typeof (request.body.title) === 'undefined' || request.body.title === '' || request.body.title === null) {
        response.json(responseerror('Title is required'));
    } else if (typeof (request.body.content) === 'undefined' || request.body.content === '' || request.body.content === null) {
        response.json(responseerror('Content is required'));
    } else {

        const newpost = new Postschema({
            title: request.body.title,
            content: request.body.content,
        })
        newpost.save()
            .then(data => {
                response.json(responsesuccess(data));
            }).catch(error => {
                response.json(error);
            });
    }
}

async function list(request, response) {
    var page = request.query.page;
    var page_limit = 10;
    try {
        const posts_list = await Postschema.find().sort({ date: -1 }).skip((page - 1) * page_limit).limit(page_limit);
        var total_size = await Postschema.count();

        var posts = {};
        posts.list = posts_list;
        posts.size = total_size;
        response.json(responsesuccess(posts))
    } catch (err) {
        response.json({ error: err.message || err.toString() });
    };
}

async function get(request, response) {
    var where_criteria = {};
    where_criteria._id = request.body.post_id;
    try {
        const single_post = await Postschema.findOne(where_criteria);
        response.json(responsesuccess(single_post))
    } catch (err) {
        response.json({ error: err.message || err.toString() });
    };
}

module.exports = {
    create: create,
    list: list,
    get: get
}