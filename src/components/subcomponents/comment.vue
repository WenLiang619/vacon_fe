<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />

    <textarea placeholder="请输入BB的内容(最多120字)" maxlength="120"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

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
      comments: []
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
          params: { news_id: this.id }
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
