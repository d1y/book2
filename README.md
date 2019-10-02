<p align="center">
  <img width="40%" src="https://i.loli.net/2019/09/08/Bar8Hzuvj2W7A6d.png">
</p>

<p align="center"> book to simple Simple reader create by <strong>@d1y</strong> </p>

## setup

```console

# 本地`clone`
git clone https://github.com/d1y/book2

# 下载静态资源
chmod u+x startup.sh
./startup.sh

# 安装依赖
yarn

# 热启动服务
yarn serve

# 编译
yarn run build

# 运行测试
yarn test

# Lints and fixes files
yarn lint

```

## 文档

学习文档在: [`doc`](/docs)

### 配置选项

如果你想修改启动图的话,在`/src/utils/config/startup_bg.js`下进行配置😬

阅读器主题 🎟 可以在`/src/utils/config/motif.js`下的修改和添加:

```js
const themes = [
  {
    title: '高冷', // 标题
    bg: '#fff', // 背景颜色
    bgImg: '', // 背景图片
    color: '#333' // 字体颜色
  }
]
```

如果你不喜欢`menubar`的图标的话🦊,你可以自己进行修改,文件在: `/src/utils/config/menu.js`

### 贡献书源

你可以贡献你的书源给这个项目, 具体写法和文档, 请看[这里](./bookSource.md)

## 参考项目

- https://github.com/AoEiuV020/PaNovel
- https://github.com/xiadd/zhuishushenqi
- https://github.com/xifengzhu/holy-reader
- https://github.com/zimplexing/vue-nReader
- https://github.com/badboy-tian/flutter_panovel_app
- 书源地址参考: [gist](https://gist.github.com/d1y/1d13e0e8ea0b37f741dae2489b99e3f5.js)


## Todo

- 怎么让用户去选择接口,我返回一个统一的`api`接口? (2019-09-16 - 2019-10-01)