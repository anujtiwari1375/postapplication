const Commentschema = require('../models/Comments');
const {responsesuccess , responseerror} = require('../common/resType');
async function create(request, response) {
    const newcomment = new Commentschema({
        comment_post_id: request.body.comment_post_id,
        comment_parent_id: request.body.comment_parent_id,
        comment_author: request.body.comment_author,
        comment_content: request.body.comment_content,
    })
    newcomment.save()
        .then(data => {
            response.json(responsesuccess(data));
        }).catch(error => {
            response.json(error);
        });
}

async function list(request, response) {
    var where_criteria = {};
    where_criteria.comment_post_id = request.body.post_id;
    try {
        const user = await Commentschema.find(where_criteria).sort({ date: -1 });
        response.json(user)
    } catch (err) {
        response.json({ error: err.message || err.toString() });
    };
}

module.exports = {
    create: create,
    list: list
}