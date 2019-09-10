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
      <view class="margin-left-sm action"><text class="cuIcon-title text-orange"></text>  搜索历史</view>
      <view class="action">
        <button class="cu-btn bg-green shadow">清空历史</button>
      </view>
    </view>
    <view class="cu-list grid col-3 no-border">
      <view class="cu-item" 
        :class="[item.color]" 
        v-for="item in historys" 
        :key="item.text" 
        @tap="toText(item.text)">
        {{ item.text }}
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

  export default {
    data() {
      return {
        search: ``,
        historys: []
      }
    },
    onLoad() {
      this.fetchSearchHistorys()
    },
    methods: {
      toText(e) {
        console.log(e)
      },
      fetchSearchBook(e) {
        const text = this.search
        if (!text || text == '') return
        console.log(`search to: `, text)
        this.setSearchHistorys({
          text,
          color: randColr(`text`)
        })
      },
      async fetchSearchHistorys(middle) {
        const historys = await this.$storage.get(searchKey) || "[]"
        const obj = JSON.parse(historys)
        if (middle) return obj
        this.historys = obj
      },
      async setSearchHistorys(data) {
        const old = await this.fetchSearchHistorys(true)
        console.log(`current array: `, old)
        console.log(`send msg: `, data)
        let isBeing = false
        for (let i=0; i<old.length; i++) {
          const ele = old[i]
          if (ele.text == data.text) {
            isBeing = i
            console.log(i)
            break
          }
        }
        console.log(isBeing)
        // isBeing ? old.splice(isBeing, 1) : old.pop()
        // const nw = old.unshift(data)
        // const flag = await this.$storage.set(searchKey, JSON.stringify(nw))
        // if (flag) this.historys = nw
      },
      async clearHistorys() {
        const cleared = await this.$storage.remove(searchKey)
        return cleared
      }
    }
  }
</script>

<style>
  .close-color {
    color: #c8c0c0
  }
</style>