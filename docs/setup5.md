# 关于跨域

跨域这个玩意,在我接触`web`时曾经遇到过,我在查阅大量资料之后,找到一些好玩的解决方案,故此分享给大家

## 解决思路

在我看来,无外乎有个常见的场景会出现跨域问题,解决方案是根据场景来的, 共分为两种解决模式,如下

### 服务端解决

服务端的知识我接触的不多,只玩过`php`, 原生的`php`直接添加`Access-Control-Allow-Origin: *`

```php
<?php

header("Access-Control-Allow-Origin:*");

?>
```

其他的一些玩法不太懂,后端只要设置了这个就可以解决跨域了问题,但是一般后端为了安全应该是不会添加这个的

### 客户端解决

客户端解决,我觉得这才是我们的核心, 我们需要自己解决这个,并且,有很多方法可以解决

#### 1. 取消浏览器的默认的`CORS`行为

(本方法只针对于`chrome`, 其他浏览器自行发挥想象力)

这是最简单的并且有时也是最有效的方法,只需要在启动添加`--args --disable-web-security --user-data-dir`

```console

open -a Google\ Chrome --args --disable-web-security --user-data-dir

```

在`windows`下,直接右击图标,给运行那里添加后面这几个参数就可以了

#### 2. 将接口地址指向本地

我假设你本地有测试接口, 但是测试后你需要上正式环境的接口(我tm不是在扯淡吗..)

```js

const isDev = process.env.NODE_ENV == 'development'
export default isDev

```

可以使用配置文件来进行配置, 但是我们可以使用本地指向来解决, 我们可以修改本地的`hosts`将域名指向到本地

```

127.0.0.1 dev.io

```

本地测试的时候后端会设置无跨域, 就可以开发了

(除了修改`hosts`,我们也可以使用`青花瓷`或者`鲨鱼`之类的进行拦截请求)

#### 3. 自己搭服务

在服务端解决对于纯前端来说,可能有一点难度,我们可以使用`nodejs`来配合解决跨域问题:

```js

const express = require('express')
const httpMiddle = require('http-proxy-middleware')
const ProxyConfig = {
  target: `https://baidu.com`,
  changeOrigin: true
}
const Port = process.env.NODE_PORT || 3000
const App = express()
const Proxy = httpMiddle(`/api`, ProxyConfig)
// create proxy middle and use
App.use(Proxy)
App.listen(Port, res=> {
  console.log(`listen to http://localhost:${Port}`)
})

```

你可以用`runkit`来试玩一下: https://runkit.com/d1y/5d7b3e804bd7b300144a0a2a

除了`nodejs`, 你还可以使用其他的小玩意来玩, 自由发挥咯!


----