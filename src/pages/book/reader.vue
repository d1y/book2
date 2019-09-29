<template>
  <view>
    <topbar bg="rgba(0,0,0,.8)" :isBack="true">
      <view slot="side">
        <view class="text-white text-lg">
          <text class="cuIcon-moreandroid"></text>
        </view>
      </view>
    </topbar>
    <view class="content">
      {{ data.body }}
    </view>
    <view class="status-bar">
      <view class="flex solid-bottom padding-xs justify-between">
        <view class="status-left">
          <text class="power">{{ utilsInfo.power }}</text>
          <text class="date">{{ utilsInfo.date }}</text>
        </view>
        <view class="status-right">共 {{ data.word_length }} 字</view>
      </view>
    </view>
    <view class="bottom-bar cu-bar tabbar bg-black">
      <view class="action text-orange">
        <view class="cuIcon-usefull usefullfill"></view> 夜间
      </view>
      <view class="action text-gray">
        <view class="cuIcon-lock unlock"></view> 锁定
      </view>
      <view class="action text-gray">
        <view class="cuIcon-font"></view> 设置
      </view>
      <view class="action text-gray">
        <view class="cuIcon-list"></view>
        目录
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
      time: 1000
    }
  },
  methods: {
    loadUtils() {
      const os = systemInfo()
      this.utilsInfo = {
        power: os.currentBattery,
        date: dayjs.date().text
      }
    }
  },
  async onLoad() {

    // #ifdef APP-PLUS
    plus.navigator.setFullscreen(true);
    // #endi
    const data = await book.getBody()
    this.data = data
    setInterval(()=> {
      this.loadUtils()
    }, this.time)
  }
}
</script>

<style scoped>
  .status-bar,
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2333;
  }
  .status-bar {
    background: #f1f1f1;
  }
  .bottom-bar {
    z-index: 4399;
  }
  .content {
    padding: 10upx 30upx;
    padding-bottom: 100upx;
    line-height: 150%;
    font-size: 40upx;
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
</style>
