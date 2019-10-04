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
    <view v-if="data.body" class="wrap-content"
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
          <view class="diy-item text-center"
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
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{ height:'calc(100vh - ' + 0 + 'px)'} ]">
        <scroll-view :style="[{ height: `${treeHeigth}px` }]" :scroll-top="treeTop" @scroll="scrollTree" :scroll-y="true">
          <view class="margin-sm" v-if="false">
            <!-- TODO: 前面章节可能以后会需要 -->
            <button class="cu-btn bg-green round shadow shadow-lg">
              <text class="text-lg cuIcon-top margin-right-xs"></text>
              前面章节
            </button>
          </view>
          <view id="tree" class="cu-list menu text-left" style="overflow: auto">
            <view class="cu-item arrow" :class="data.id == item.id ? 'active' : ''" @tap="tapChapter(item.id, data.id == item.id)" v-for="(item,index) in Chapters.list" :key="index">
              <view class="content text-bold" style="font-size: 24upx" :class="data.id == item.id ? 'text-green' : ''">
                <view>{{ item.text }}</view>
              </view>
            </view>
          </view>
          <view class="margin-sm" v-if="Chapters.next">
            <button @tap="loadChaptersMore" class="cu-btn bg-green round shadow shadow-lg">
              <text class="text-lg cuIcon-down margin-right-xs"></text>
              加载更多
            </button>
          </view>
        </scroll-view>
			</view>
		</view>
    <!-- error -->
    <view class="error-msg" v-if="isError">
      <view class="text-sl text-pink text-center">
        <view class="margin-lg"> 获取失败, 要不重试一下? </view>
        <button class="cu-btn lg round bg-green shadow">重试</button>
      </view>
    </view>
    <!-- menu-bar -->
		<view style="z-index: 233333" class="cu-modal bottom-modal" :class="isMenu ? 'show' : ''">
			<view class="cu-dialog">
				<view class="padding-xl">
					<button @tap="linkSources" class="cu-btn bg-green">访问原网页</button>
				</view>
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
      isMenu: true,
      Themes: {},
      diy: {}, // 默认主题
      darkTheme: {
        title: '黑色',
        bg: '#222',
        color: '#fff',
        bgImg: ''
      },
      activeIndex: 0,
      isError: false,
      fontSize: 50,
      startData: {},
      treeHeigth: 100,
      treeTop: 0,
      Chapters: {
        prev: false,
        list: [],
        next: false
      },
      currentPage: 1,
      bookID: '', // 书籍`id`
    }
  },
  methods: {
    linkSources() {
      const data = this.data
      // plus.runtime.openURL(this.info.url);
      uni.navigateTo({
        url: `/pages/webview?title=${ data.title }&url=${ data.raw_url }`
      })
    },
    scrollTree(e) {
      const data = e.detail
      this.treeTop = data.scrollTop
      return false
    },
    tapChapter(id, flag) {
      if (flag) return
      this.loadBody(id)
      this.isModal = false
    },
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
      const prev = this.data.prev, next = this.data.next
      const sayMsg = text=> {
        uni.showModal({
          title: '提示',
          content: text,
          showCancel: false,
          confirmText: '我知道了'
        })
      }
      // TODO: 保存 上一章和当前章 访问状态
      if( subY > 50 || subY < -50 ) {
        // TODO: 上下滑
      } else {
        if( subX > 100 ) {
          // TODO: 右滑(上一章)
          if (!prev) {
            sayMsg('没有上一章节了')
            return
          }
          this.loadBody(prev)
        } else if ( subX < -100 ) {
          // TODO: 左滑(下一章)
          if (!next) {
            sayMsg('没有下一章了')
            return
          }
          this.loadBody(next)
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
    async loadBody(id) {
      if (!id) return
      const data = await book.getBody(id)
      this.data = data
      this.bookID = data.chapters_id
      setTimeout(()=> {
        uni.pageScrollTo({
            scrollTop: 0,
            duration: 150
        });
      }, 125)
    },
    async loadChapters(id, page=1) {
      const data = await book.getChapters(id, page)
      const list = this.Chapters.list
      this.Chapters = {
        list: list.concat(data.lists),
        next: data.next
      }
    },
    loadChaptersMore() {
      let page = this.currentPage
      ++page
      this.currentPage = page
      this.loadChapters(this.bookID, page)
    }
  },
  async onLoad({ id = `3224242` }) {
    // TODO: 将章节存入到文件中, 下次打开自动读取
    // #ifdef APP-PLUS
    plus.navigator.setFullscreen(true);
    // #endif
    const Themes = await motif.get()
    this.Themes = Themes
    this.diy = Themes.all[Themes.index]
    this.fontSize = Themes.fontSize
    this.loadBody(id).then(r=> {
      this.loadChapters(this.bookID)
    })
    setInterval(()=> {
      this.loadUtils()
    }, this.time)
    const systemInfo = uni.getSystemInfoSync()
    this.treeHeigth = systemInfo.windowHeight
  }
}
</script>

<style scoped>
  page {
    padding: 0;
  }
  .cu-list.menu>.cu-item.arrow.active:before {
    content: "\E7CF";
    color: #39b54a;
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
    width: 100upx;
    height: 100upx;
    margin: 8upx 10upx;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px 1px rgba(0,0,0,0.5);
  }
  .diy-item.active {
    border: 6upx solid #f37b1d;
  }
  /deep/ .body p {
    text-indent: 48upx;
    margin: 12upx 0;
  }
</style>
