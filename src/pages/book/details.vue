<template>
  <scroll-view class="diy-bottom-bar">
    <topbar :title="data.title" :isBack="true"></topbar>
    <view>
      <view class="cover_model flex">
        <view class="cover-blur" :style="{ backgroundImage: `url( ${data.cover} )` }"></view>
        <image class="cover radius shadow margin" :src="data.cover" />
        <view class="margin">
          <view class="text-df text-white text-lg">{{ data.title }}</view>
          <view class="margin-top-xs margin-bottom-xs solids line-blue padding-xs radius">{{ data.author }} | {{ data.majorCate }}</view>
          <view class="text-blue">{{ data.wordCount }}</view>
        </view>
      </view>
      <view>
        <view class="cu-bar bg-red ">
          <view class="action">
            <text class="cuIcon-titles text-white"></text>
            <text class="text-xl">简介</text>
          </view>
        </view>
        <view class="grid margin-bottom-sm text-sm text-center col-5">
          <view class="padding-xs" :class="[ item.color ]" v-for="item in data.tags" :key="item.text">
            <view class="solid padding-xs" style="border-radius: 14upx">{{ item.text }}</view>
          </view>
        </view>
        <view class="text-gray text-sm padding-left-sm padding-right-sm">
          {{ data.longIntro }}
        </view>
        <view class="cu-bar bg-green margin-top-sm">
          <view class="action">
            <text class="cuIcon-titles text-white"></text>
            <text class="text-xl">目录(共{{ data.chaptersCount }}章)</text>
          </view>          
        </view>
        <view class="padding-xs text-gray">
          <view class="margin-sm"> <text class="text-orange margin-right-xs">最新章节: </text> {{ data.lastChapter }}</view>
          <button @click="loadChapters" class="cu-btn bg-green">查看章节</button>
        </view>
      </view>
    </view>
    <view class="bottom-bar">
      <view class="grid text-center text-red col-3 radius shadow shadow-lg bg-white">
        <view class="padding-sm">
          <text class="cuIcon-add margin-right-xs"></text>加书架
        </view>
        <view class="padding-sm bg-red text-white cu-btn radius shadow read-btn">
          <text class="cuIcon-read margin-right-xs"></text>
          开始阅读
        </view>
        <view class="padding-sm">
          <text class="cuIcon-forward margin-right-xs"></text>
          原网址
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import topbar from '@/components/topbar'
import api from '@/utils/api/books/site/zhuishushenqi'
import wordUtils from '@/utils/toy/wordFormat'
import randCol from '@/utils/toy/randColors'
const { word } = wordUtils
const nw = new api

export default {
  components: {
    topbar
  },
  data() {
    return {
     data: {},
     Chapters: [],
     bookID: ``,
    }
  },
  onLoad({ id=`548d9c17eb0337ee6df738f5` }) {
    const that = this
    that.bookID = id
    nw.bookInfo(id).then(r=> {
      r.wordCount = word(r.wordCount)
      const result = []
      r.tags.forEach(item=> {
        result.push({
          color: randCol(`text`),
          text: item
        })
      })
      r.tags = result
      that.data = r
    })
  },
  onPageScroll() {
    // TODO: 滚动事件
  },
  methods: {
    loadChapters(flag) {
      const that = this
      uni.navigateTo({
        url: `chapters?id=${ that.bookID }&title=${ that.data.title }`
      })
    }
  }
}
</script>

<style>
  page {
    background: #fff;
  }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .read-btn {
    position: relative;
    top: -12upx;
    transition: all .3s;
  }
  .read-btn.active {
    top: 0;
  }
  .cover_model {
    position: relative;
    width: 100%;
    background: #333;
    /* min-height: 24vh; */
  }
  .cover-blur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    filter: blur(6upx);
    opacity: .2;
  }
  .cover {
    width: 240upx;
    height: 240upx;
  }
</style>