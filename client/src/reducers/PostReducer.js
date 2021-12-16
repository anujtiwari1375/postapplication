import { POST_LIST, SINGLE_POST } from '../actions/PostAction';

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
        default:
            return state;
    }
}