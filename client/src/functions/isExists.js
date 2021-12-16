/**
 * Check the value exist or not
 * @param {*} value 
 */
export default function isExists(value) {
    if (typeof value !== 'undefined' && value !== null && value !== '') {
        return value;
    }
    return false;
}