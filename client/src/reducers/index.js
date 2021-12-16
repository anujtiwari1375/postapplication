import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostReducer from './PostReducer';

const rootReducer = combineReducers({
    post: PostReducer,
    form: formReducer,
});

export default rootReducer;