import axios from 'axios';
import API_URL from '../functions/API_URL';

/**
 * Request ajax request to api action
 * @param {api url} url
 * @param {api method, eg: GET, POST, PUT} method
 * @param {api data, if need send to api} data
 * @param {callback function, if need to do any action after api response} callback
 */
export default async function callApi(url, method, data = {}, callback = null) {
    const request = await axios({
        method: method,
        url: `${API_URL}/${url}`,
        // withCredentials: true,
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: data,
        params: method === 'GET' ? data : ''
    }).then(function (res) {
        return res.data;
    }).then(res => {
        if (callback !== null) {
            callback(res);
        }
        return res;
    }).catch(async function (error) {
        if (typeof error.response !== 'undefined' && error.response.status === 403) {
            console.log("403 occurs");

            const request = await axios({
                method: method,
                url: `${API_URL}/${url}`,
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: data
            }).then(function (res) {
                return res.data;
            }).then(res => {
                if (callback !== null) {
                    callback(res);
                }
                return res;
            }).catch(function (error) {
                if (callback !== null) {
                    callback(error.response.data);
                }
            });
            return request;

        }
        if (callback !== null) {
            callback(error.response);
        }
        return error.response;
    });
    return request;
}