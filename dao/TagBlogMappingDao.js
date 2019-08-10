var dbutil = require("./DBUtil");

function queryBlogByTagCount(tagId, success) {
    var insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogByTag(tagId, page, pageSize, success) {
    var insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    var params = [tagId, page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function insertTagBlogMapping(tagId, blogId, ctiem, utime, success) {
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    var params = [tagId, blogId, ctiem, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.isertTabBlogMapping = insertTagBlogMapping;
module.exports.queryBlogByTag = queryBlogByTag;
module.exports.queryBlogByTagCount = queryBlogByTagCount;
