import callApi from '../functions/callApi';

export const NEW_COMMENT = "NEW_COMMENT";
export const LIST_COMMENT = "LIST_COMMENT";


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