function getNow() {
    return parseInt(Date.now() / 1000);
};

function getDate(ctime) {
    var date = new Date(ctime * 1000);
    return date.toLocaleDateString();
}

module.exports.getNow = getNow;
module.exports.getDate = getDate;