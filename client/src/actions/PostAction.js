import callApi from '../functions/callApi';
import axios from 'axios';
import { values } from 'lodash';

export const POST_LIST = "POST_LIST";
export const NEW_POST = "NEW_POST";
export const SINGLE_POST = "SINGLE_POST";
export const NEW_COMMENT = "NEW_COMMENT";
export const LIST_COMMENT = "LIST_COMMENT";


// Api to fetch the list of post
export function postList(values, callback) {
    const request = callApi(`list-post`, 'GET', values, callback);
    return { type: POST_LIST, payload: request };
}

// Api to fetch the single post
export function singlePost(values, callback) {
    const request = callApi(`single-post`, 'POST', values, callback);
    return { type: SINGLE_POST, payload: request };
}

// Api to crete new post
export function newPost(values, callback) {
    const request = callApi(`create-post`, 'POST', values, callback);
    return { type: NEW_POST, payload: request };
}

// api to create new comment
export function listComment(values, callback) {
    const request = callApi(`list-comment`, 'POST', values, callback);
    return { type: LIST_COMMENT, payload: request };
}

// api to create new comment
export function newComment(values, callback) {
    const request = callApi(`new-comment`, 'POST', values, callback);
    return { type: NEW_COMMENT, payload: request };
}

