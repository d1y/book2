<template>
  <view :class="[ isToolBar ? 'isTop' : '' ]">
    <topbar :title="data.title" bg="rgba(0,0,0,.8)" :isHide="!isToolBar" :isBack="true">
      <view slot="side">
        <view class="text-white text-lg">
          <text class="cuIcon-moreandroid"></text>
        </view>
      </view>
    </topbar>
    <view class="content"
    :class="[ isDark ? 'bg-black' : '']" @tap="isToolBar = isLock ? true : !isToolBar" 
    :style="{ paddingTop: isToolBar ? '100upx' : '' }">
      <view class="title padding-top-lg padding-bottom-lg" style="font-size: 140%">
        <text class="text-green padding-right-sm">#</text>
        {{ data.chapter_name }}
      </view>
      <view class="body">
        {{ data.body }}
      </view>
      <view class="view-footer text-green line-green">
        已到末尾
      </view>
    </view>
    <view class="status-bar" :class="[ isDark ? 'bg-black' : 'bg-gray' ]">
      <view class="flex solid-bottom padding-xs justify-between">
        <view class="status-left">
          <text class="power">{{ utilsInfo.power }}</text>
          <text class="date">{{ utilsInfo.date }}</text>
        </view>
        <view class="status-right">共 {{ data.word_length }} 字</view>
      </view>
    </view>
    <view class="diy bg-black light">
      <view class="margin-top-xs margin-bottom-xs">
        <scroll-view :scroll-with-animation="true" style="white-space: nowrap" scroll-x="true" scroll-left="0">
          <view class="diy-item text-center" v-for="(item,index) in 8" :key="index"></view>
        </scroll-view>
      </view>
    </view>
    <view class="bottom-bar cu-bar tabbar bg-black">
      <view @tap="isDark = !isDark" class="action" :class="[ isDark ? 'text-green' : '' ]">
        <view :class="[ isDark ? 'cuIcon-usefullfill' : 'cuIcon-usefull' ]"></view> 夜间
      </view>
      <view @tap="isLock = !isLock" class="action" :class="[ isLock ? 'text-green' : '' ]">
        <view :class="[ !isLock ? 'cuIcon-lock' : 'cuIcon-unlock' ]"></view> 锁定
      </view>
      <view class="action">
        <view class="cuIcon-font"></view> 设置
      </view>
      <view class="action">
        <view class="cuIcon-list"></view> 目录
      </view>
    </view>
  </view>
</template>

<script>
import xs from '@/utils/api/books/site/115xs'
import systemInfo from '@/utils/toy/systemInfo'
import dayjs from '@/utils/toy/day'

import topbar from '@/components/topbar'

const book = new xs

export default {
  components: {
    topbar
  },
  data() {
    return {
      data: {},
      utilsInfo: {},
      time: 1000,
      isToolBar: false,
      isDark: false,
      isLock: true
    }
  },
  methods: {
    loadUtils() {
      const os = systemInfo()
      this.utilsInfo = {
        power: os.currentBattery,
        date: dayjs.date().text
      }
    },
    scroll: function(e) {
        console.log(e)
        this.old.scrollTop = e.detail.scrollTop
    },
  },
  async onLoad() {

    // #ifdef APP-PLUS
    plus.navigator.setFullscreen(true);
    // #endif
    const data = await book.getBody()
    this.data = data
    setInterval(()=> {
      this.loadUtils()
    }, this.time)
  }
}
</script>

<style scoped>
  page {
    padding: 0;
  }
  .status-bar,
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2333;
    transition: all .4s;
  }
  /* .status-bar {
    background: #f1f1f1;
  } */
  .bottom-bar {
    z-index: 4399;
    opacity: .2;
    transform: translate(0, 250upx)
  }
  .content {
    padding: 10upx 30upx;
    padding-bottom: 100upx;
    line-height: 150%;
    font-size: 40upx;
    transition: all .5s;
  }
  .power {
    width: 60upx;
    text-align: center;
    display: inline-block;
    border: 2upx solid #aaa;
    padding: 4upx 8upx;
    border-radius: 4upx;
    margin-right: 8upx;
  }
  .isTop .top,
  .isTop .bottom-bar {
    transform: translate(0, 0);
    opacity: 1;
  }
  .view-footer {
    border-top: 1px solid;
    text-align: center;
    margin: 20upx 0;
    padding: 10upx 0;
  }
  .diy {
    position: fixed;
    bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
    left: 0;
    width: 100%;
    min-height: 400upx;
    display: flex;
    flex-direction: column;
  }
  .diy-item {
    display: inline-flex;
    width: 120upx;
    height: 120upx;
    margin: 8upx 10upx;
    border-radius: 50%;
    background: #aaa;
    justify-content: center;
    align-items: center;
  }
</style>
