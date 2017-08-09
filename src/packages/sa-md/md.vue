<template>
     <container-u :collapsed="collapsed">
        <nav v-if="!isEmpty(menu)">
            <header>
                <h1>{{title}}</h1>
            </header>
            <sa-menu :data="menu"></sa-menu>  
        </nav>
        <main>
            <header>
                <a href="javascript:;" @click="collapsed=!collapsed">
                    <i class="icono-hamburger"></i>
                </a>
            </header>
            <component :is="mddoc" ref="mddoc">
            </component>
             <nav v-if="!isEmpty(submenu)">
                <a v-if="item.level===2" v-for="item in submenu" :href="'#'+item.hash" :key="item.hash">{{item.name}}</a>
                <a v-if="item.level===3" sub-1 v-for="item in submenu" :href="'#'+item.hash" :key="item.hash">{{item.name}}</a>
            </nav>  
        </main>
    </container-u> 
</template>

<script>
import axios from 'axios'
import marked from './marked.js'
import hljs from 'highlight.js'
import path from 'path'
import example from '../sa-example/example.vue'
import 'sailfish-core'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import defaultTo from 'lodash/defaultTo'
import saMenu from '../menu.vue'
import invoke from 'lodash/invoke'
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
        demoTemplate: '${html}\n${js}',
        collapsed: false,
        submenu: null
    },
    watch: {
          
    },
    created() {
        if(this.$route.path === '/') this.load(join(this.root, this.index));
        else this.load(join(this.root, this.$route.path))
        this.$router.beforeEach((to, from, next)=>{
            // console.log()
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
                this.$nextTick(()=>{
                    this.addAnchor(this.$refs.mddoc.$el)
                    this.triggerAnchor(this.$refs.mddoc.$el)
                    setTimeout(()=> {
                        this.submenu = this.genSubmenu(this.$refs.mddoc.$el)    
                    });
                })
            });
        },
        isLinkActive(url) {
            return join(this.root, this.$route.path) === join(this.root, url);
        },
        addAnchor(section) {
            if(!section) return;
            var headings = Array.from(section.querySelectorAll('h1, h2, h3'));
            headings.forEach((heading)=>{
                var headingText = heading.innerText;
                var headingName = headingText.trim().replace(/ /g, '-');
                heading.innerHTML = `${heading.innerHTML}<a href="#${this.$route.path}#${headingName}" id="${this.$route.path}#${headingName}">#</a>`;
            })
        },
        genSubmenu(section) {
            if(!section) return;
            var headings = Array.from(section.querySelectorAll('h1, h2, h3'));
            return headings.map((heading)=>{
                var level = parseInt(heading.tagName.substr(1,1));
                var headingText = heading.innerText.replace(/\#$/, '');
                var headingName = headingText.trim().replace(/ /g, '-');
                var hash = `${this.$route.path}#${headingName}`;
                return {
                    level: level,
                    name: headingName,
                    hash: hash
                }
            })
        },
        triggerAnchor(section) {
            if(!section) return;
            invoke(document.querySelector(`[href="${location.hash}"]`), 'click');
        },
        hasHost,
        isEmpty
    },
    components: {
        example, saMenu
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
    body{
        section h1, section h2, section h3, section h4, section h5, section h6 {
            margin: 1em 0 .75em 0;
        }        
    }
    container-u > main {
        padding-right: 220px;
    }
    section > p > img {
        width: 100%;
    }
    container-u > main > nav {
        width: 220px;
        position: fixed;
        top: 15px;
        right: 0;
        > h1 {
            color: inherit;
        }
        > a {
            display: block;
            color: #666;
            padding: 8px 20px;
            font-size: 14px;
            &:not([href]), &[href="javascript:;"] {
                color: white;
            }
            &:hover {
                color: white;
                text-decoration: none;
            }
        }
        a[sub-1],a[sub-2],a[sub-3] {
            position: relative;
            &::before {
                content: '';
                height: 33px;
                display: block;
                position: absolute;
                width:0;
                left: 25px;
                top: 0;
                border-left: 1px dashed rgba(255, 255, 255, 0.25);
            }
        }
        a[sub-1] {
            padding-left: 20px+20px;
        }
        a[sub-2] {
            padding-left: 20px+15px*2;
        }
        a[sub-3] {
            padding-left: 20px+15px*3;
        }
        > a {
            color: #666;
            &:not([href]), &[href="javascript:;"] {
                color: #666;
                &:hover{
                    color: #666;
                }
            }
            &:hover {
                color: #55a8fd;
                text-decoration: none;
            }
        }
        a[sub-1],a[sub-2],a[sub-3] {
            &::before {
                border-left: 1px dashed rgba(0, 0, 0, 0.25);
            }
        }
    }
    side-menu item-u {
        &, & > header {
            background: white!important;
        }
    }
    side-menu item-u[active] {
        &, & > header {
            color: #55a8fd!important;
        }
    }
    container-u {
        background: white;
    }
    container-u > nav {
        overflow: hidden!important;
        background: white!important;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
        > header {
            color: #333;
            border-bottom: 1px solid #dcdcdc;
        }
    }
    container-u[collapsed] > nav {
        width: 0;
    }
    container-u[collapsed] > main {
        margin-left: 0;
    }
    h1>a:first-child, h2>a:first-child, h3>a:first-child, h4>a:first-child, h5>a:first-child, h6>a:first-child {
        font-size: .9em;
        left: -1.2em;
        padding-right: 5px;
        position: static;
        opacity: 0;
        margin-left: 5px;
    }
</style>
