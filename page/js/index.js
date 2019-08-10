const everyday = new Vue({
    el: "#every_day",
    data: {
        content: "dagasgasdgadsg"
    },
    computed: {
        getContent () {
            return this.content
        }
    },
    created() {
        // 请求数据，给content赋值
        axios({
            method: "get",
            url: "/queryEveryday"
        }).then((resp) => {
            this.content = resp.data.data[0].content;
        }).catch((resp) => {
            console.log("请求失败");
        });
    }
});

const articleList = new Vue({
    el: '#article_list',
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
    },
    computed: {
        jumpTo () {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage(page, pageSize) {
            return function (page, pageSize) {

                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0; i < searchUrlParams.length; i ++) {
                    if (searchUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searchUrlParams[i].split("=")[1]
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }

                if (tag == "") {
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then( (data) => {
                        var result = data.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?blogId=" + result[i].id;
                            list.push(temp);
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(function (error) {
                        console.log("请求错误")
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount",
                    }).then( (data) => {
                        this.count = data.data.data[0].count;
                        this.generatePageTool;
                    })
                }else {
                    axios({
                        method: "get",
                        url: "/queryBlogByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then( (data) => {
                        var result = data.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?blogId=" + result[i].id;
                            list.push(temp);
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(function (error) {
                        console.log("请求错误")
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogByTagCount?tag=" + tag,
                    }).then( (data) => {
                        this.count = data.data.data[0].count;
                        this.generatePageTool;
                    })
                }



            }
        },
        generatePageTool () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page:1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text:nowPage,page:nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;

            return result;
        }
    },
    created () {
        this.getPage(this.page, this.pageSize);
    }
})