const radomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor () {         
            return function () {
                const red = Math.round(Math.random() * 255);
                const green = Math.round(Math.random() * 255);
                const blue = Math.round(Math.random() * 255);
                return `rgb(${red}, ${green}, ${blue})`;
            }
           
        },
        randomFontSize () {
            return () => {
                const size = Math.random() * 20 + 12
                return `${size}px`
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then( (data) => {
          var result = [];
          for (var i = 0; i < data.data.data.length; i ++) {
              result.push({text:data.data.data[i].tag, link:"/?tag=" + data.data.data[i].tag});
          }
          this.tags = result;
        }).catch( (error) => {
            console.log("请求错误");
        })
    }
});

const newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    created () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then( data => {
            var result = [];

            for (var i = 0; i < data.data.data.length; i ++) {
                var temp = {};
                temp.title = data.data.data[i].title;
                temp.link = "/blog_detail.html?blogId=" + data.data.data[i].id;
                result.push(temp);
            }
            this.titleList = result;
        }).catch( error => {
            console.log("请求失败")
        });
    }
});

const newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: []
    },
    created() {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then( data => {
            var result = [];

            for (var i = 0; i < data.data.data.length; i ++) {
                var temp = {};
                temp.name = data.data.data[i].user_name;
                temp.date = data.data.data[i].ctime;
                temp.comment = data.data.data[i].comments;
                result.push(temp);
            }
            this.commentList = result;
        }).catch( error => {
            console.log("请求失败")
        });
    }
});

const searchBar = new Vue({
    el: "#search_bar",
    data: {
        value: ""
    },
    computed: {
        search () {
            return () => {
               location.href = "/?value=" + this.value
            }
        }
    }
});

