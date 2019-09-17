<template>
  <view>
    <view class="cu-bar bg-cyan search">
      <view class="search-form radius">
        <text class="cuIcon-search"></text>
        <input @keydown.enter="fetchSearchBook" v-model.trim="search" type="text" placeholder="搜索小说" confirm-type="search" />
        <view class="input-placeholder">
          <text @click="search = ''" v-if="search.length >= 1" class="cuIcon-close close-color text-white radius"></text>
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
    <view class="cu-bar bg-white solid-bottom">
      <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text>  搜索热词 </view> 
    </view>
    <view class="cu-bar bg-white solid-bottom">
      <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text>  热门搜索 </view> 
    </view>
    <view class="cu-bar bg-white solid-bottom" v-if="historys.length">
      <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text>  搜索历史 </view>
      <view class="action">
        <button class="cu-btn bg-green shadow" @click="clearHistorys">清空历史</button>
      </view>
    </view>
    <view class="cu-list no-border" :class="[ historys.length ? 'grid col-3' : '' ]">
      <view class="cu-item" 
        :class="[item.color]" 
        v-for="(item, index) in historys" 
        :key="item.time" 
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
    <view
    @tap="modalName = ''" 
    class="cu-modal" 
    :class="modalName == 'show' ? 'show' : ''"
    >
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
  nw.searchHotWords().then(r=> {
    console.log(r)
  })
  // nw.hotWords().then(r=> {
  //   console.log(r)
  // })

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
        minText: `没有搜索历史记录`
      }
    },
    onLoad() {
      this.fetchSearchHistorys()
    },
    methods: {
      toText(index) {
        const data = this.historys[index]
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
        const LIMIT = 9
        const old = await this.fetchSearchHistorys(true)
        const len = old.length
        // console.log(`current array: `, old)
        // console.log(`send msg: `, data)
        let isBeing = false
        for (let i=0; i<old.length; i++) {
          const ele = old[i]
          if (ele.text == data.text) {
            isBeing = i+1
            // console.log(`oops, index: ${i}`)
            break
          }
        }
        if (!isBeing) {
          if (len >= LIMIT) {
            old.pop()
          }
        } else { // repeat text
          old.splice(isBeing-1, 1)
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