<template>
  <view :class="[ isToolBar ? 'isTop' : '' ]">
    <topbar :title="data.title" bg="rgba(0,0,0,.8)" :isHide="!isToolBar" :isBack="true">
      <view slot="side">
        <view class="text-white text-lg">
          <text class="cuIcon-moreandroid"></text>
        </view>
      </view>
    </topbar>
    <!-- TODO: bar -->
    <view v-if="false" class="topbar-row padding-sm" :class="[ isDark ? 'bg-one' : 'bg-two']">
      <text class="sm">{{ data.chapter_name }}</text>
    </view>
    <view class="wrap-content"
    @touchstart="readerStart"
    @touchend="readerEnd"
    @tap="tapContent"
    :style="{ 
      paddingTop: isToolBar ? '100upx' : '',
      paddingBottom: isToolBar ? '200upx' : '',
      backgroundColor: isDark ? darkTheme.bg : diy.bg,
      color: isDark ? darkTheme.color : diy.color,
      fontSize: `${fontSize * 1.13636363636}upx`
    }">
      <view class="title padding-top-lg padding-bottom-lg" style="font-size: 140%">
        <text class="text-green padding-right-sm">#</text>
        {{ data.chapter_name }}
      </view>
      <scroll-view class="body">
        <rich-text :nodes="data.body"></rich-text>
      </scroll-view>
      <view class="view-footer text-green line-green">
        已到末尾
      </view>
    </view>
    <view class="status-bar" :class="[ isDark ? 'bg-one' : 'bg-two', isToolBar ? 'active' : '' ]">
      <view class="flex solid-bottom padding-xs justify-between">
        <view class="status-left">
          <text class="power">{{ utilsInfo.power }}</text>
          <text class="date">{{ utilsInfo.date }}</text>
        </view>
        <view class="status-right">共 {{ data.word_length }} 字</view>
      </view>
    </view>
    <view class="diy bg-black light" :class="isSetting ? 'active' : ''">
      <view class="margin-bottom-xs">
        <scroll-view class="shadow-blur" :scroll-with-animation="true" style="white-space: nowrap;background: rgba(57, 181, 74, .9)" scroll-x="true" scroll-left="0">
          <view class="diy-item text-center shadow-blur"
            :class="[ Themes.index == index ? 'active' : '' ]"
            v-for="(item,index) in Themes.all"
            :key="index"
            :style="{ backgroundColor: item.bg, color: item.color }"
            @tap="checkTheme(index)">
            {{ item.title }}
          </view>
        </scroll-view>
        <view class="text-xl margin-top-xs">
          <text class="text-green padding-right-sm margin-left-lg">#</text>
          设置字体大小
        </view>
        <view class="padding-xs">
          <slider min="33" max="88" :value="fontSize" @change="sliderChange" step="5" />
        </view>
      </view>
    </view>
    <view class="bottom-bar cu-bar tabbar bg-black">
      <view @tap="isDark = !isDark" class="action" :class="[ isDark ? 'text-green' : '' ]">
        <view :class="[ isDark ? 'cuIcon-usefullfill' : 'cuIcon-usefull' ]"></view> 夜间
      </view>
      <view @tap="tapLock" class="action" :class="[ isLock ? 'text-green' : '' ]">
        <view :class="[ !isLock ? 'cuIcon-lock' : 'cuIcon-unlock' ]"></view> 锁定
      </view>
      <view class="action" @tap="isSetting = !isSetting" :class="[ isSetting ? 'text-green' : '' ]">
        <view class="cuIcon-font"></view> 设置
      </view>
      <view class="action" @tap="showTree">
        <view class="cuIcon-list"></view> 目录
      </view>
    </view>
    <view class="cu-modal drawer-modal justify-end" 
    @tap="isModal = false" :class="isModal ? 'show' : ''"
    style="z-index: 2333333">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{height:'calc(100vh - ' + 0 + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
						<view class="content">
							<view>Item {{index +1}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
    <!-- error -->
    <view class="error-msg" v-if="isError">
      <view class="text-sl text-pink text-center">
        <view class="margin-lg"> 获取失败, 要不重试一下? </view>
        <button class="cu-btn lg round bg-green shadow">重试</button>
      </view>
    </view>
  </view>
</template>

<script>
import xs from '@/utils/api/books/site/115xs'
import systemInfo from '@/utils/toy/systemInfo'
import dayjs from '@/utils/toy/day'
import motif from '@/utils/config/motif'
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
      isLock: false,
      isSetting: false,
      isModal: false,
      Themes: {},
      diy: {}, // 默认主题
      darkTheme: {
        title: '黑色',
        bg: '#333',
        color: '#fff',
        bgImg: ''
      },
      isError: false,
      fontSize: 50,
      startData: {}
    }
  },
  methods: {
    readerStart(e){
      this.startData.clientX = e.changedTouches[0].clientX;
      this.startData.clientY = e.changedTouches[0].clientY;
    },
    readerEnd(e) {
      /*
      ** 参考链接: https://www.cnblogs.com/gitByLegend/p/11509462.html
      */
      const subX = e.changedTouches[0].clientX - this.startData.clientX;
      const subY = e.changedTouches[0].clientY - this.startData.clientY;

      if( subY > 50 || subY < -50 ) {
        // TODO: 上下滑
      } else {
        if( subX > 100 ) {
          // TODO: 右滑(上一章)
        } else if ( subX < -100 ) {
          // TODO: 左滑(下一章)
        } else{
          // TODO: 无效
        }
      }
    },
    showTree() {
      this.isModal = true
      this.isToolBar = false
      this.isSetting = false
      this.isLock = false
    },
    sliderChange(e) {
      const value = e.detail.value
      this.fontSize = value
      motif.setFontSize(value)
    },
    checkTheme(index) {
      this.isDark = false
      const current = this.Themes.all[index]
      this.diy = current
      this.Themes.index = index
      motif.set(index)
    },
    tapLock() {
      this.isLock = !this.isLock
      if (!this.isLock) this.isToolBar = false
    },
    tapContent() {
     this.isToolBar = this.isLock 
     ? true : !this.isToolBar
     this.isSetting = false
    },
    loadUtils() {
      const os = systemInfo()
      this.utilsInfo = {
        power: os.currentBattery,
        date: dayjs.date().text
      }
    },
    async loadBody(id = '2449577') {
      const data = await book.getBody(id)
      this.data = data
    }
  },
  async onLoad() {
    // #ifdef APP-PLUS
    plus.navigator.setFullscreen(true);
    // #endif
    const Themes = await motif.get()
    this.Themes = Themes
    this.diy = Themes.all[Themes.index]
    this.fontSize = Themes.fontSize
    this.loadBody()
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
  .error-msg,
  .bottom-bar,
  .topbar-row {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2333;
    transition: all .4s;
  }
  .topbar-row {
    top: 0;
    bottom: unset;
    /* height: 40upx; */
  }
  .error-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    height: 100vh;
    background: rgba(0,0,0, .8);
    flex-wrap: wrap;
  }
  .status-bar.active {
    bottom: calc(55px + env(safe-area-inset-bottom) / 2);
  }
  .bg-one {
    background: rgba(11, 11, 11, 0.77);
    color: #fff;
  }
  .bg-two {
    background: rgba(241, 241, 241, 0.79)
  }
  .bottom-bar {
    z-index: 4399;
    opacity: .2;
    transform: translate(0, 250upx)
  }
  .wrap-content {
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
    display: flex;
    flex-direction: column;
    transform: translate(0, 600upx);
    transition: all .4s;
    z-index: 9999;
  }
  .diy.active {
    transform: translate(0, 0)
  }
  .diy-item {
    display: inline-flex;
    width: 120upx;
    height: 120upx;
    margin: 8upx 10upx;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
  }
  .diy-item.active {
    border: 6upx solid #f37b1d;
  }
  /deep/ .body p {
    text-indent: 48upx;
    margin: 12upx 0;
  }
</style>
