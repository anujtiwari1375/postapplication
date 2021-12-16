import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostReducer from './PostReducer';
import CommentReducer from './CommentReducer';

const rootReducer = combineReducers({
    post: PostReducer,
    comment: CommentReducer,
    form: formReducer,
});

export default rootReducer;