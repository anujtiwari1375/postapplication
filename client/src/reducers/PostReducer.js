import { POST_LIST, SINGLE_POST, LIST_COMMENT } from '../actions/PostAction';

export default function (state = {}, action) {
    switch (action.type) {
        case POST_LIST:
            var post_list = action.payload;
            return {
                ...state, post_list
            };
        case SINGLE_POST:
            var single_post = action.payload;
            return {
                ...state, single_post
            };
        case LIST_COMMENT:
            var list_comment = action.payload;
            return {
                ...state, list_comment
            };
        default:
            return state;
    }
}