var path = new Map();
var everydayDao = require("../dao/EverydayDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");

function editEveryday(request, response) {
    request.on("data", function (data) {
        everydayDao.insertEveryday(data.toString().trim(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        });
    })
}

path.set("/editEveryday", editEveryday);

function queryEveryday(request, response) {
    everydayDao.queryEveryday(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryEveryday", queryEveryday);

module.exports.path = path;