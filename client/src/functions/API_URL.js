
var apiurl = '';
var protocol = document.location.protocol;
var host = window.location.hostname;
if (host === "localhost") {
    apiurl = 'http://localhost:4000/app';
}
const API_URL = apiurl;
export default API_URL;