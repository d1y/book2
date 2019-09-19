<template>
  <view>
    <view class="cu-bar bg-cyan search">
      <view class="search-form radius">
        <text class="cuIcon-search"></text>
        <input @keydown.enter="fetchSearchBook" v-model.trim="search" type="text" placeholder="搜索小说"
          confirm-type="search" />
        <view class="input-placeholder">
          <text @click="search = ''" v-if="search.length >= 1"
            class="cuIcon-close close-color text-white radius"></text>
        </view>
      </view>
      <view class="action">
        <text class="cuIcon-close"></text>
        <text>取消</text>
      </view>
    </view>
    <view class="cu-list menu solid-bottom">
      <view v-if="search.length >= 1" class="cu-item text-center" @click="fetchSearchBook">
        <view class="content text-gray">搜索 "<text class="text-black">{{ search }}</text>"</view>
      </view>
    </view>
    <view v-if="searchHotWords.length">
      <view class="cu-bar bg-white solid-bottom">
        <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text> 搜索热词 </view>
        <view class="action">
          <button class="cu-btn bg-green shadow" v-if="searchHotWordsFlag" @click="nextWords(0)">换一批</button>
        </view>
      </view>
      <view class="cu-list grid col-4 no-border">
        <view class="cu-item text-sm" 
        :class="[ item.color ]" 
        v-for="(item, index) in activeSearchHotWords" 
        :key="item.word"
        @tap="toText(index, 's')">
          {{ item.word }}
        </view>
      </view>
    </view>
    <view v-if="newHotWords.length">
      <view class="cu-bar bg-white solid-bottom">
        <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text> 热门搜索 </view>
        <view class="action">
          <button class="cu-btn bg-green shadow" v-if="newHotWordsFlag" @click="nextWords(1)">换一批</button>
        </view>
      </view>
      <view class="cu-list grid col-4 no-border">
        <view class="cu-item text-sm" 
        :class="[ item.color ]" 
        v-for="(item, index) in activeNewHotWords" 
        :key="item.word"
        @tap="toText(index, 'n')">
          {{ item.word }}
        </view>
      </view>
    </view>
    <view class="cu-bar bg-white solid-bottom" v-if="historys.length">
      <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text> 搜索历史 </view>
      <view class="action">
        <button class="cu-btn bg-green shadow" @click="clearHistorys">清空历史</button>
      </view>
    </view>
    <view class="cu-list no-border" :class="[ historys.length ? 'grid col-3' : '' ]">
      <view class="cu-item" :class="[item.color]" v-for="(item, index) in historys" :key="item.time"
        @tap="toText(index)">
        {{ item.text }}
      </view>
      <view v-if="!historys.length" class="text-gray text-center margin-top-xl">
        <view class="margin-bottom-xs">
          <image class="minImage" mode="aspectFit" :src="minBook"></image>
        </view>
        <text>{{ minText }}</text>
      </view>
    </view>
    <view @tap="modalName = ''" class="cu-modal" :class="modalName == 'show' ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">{{ modalOptions.title }}</view>
          <view class="action" @tap="modalName = ''">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view class="padding-xl">
          {{ modalOptions.body }}
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  /*
   ** 搜索历史的`key`
   */
  const searchKey = `search_historys`

  const randColr = require("@/utils/toy/randColors")
  import books from "@/utils/api/books/site/zhuishushenqi"
  const nw = new books

  export default {
    data() {
      const cp = `https://i.loli.net/2019/09/17/Wyp1fruSeNJqmxt.png`,
        cp1 = `https://i.loli.net/2019/09/17/hRAxCsdcOmrzfBi.png`
      return {
        search: ``,
        historys: [],
        modalName: ``,
        modalOptions: {
          title: `提示`,
          body: ``
        },
        minBook: cp || cp1,
        minText: `没有搜索历史记录`,
        newHotWords: [], // 热门搜索, 有id
        searchHotWords: [],
        newHotWordsFlag: true,
        searchHotWordsFlag: true,
        activeSearchHotWords: [],
        activeNewHotWords: [],
        nextFetch: [
          [0, 4, 4],
          [0, 8, 8]
        ], // 随机截取
        history_len: 9, // 搜索历史长度
      }
    },
    onLoad() {
      // TODO: 用户可自定义设置历史 / 搜索热词 / 热门搜索
      this.fetchSearchHistorys()
      this.toFetchHots('搜索热词', '热门搜索')
    },
    methods: {
      nextWords(flag) {
        /* 
         ** @tips 下一批 
         ** @param <num> - flag (判断是搜索热词还是热门搜索)
         ** 1 是热门搜索(有`id`) - 0 是搜索热词
         ** @return <num>
         */
        const that = this
        function change(mode, len, currentLen) {
          /* mode: <str> 选择的模式( 'acitve' || 'maxlen' || 'run' ) */
          switch (mode) {
            case 'active': // 下一批按钮
              !flag ? that.searchHotWordsFlag = false : that.newHotWordsFlag = false
              break;
            case 'maxlen': // 获取当前最大的长度
              return flag ? that.newHotWords.length : that.searchHotWords.length
              break;
            case 'run': // 设置当前的值
              if (!flag) {
                that.activeSearchHotWords = that.searchHotWords.slice(len, currentLen)
              } else {
                that.activeNewHotWords = that.newHotWords.slice(len, currentLen)
              }
              break;
          }
          return false
        }
        const temp = this.nextFetch[flag]
        const len = temp[1]
        // 获取当前列表的长度
        const max_len = change('maxlen')
        // 拿到相加后的值
        let currentLen = len + temp[2]
        // 判断相加后的值与列表长度
        if (currentLen >= max_len) {
          change('active')
          currentLen = max_len
        }
        this.nextFetch[flag][0] = len
        this.nextFetch[flag][1] = currentLen
        change('run', len, currentLen)
      },
      toFetchHots(...arg) {
        if (!arg.length) return
        const that = this
        const result = []
        const MapColr = arr => arr.map(item => {
          item.color = randColr(`text`)
          return item
        })
        const ArrSlice = (arr, len) => arr.slice(0, len)
        const isCheck = arg[0] == `搜索热词`
        if (arg.length == 1) {
          const ele = arg[0]
          if (isCheck) {
            result.push(nw.searchHotWords())
          } else result.push(nw.hotWords())
        } else if (arg.length >= 2) {
          result.push(nw.searchHotWords())
          result.push(nw.hotWords())
        }
        function append(str, value) {
          const map = MapColr(value)
          if (str == 's') {
            that.searchHotWords = map
          } else that.newHotWords = map
          return map
        }
        Promise.all(result).then(r => {
          const v1 = r[0]
          if (r.length == 2) {
            const v2 = r[1]
            that.activeSearchHotWords = ArrSlice(
              append('s', v1.searchHotWords),
              that.nextFetch[0][2]
            )
            that.activeNewHotWords = ArrSlice(
              append('n', v2.newHotWords),
              that.nextFetch[1][2]
            )
          } else {
            if (isCheck) {
              that.activeSearchHotWords = ArrSlice(
                append('s', v1.searchHotWords),
                that.nextFetch[0][2]
              )
            } else {
              that.activeNewHotWords = ArrSlice(
                append('n', v1.newHotWords),
                that.nextFetch[1][2]
              )
            }
          }
        })
      },
      toText(...indexs) {
        // 点击文字
        // @param <arr> - indexs <判断点击是哪个>
        console.log(indexs)
        return false
        const data = this.historys[index]
        console.log(data)
        return false
        this.search = data.text
        this.setSearchHistorys(data)
      },
      fetchSearchBook(e) {
        const text = this.search
        if (!text || text == '') return
        this.setSearchHistorys({
          text,
          color: randColr(`text`),
          time: Date.now() // create timestamp
        })
      },
      async fetchSearchHistorys(middle) {
        const historys = await this.$storage.get(searchKey) || "[]"
        const obj = JSON.parse(historys)
        if (middle) return obj
        this.historys = obj
      },
      async setSearchHistorys(data) {
        const LIMIT = this.history_len
        const old = await this.fetchSearchHistorys(true)
        const len = old.length
        // console.log(`current array: `, old)
        // console.log(`send msg: `, data)
        let isBeing = false
        for (let i = 0; i < old.length; i++) {
          const ele = old[i]
          if (ele.text == data.text) {
            isBeing = i + 1
            // console.log(`oops, index: ${i}`)
            break
          }
        }
        if (!isBeing) {
          if (len >= LIMIT) {
            old.pop()
          }
        } else { // repeat text
          old.splice(isBeing - 1, 1)
        }
        old.unshift(data)
        const flag = await this.$storage.set(searchKey, JSON.stringify(old))
        if (flag) this.historys = old
      },
      async clearHistorys() {
        const cleared = await this.$storage.remove(searchKey)
        if (cleared) {
          this.modalOptions.title = '🌻 提示 🌻'
          this.modalOptions.body = '已清理搜索历史🤣'
          this.historys = []
        } else {
          console.error('为空或者异常: ', cleared)
        }
        return cleared
      }
    }
  }
</script>

<style>
  .close-color {
    color: #c8c0c0
  }

  .minImage {
    max-width: 180upx;
    max-height: 180upx;
    border-radius: 80%;
    opacity: .5;
  }
</style>