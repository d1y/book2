export default {
  setSync: (key, data)=> uni.setStorageSync(key, data),
  getSync: key=> uni.getStorageSync(key),
  get(key) {
    return new Promise(rcv=> {
      uni.getStorage({
        key,
        success(res) {
          // TODO: 在某些应用场景中, 会有`0`的存在(2019-10-01)
          // if (res.data) rcv(res.data)
          rcv(res.data)
        },
        fail: err=> {
          const errorMsg = `获取失败`
          console.error(errorMsg)
          rcv(null)
        }
      })
    })
  },
  set(key, data) {
    return new Promise(rcv=> {
      uni.setStorage({
        key,
        data,
        success: rcv(1),
        fail: rcv(0)
      })
    })
  },
  remove(key) {
    return new Promise(rcv=> {
      try {
        uni.removeStorageSync(key)
        rcv(1)
      } catch (e) {
        rcv(0)
      }
    })
  },
  clear() {
    return new Promise(rcv=> {
      try {
        uni.clearStorageSync()
        rcv(1)
      } catch (e) {
        rcv(0)
      }
    })
  }
}