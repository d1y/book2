<template>
  <view>
    <topbar :title="title" :isBack="true"></topbar>
    <view class="cu-list menu">
      <view v-for="(item,index) in Chapters" :key="index" class="cu-item arrow">
        <view class="content">{{ item.title }}</view>
        <view class="action"></view>
      </view>
      <view v-if="!Chapters.length" style="margin-top: 50%" class="flex solid-bottom padding justify-center text-gray">
        章节不存在或者未加载完成
      </view>
    </view>
  </view>
</template>

<script>
import topbar from '@/components/topbar'
import api from '@/utils/api/books/site/zhuishushenqi'
const nw = new api
export default {
  components: {
    topbar
  },
  data() {
    return {
      Chapters: [],
      bookID: ``,
      title: '加载中'
    }
  },
  onLoad({ id = `548d9c17eb0337ee6df738f5`, title }) {
    const that = this
    that.bookID = id
    that.title = title
    nw.getChapters(id)
      .then(r=> {
        that.Chapters = r.chapters
        that.loadChaptersFlag = true
      })
  },
  methods: {
    goto() {

    }
  }
}
</script>

<style lang="css" scoped>

</style>