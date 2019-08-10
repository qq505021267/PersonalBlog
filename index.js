const express = require("express");
const globalConfig = require("./config");
const loader = require("./loader");
const app = new express();

app.use(express.static("./page/"));

app.post("/editEveryday", loader.get("/editEveryday"));
app.get("/queryEveryday", loader.get("/queryEveryday"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));

app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));

app.get("/addComment", loader.get("/addComment"));
app.get("/queryRandomCode", loader.get("/queryRandomCode"));

app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentCountByBlogId", loader.get("/queryCommentCountByBlogId"));

app.get("/queryAllBlog", loader.get("/queryAllBlog"));

app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryNewComments", loader.get("/queryNewComments"));

app.get("/queryBlogByTag", loader.get("/queryBlogByTag"));
app.get("/queryBlogByTagCount", loader.get("/queryBlogByTagCount"));


app.listen(globalConfig.port, () => {
    console.log("服务器已启动")
});