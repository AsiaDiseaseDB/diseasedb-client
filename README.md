# Disease Database Client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## API

### 登录

```javascript
url: '/loginReq'(post)
request: {
  username: string,
  password: string
}
response: {
  success: bool,
  authority: {  //  若success为false，返回null
    write: bool,
    query: bool,
    modify: bool,
    extract: bool
  },
  err: string  //  登录失败时返回的提示信息（密码错误、用户名不存在...)
}
```

### 检索

```javascript
url: '/query'(post)
request: {
  id: number,  //  若id为null则不用考虑id
  condition: {
    disease: string,    //  如果未指定则设为null
    country: string,    //  如果未指定则设为null
    year: number,       //  如果未指定则设为null
    doubleClick: bool  //  如果未指定则设为null
    //  不会出现四个都为null的情况
  }
}
response: {
  result: [{  //  如果查不到，返回null
    ReportID,
    Reporter,
    Disease,
    Country,
    DocumentCategory,
    Journal,
    Title,
    Authors,
    YearOfPub,
    Volume,
    Issue,
    PageFrom,
    PageTo,
    AuthorContactNeeded,
    OpenAccess,
    Checked,
    Note1                 
  }, {
    ...
  }, {
    ...
  }]
}
```

### 获取完整树状结构

```javascript
url: '/querynext'(post)
request: {
  type: enum('Survey Description', 'Location Information', 'Disease Data', 'Intervention Data')
  id: number  //  type上一级的id
}
response: {   //  格式:没有空格或下划线，首字母大写的CamelCase
  result: [{  //  如果查不到，返回null
    ...
  }]
}
```

### 增添操作

```javascript
url: '/add'(post)
request: {
  type: enum('Survey Description', 'Location Information', 'Disease Data', 'Intervention Data'),
  data: {
    ...
  }
}
response: {
  success: bool,
  err: string  // 错误信息：重复的主键etc; 若成功设为null
}
```

### 删除操作

```javascript
url: '/delete'
request: {  //  递归地删除掉下层所有的表
  type: enum('Survey Description', 'Location Information', 'Disease Data', 'Intervention Data')
  id: number  //  type表的id
}
response: {    //  格式:没有空格或下划线，首字母大写的CamelCase
  success: bool,
  err: string  // 错误信息，若成功设为null
}
```

### 编辑操作

```javascript
url: '/edit'
request: {  //  递归地删除掉下层所有的表
  type: enum('Survey Description', 'Location Information', 'Disease Data', 'Intervention Data'),
  id: number,  //  type表的id
  data: {      //  更新后的数据
    ...
  }
}
response: {
  success: bool,
  err: string  // 错误信息，若成功设为null
}
```
