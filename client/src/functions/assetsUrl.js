function assetsUrl() {
    var api_url = '';
    var host = window.location.hostname;
    if (host === "localhost") {
        api_url = 'http://localhost:3000/';
    }
    return api_url;
}
const ASSETS_URL = assetsUrl();
export default ASSETS_URL;