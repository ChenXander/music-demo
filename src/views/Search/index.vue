<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />
    <!-- 搜索容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
        >
          {{ obj.first }}</span
        >
      </div>
    </div>

    <!-- 搜索结果容器 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="hot_name_wrap">
          <SongItem
            v-for="obj in resultList"
            :name="obj.name"
            :author="obj.ar[0].name"
            :id="obj.id"
          ></SongItem>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "@/api";
import SongItem from "@/components/SongItem.vue";

export default {
  components: {
    SongItem,
  },
  data() {
    return {
      value: "",
      hotArr: [], // 热搜关键词
      resultList: [], //搜索结果
      loading: false, // 加载中（状态）-false触发滑动触底后触发onload方法
      finished: false, // 未加载全部（true则触底后不会触发onload，代表全部加载完成）
      page: 1, //当前搜索结果的页码
      timer: null,
    };
  },
  async created() {
    const res = await hotSearchAPI();
    this.hotArr = res.data.result.hots;
  },
  methods: {
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, // 固定公式
      });
    },

    async fn(val) {
      this.page = 1;
      this.finished = false; // 点击新关键词，可能有新的数据
      this.value = val; //选中的关键词显示到搜索框
      const res = await this.getListFn();
      this.resultList = res.data.result.songs;
      this.loading = false; // 本次数据加载完毕才能让list加载更多
    },

    async inputFn() {
      // 防抖：防止输入变化过快多次调用
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.page = 1; // 点击重新获取第一页数据
        this.finished = false; // 输入框改变，可能有新的更多数据
        // 搜索框值的变化
        if (this.value.length === 0) {
          // 搜索框如果为空，则清空搜索结果阻止发送请求
          this.resultList = [];
          return;
        }
        const res = await this.getListFn();
        if (res.data.result.songs === undefined) {
          //没有数据
          this.resultList = [];
          return;
        } else {
          this.resultList = res.data.result.songs;
        }
        this.loading = false;
      }, 900);
    },

    async onLoad() {
      // 触底事件（加载下一页的数据），会自动将loading改为true
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        //没有"更多"数据
        this.finished = true; //显示没有更多数据
        this.loading = false; // 加载完成
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = true; //数据加载完毕，保证下一次触底
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
