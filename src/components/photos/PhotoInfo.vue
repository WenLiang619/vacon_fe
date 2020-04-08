<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{ photoinfo.add_time | dateFormat }}</span>
      <span>点击: {{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content">{{ photoinfo.content }}</div>

    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到得 图片id
      photoinfo: {}, //图片详情
      slide1: [
        //模拟缩略图，本应该从服务器获取
        {
          src:
            'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc:
            'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src:
            'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc:
            'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 600,
          h: 400
        }
      ]
    }
  },
  created() {
    this.getPhotoInfo()
  },
  methods: {
    getPhotoInfo() {
      //获取图片的详情
      this.$http
        .get('api/getimageinfo/', { params: { photo_id: this.id } })
        .then(reslult => {
          if (reslult.body.err_code == 0) {
            this.photoinfo = reslult.body.data[0]
          }
        })
    }
  },
  components: {
    //注册评论子组件
    'cmt-box': comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: red;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 25px #999;
    }
  }
}
</style>
