import { LIST_COMMENT } from '../actions/CommentAction';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_COMMENT:
            var list_comment = action.payload;
            return {
                ...state, list_comment
            };
        default:
            return state;
    }
}