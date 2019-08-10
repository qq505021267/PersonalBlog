var captcha = require("svg-captcha");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var commentDao = require("../dao/CommentDao");
var url = require("url");
var path = new Map();

function queryNewComments(request, response) {
    commentDao.queryNewComments(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryNewComments", queryNewComments);

function queryCommentCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(parseInt(params.blogId), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryCommentCountByBlogId", queryCommentCountByBlogId);

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.blogId), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
}

path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(params.blogId, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

module.exports.path = path;