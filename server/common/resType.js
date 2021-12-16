var responseerror = function (err) {
    var err_object = {};
    err_object.status = 'error';
    err_object.message = err;
    return err_object;
}

var responsesuccess = function (data) {
    var succ_object = {};
    succ_object.data = data;
    succ_object.status = 'success';
    return succ_object;
}

module.exports = {
    responseerror: responseerror,
    responsesuccess: responsesuccess
}