var blogDetail = new Vue({
    el:"#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {

    },
    created() {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }
        var blogId = -1;
        for (var i = 0; i < searchUrlParams.length; i ++) {
            if (searchUrlParams[i].split("=")[0] == "blogId") {
                try {
                    blogId = parseInt(searchUrlParams[i].split("=")[1])
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?blogId=" + blogId
        }).then( (data) => {
            var result = data.data.data[0];
            this.title = result.title;
            this.ctime = result.ctime;
            this.tags = result.tags;
            this.content = result.content;
            this.views = result.views;

        }).catch( (error) => {
            console.log("请求失败");
        });
    }
});

var sendComment= new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode () {
            return () => {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then( (data) => {
                    this.vcode = data.data.data.data;
                    this.rightCode = data.data.data.text.toLowerCase();
                }).catch( (error) => {
                    console.log("请求失败")
                })
            }
        },
        sendComment () {
            return  () => {
                var code = document.getElementById("comment_code").value.toLowerCase();
                var errorList = [];
                var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                var email = document.getElementById("comment_email").value;
                if (code != this.rightCode) {
                    errorList.push("验证码错误");
                }
                if (!reg.test(email)) {
                    errorList.push("邮箱格式错误");
                }
                if (errorList.length) {
                    alert(errorList);
                    return
                }

                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var blogId = -10;
                for (var i = 0; i < searchUrlParams.length; i ++) {
                    if (searchUrlParams[i].split("=")[0] == "blogId") {
                        try {
                            blogId = parseInt(searchUrlParams[i].split("=")[1])
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }

                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var content = document.getElementById("comment_content").value;

                axios({
                    method: "get",
                    url: "/addComment?blogId=" + blogId + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then( (data) => {
                    alert(data.data.msg);
                    location.reload();
                }).catch( (error) => {
                    console.log("请求失败");
                })
            }
        }
    },
    created() {
       this.changeCode();
    }
});

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply() {
            return (commentId, userName) => {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created() {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var blogId = -10;
        for (var i = 0; i < searchUrlParams.length; i ++) {
            if (searchUrlParams[i].split("=")[0] == "blogId") {
                try {
                    blogId = parseInt(searchUrlParams[i].split("=")[1])
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?blogId=" + blogId
        }).then( (data) => {
            this.comments = data.data.data;
            for (var i = 0; i < this.comments.length; i ++) {
                if (this.comments[i].parent > -1) {
                    this.comments[i].options = "回复@" + this.comments[i].parent_name;
                }
            }
        }).catch( (error) => {
            console.log("请求失败")
        });
        axios({
            method: "get",
            url: "/queryCommentCountByBlogId?blogId=" + blogId
        }).then( (data) => {
            this.total = data.data.data[0].count;
        }).catch((error) => {
            console.log("请求失败")
        });
    }
});