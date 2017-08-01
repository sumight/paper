# Paper

paper 是一个用来生成 Markdown 文档的前端库，无需 NodeJs 预编译。

## 资源

```html
<link rel="stylesheet" href="//file.40017.cn/publicfront/paper/v0-0-1/paper.css">

<script type="text/javascript" src="//file.40017.cn/publicfront/paper/v0-0-1/paper.js"></script>
```

## 开始使用

paper 的使用非常简单，只需写一个 html 文件就可以搞定

[样例目录](http://git.17usoft.com/bpFrontend/Paper/tree/master/demo)

创建一个文件夹,包含如下文件

- index.html
- menu.json
- foo.md
- bar.md

doc.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>旗鱼核心样式</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//file.40017.cn/publicfront/paper/v0-0-1/paper.css"> 
</head>
<body>
    <script src="//file.40017.cn/publicfront/paper/v0-0-1/paper.js"></script>
</body>
</html>
```

menu.json

```json
[{
    "title": "foo",
    "href": "/foo.md"
},{
    "title": "bar",
    "href": "/bar.md"
}]
```

你将看到如下页面

![Paper](http://file.40017.cn/publicfront/imgs/TIM图片20170801091958.png)

## 使用 DEMO

除了标准的 Markdown 语法以及 [GFM](https://help.github.com/categories/writing-on-github/) 之外，支持扩展语法 DEMO

[查看](https://gist.github.com/sumight/095444380fd459550de7b667f2f2f38b#file-markdown-demo-txt)

使用 DEMO 语法呈现如下：

![demo](http://file.40017.cn/publicfront/imgs/demo.png)

### 指定 DEMO 的模板

通过 meta 配置 demo 的模板

```html
<meta name="paper-demo-template" content="template.html"> 
```

temlate.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    ${html}
    <script src="http://file.40017.cn/publicfront/sailfish/v1-0-7/sailfish.vue.js"></script>
    ${js}
</body>
</html>
```



## 配置

Paper 的主文件是一个 html，我们使用 title 标签和 meta 标签进行 Paper 的配置

### 标题

```html
<head>
    <title>Foo</title>
</head>
```

### 指定菜单配置

```html
<head>
    <meta name="paper-menu" content="menu.json">
</head>
```

### 资源的根路径

```html
<head>
    <meta name="paper-root" content="http://foo.com/">
</head>
```

### 默认页面

```html
<head>
    <meta name="paper-index" content="foo.md">
</head>
```

### DEMO 的模板

```html
<head>
    <meta name="paper-demo-template" content="template.html">
</head>
``` 

## Paper Server

Paper Server 提供了一个在线文档的服务，该服务会在你每次提交代码的时候，自动拉取项目的文档，并且发布，想要使用 Paper 你需要做如下事情

1. 将项目权限设置为 internal

如果您没有权限修改项目的权限，请联系上级

2. 配置 webhooks

将 webhooks 配置为 http://10.100.158.183:8111/webhooks

[配置地址] `http://git.17usoft.com/bpFrontend/[项目名]/settings/integrations`

配置完成之后，点击 test 测试是否成功

3. 访问地址

通过地址访问您的文档 `http://10.100.158.183:8111/[项目名]/[paper的文档地址]`