<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />

    <textarea placeholder="请输入BB的内容(最多120字)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dateFormat}}</div>
        <div class="cmt-body">{{item.content==""?"懒得说":item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      pageIndex: 1,
      comments: [],
      msg: '' //评论输入的内容
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      //获取评论
      this.$http
        .get('api/getcomments?pageindex=' + this.pageIndex, {
          //pageIndex也可以放到params里往后端传递，后端从req.query里取出来
          params: { news_id: this.id } //this.id 从父组件NewsInfo.vue的<comment-box :id="this.id"></comment-box>传递过来的。  props: ['id']
        })
        .then(result => {
          if (result.body.err_code === 0) {
            // this.comments = result.body.data
            // 每当获取新数据后，不要把老数据清空覆盖；而是应该以老数据拼接上新数据
            this.comments = this.comments.concat(result.body.data)
          } else {
            Toast({
              position: 'middle',
              message: '获取评论失败',
              duration: 2000
            })
          }
        })
    },

    getMore() {
      //获取更多
      this.pageIndex++
      this.getComments()
    },

    // 参数1： 请求的URL地址
    // 参数2： 提交给服务器的数据对象
    // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast({
          position: 'middle',
          message: '评论不能位空',
          duration: 2000
        })
      }
      this.$http
        .post(
          'api/postcomment', //this.id 从父组件NewsInfo.vue的<comment-box :id="this.id"></comment-box>传递过来的。  props: ['id']
          { content: this.msg.trim(), news_id: this.id }, //或者用this.$route.params.id
          { emulateJSON: true }
        )
        .then(result => {
          if (result.body.err_code === 0) {
            var cmt = {
              user_name: '匿名用户',
              add_time: Date.now(),
              content: this.msg.trim()
            }
            this.comments.unshift(cmt)
            this.msg = ''
          }
        })
    }
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
