import MD from './packages/sa-md/md.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import get from 'lodash/get'
import path from 'path'
import Vue from 'vue/dist/vue.esm.js'
window.path = path

function getMeta(name, def){
    return get(document.querySelector(`meta[name=${name}]`), 'content', def);
}
function create(MD) {
    var md = (new Vue(MD)).$mount()
    document.body.appendChild(md.$el);
    return md;
}
function hasHost(url) {
    return /\:\/\//.test(url);
}
function join(root, url) {
    if(hasHost(url)) return url;
    return path.join(root, url);
}
var plugin = {
    install: async function(Vue) {
        Vue.config.ignoredElements = ['container-u', 'panel-u'];
        MD.router = new VueRouter({});
        Vue.use(VueRouter)

        MD.data.root = getMeta('paper-root', path.resolve(location.pathname, '..'));
        
        // 获取菜单配置
        if(window.menu) MD.data.menu = window.menu;
        else {
            var menupath = getMeta('paper-menu', './menu.json');
            MD.data.menu = (await axios.get(join(MD.data.root, menupath))).data    
        }
        
        
        MD.data.index = getMeta('paper-index', get(MD.data.menu, '[0].href', ''));
        // alert(MD.data.index)
        
        // 获取 DEMO 模板
        var templateSrc = getMeta('paper-demo-template', '')
        if(templateSrc) {
            MD.data.demoTemplate = (await axios.get(join(MD.data.root, templateSrc))).data;
        }
        
        // 配置 Paper 标题
        MD.data.title = get(document.querySelector('title'), 'innerText', MD.data.title);
        
        var md = create(MD);
        window.md = md;
        
    }
};

Vue.use(plugin)