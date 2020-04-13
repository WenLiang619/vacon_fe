<template>
  <div>
    <mt-swipe :auto="3000">
      <!-- 父组件向子组件传递的数据必须是名字为lunbotuList -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" :class="{'full': isfull}" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
  props: ['lunbotuList', 'isfull'] // 父组件向子组件传递的数据必须是名字为lunbotuList
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 300px; // 控制轮播图高度

  .mint-swipe-item {
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: cyan;
    // }
    text-align: center;

    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full {
  width: 100%;
}
</style>
