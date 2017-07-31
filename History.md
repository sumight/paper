
v1.1.0 / 2017-07-27
===================


  * Feat(Main) 修改主题风格，默认采用蓝色风格
  * Fixed(Input): 优化滚动条样式，修改下拉框的滚筒条样式，只在chrome中起作用
  * Feat(Select)：单选选中状态，由对勾改为文字高亮 
  * Feat(Pagination)：新样式规范修改，将样式改为分离式 [查看](#Pagination-分页组件)
  * Fixed(Validator): 解决校验组件在新表单的样式问题
  * Fixed(Input): 修复单选情况下的文字呈现换行导致的样式错乱问题，文字不换行，超过部分省略
  * Feat(Menu): 新增Menu组件，替代老的menu组件 [查看](#Menu-菜单组件)
  * Feat(Upload): 新增文件上传组件，替代老的文件上传组件 [查看](#Upload-文件上传)
  * Fixed(Input): 添加防抖动的延迟从 200ms 增加到 500ms

  * Fixed(SForm): upload value 值嵌套的问题
  * Feat(SForm): 添加文件上传等功能
  * Feat(Sform): 添加表格呈现功能
  * Fixed(SForm Control): 添加 id text 支持

v1.0.7 / 2017-07-25
===================

  * Fixed(Toast)： 报错问题 transition
  * Fixed(Modal): IE11中滚动条消失的问题
  * Fixed(Input): 垂直对齐

v1.0.6 / 2017-07-20
===================

  * Fixed(Validate): value trim 将空格当成未填写
  * Fixed(Select): 默认选中第一个功能，防止在鼠标点击的时候触发
  * Feat(TreeSelect): 树选择搜索高亮 
  * Feat(TreeSelect):  添加disable 和 unavailable 功能
  * Feat(Tree-select): 添加 node-key 配置，作用和 Select 的 option-key 相同
  * Fixed(Select): 多选情况下，option-key 失效的问题

v1.0.5 / 2017-07-18
==================

  * Fixed(Select): value-key 容错，当指定了不存在的 value-key 之后，会直接将 option 作为 value
  * Feat(Select): 添加搜索高亮，支持远程搜索

v1.0.4 / 2017-07-17
===================

  * Feat(Input): 添加 pop-top 选项，可以让弹出框优先显示在顶部
  * Fixed(Select): 键盘事件，不能使用回车取消已经选中的选项

v1.0.3 / 2017-07-13
===================


  * Feat(Validator): 进行强制校验之后，focus到校验失败元素的功能
  * Fixed(validator): 去除主题class的限制
  * Feat(Input): 添加 suffix-icon 配置，可以修改后缀的图标
  * Fixed(Popover): 修复 keep-alive 的时候，popover 的无法隐藏的问题
  * Fixed(Modal):　模态窗所在作用域销毁的时候，移除元素和隐藏Modal

v1.0.2 / 2017-07-12
===================

  * Fixed(timepicker): 时间选择下拉框，在火狐下的样式错乱
  * Fixed(Global): 原生下拉框样式覆盖在火狐下不起作用，因为没有覆盖火狐的样式
  * Fixed(Popover): 修复老版本chrome下，鼠标按下时候 hover 事件无效的问题 由于兼容性原因，鼠标按下状态下 mouseenter 无法触发引起
  * Fixed(Editiny): popperjs 版本问题
  * Fixed(Editiny): 删除主题样式
  * Fixed(Toast): 修改默认停留时间为 5s

v1.0.1 / 2017-07-11
===================

  * Fixed(Popover 用于下拉框)：禁止在用户输入过程中改变位置 
  * Fixed(Popover 用于下拉框)：位置翻转根据最大容器进行， 只要容器下面还有空间就不会翻转。
  * Fixed(Select):  重新搜索的时候默认备选项为第一个，如果选项数据为空，清空备选项
  * Fixed: 修复 MENU 在火狐上箭头的位置偏移
  * Fixed: 添加 DOM4 的兼容代码

v1.0.0 / 2017-07-08
===================

  * fixed: 修改 v-model 策略，使用 v-if 控制
  * fixed: 构建工具更新，使用postcss 为样式添加前缀，并且兼容到 ie 10
  * fixed: 为兼容IE，添加 vue.config.ignoreElements
  * fixed: 由于IE不支持 new Event 添加 Polyfill
  * refactor : 修改 getNodeText 为 getText 作为input的接口提供
  * fixed: 去除data的类型限制，可接受promise refactor: 将 getOptionText 方法修改为 getText 作为 input 的接口提供
  * feat: Input key-text 选项 [查看文档](http://10.100.158.183:9323/doc/index.html#自定义输入框)
  * fixed: Input 修复单选无法显示的问题 
  * fixed: Input 去除扩展显示fixed的功能，这个功能有bug
  * fixed: 修复 v-clicko 失效的问题
  * fixed old select 添加白色背景色
  * feat: input scopedSlot 含义修改，现在代表，输入框呈现的内容，传入 data。和之前区别在于，多选情况下，data 为数组，之前 data 为每个被选项的数据

v0.12.40 / 2017-07-08
=====================

  * chore
  * d
  * 修改打包方式
