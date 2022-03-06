<template>
  <van-cell :title="name" :label="author + ' - ' + name" center>
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.65rem" @click="playFn" />
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    name: String, // 歌曲名
    author: String, // 歌手
    id: Number, //歌曲id
  },
  data() {
    return {};
  },
  methods: {
    playFn() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id, //歌曲id，通过路由跳转传递过去
        },
      });
    },
  },
};
</script>

<style scoped>
/* 单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
