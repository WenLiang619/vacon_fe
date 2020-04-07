<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击: {{ newsinfo.click }}次</span>
    </p>

    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo() {
      this.$http
        .get('api/getnewsinfo', { params: { news_id: this.id } })
        .then(result => {
          if (result.body.err_code == 0) {
            console.log(result.body)
            this.newsinfo = result.body.data
          } else {
            Toast({
              position: 'middle',
              message: '获取新闻详情失败',
              duration: 2000
            })
          }
        }, console.log('获取新闻详情出错了'))
    }
  },
  components: {
    'comment-box': comment
  }
}
</script>

<style lang="scss" >
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: blue;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
