var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {

    },
    created () {
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then( (data) => {
            for (var i = 0; i < data.data.data.length; i ++) {
                data.data.data[i].link = "/blog_detail.html?blogId=" + data.data.data[i].id;
            }
            this.blogList = data.data.data;
        }).catch( (error) => {
            console.log("请求错误")
        })
    }
});