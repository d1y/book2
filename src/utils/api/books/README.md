# 书源

这个目录是书源

- `biquge` :: (暂时编码格式为`GBK`暂未解决)
- `zhuishushenqi` :: (获取章节内容失败,接口加密了)
- `115xs` :: (`115`小说)


# 统一接口返回

**预留一个`TODO`, 以后方便做接口管理**

> 搜索热词

**result**

```json
[
  {
    title: String,
    site:  String // 站点
  }
]
```

> 热门搜索

**result**

```json
[
  {
    id: String,
    title: String,
    site: String // 站点
  }
]
```

> 搜索补全

**result**

```json
[
  {
    site:  String, // 站点
    title: String,
  }
]
```

> 搜索

**param**

```json
{
  query: String, // 查询文字
  start: Number, // 分页(0)开始
  limit: Number, // 限制
  site:  String  // 站点
}
```

**result**

```json

{
  total: Number, // 返回搜索总数
  hasMore: Boolean, // 是否还有下一页
  currentPage: Number, // 当前页
  books: [
    author: String, // 作者 
    cover: String, // 封面
    lastChapter: String, // 最后章节(最近章节) 意义不明
    title: String, // 标题
    id: String, // id
    site: String // 站点
  ]
}
```