<template>
    <container-u center fuse>
        <header>
            <h1>{{title}}</h1>
        </header>
        
        <nav v-if="!isEmpty(menu)">
            <template v-for="item in menu">
                <a :href="item.href" v-if="hasHost(item.href)" :key="item.title">{{item.title}}</a>
                <router-link v-else :key="item.title" :to="item.href||''" :class="[isLinkActive(item.href)?'text-primary':'']">{{item.title}}</router-link>
                <template v-if="item.children" >
                    <template v-for="subitem in item.children">
                        <a class="abc" :href="subitem.href||''" sub-1 :key="subitem.title" v-if="hasHost(subitem.href)">
                            {{subitem.title}}
                        </a> 
                        <router-link v-else sub-1  :key="subitem.title" :to="subitem.href||''" :class="[isLinkActive(subitem.href)?'text-primary':'']">{{subitem.title}}</router-link>  
                    </template>
                </template>
            </template>
        </nav>
        <main>
            <component :is="mddoc">
            </component>
        </main>
    </container-u>
</template>

<script>
// 菜单支持 hash 定位
// 支持顶部菜单
// 编辑器支持 emmet
// --- 第二版 ---
// 编辑器支持在新标签中打开
// 编辑器支持代码收起，和横向打开
import axios from 'axios'
import marked from './marked.js'
import hljs from 'highlight.js'
import path from 'path'
import example from '../sa-example/example.vue'
import 'sailfish-core'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import defaultTo from 'lodash/defaultTo'
import 'highlight.js/styles/github.css'
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value.replace(/\=\&amp;gt;/g, '=>');
    }
});
var renderer = new marked.Renderer();
renderer.table = function(header, body) {
    return `<table default>
        ${header}
        ${body}
    </table>`
}
renderer.example = function(code, lang) {
    var html = extractHTML(code);
    var js = extractJS(code);
    console.log('html', html)
    return `
        <example html="${escape(html)}" js="${escape(js)}" template="${escape(MD.data.demoTemplate)}">
        </example>
    `;
}

function loadMD(url) {
    return axios.get(url).then(function(res) {
        return marked(res.data, {renderer});
        
    })
}
function hasHost(url) {
    return /\:\/\//.test(url);
}
function join(root, url) {
    if(hasHost(url)) return url;
    return path.join(root, defaultTo(url, ''));
}
function extractJS(mdstr) {
    return get(/.?```js\n([^`]*)\n```.*/.exec(mdstr), '[1]', '')
}
function extractHTML(mdstr) {
    return get(/.?```html\n([^`]*)\n```.*/.exec(mdstr), '[1]', '')
}
var MD = {
    prefix: 'sa',
    name: 'md',
    data: {
        title: 'Paper',
        html: '',
        menu: [],
        index: '',
        root: '',
        mddoc: {
            template: '<h1>Empty</h1>'
        },
        demoTemplate: '${html}\n${js}'
    },
    watch: {
          
    },
    created() {
        if(this.$route.path === '/') this.load(join(this.root, this.index));
        else this.load(join(this.root, this.$route.path))
        this.$router.beforeEach((to, from, next)=>{
            this.load(join(this.root, to.path))
            next();
        })
    },
    methods: {
        load(url) {
            loadMD(url).then(html=>{
                this.mddoc = {
                    template: `<section>${html}</section>`,
                    components: {
                        example
                    }
                }
            });
        },
        isLinkActive(url) {
            return join(this.root, this.$route.path) === join(this.root, url);
        },
        hasHost,
        isEmpty
    },
    components: {
        example
    }
}
export default MD;
</script>
<style lang="less">
    .hover-primary:hover {
        color: #55a8fd;
    }
    iframe {
        border: none;
    }
    panel-u[border] {
        border: 1px solid #dbdbdb;
        > header {
            // padding: 5px 15px;
            // height: 30px;
            border-top: none;
            background: #f5f5f5;
        }
    }
</style>
