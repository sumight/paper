import MD from './packages/sa-md/md.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import get from 'lodash/get'
import path from 'path'
import Vue from 'vue/dist/vue.esm.js'
window.path = path

function getMeta(name){
    return document.querySelector(`meta[name=${name}]`)
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

        MD.data.root = get(getMeta('srcroot'), 'content', path.resolve(location.pathname, '..'));
        
        // 获取菜单配置
        if(window.menu) MD.data.menu = window.menu;
        else {
            var menupath = get(getMeta('menupath'), 'content' ,'./menu.json');
            MD.data.menu = (await axios.get(join(MD.data.root, menupath))).data    
        }
        
        
        MD.data.index = get(getMeta('indexmd'), 'content', get(MD.data.menu, '[0].href', ''));
        
        // 获取 DEMO 模板
        var templateSrc = get(getMeta('demo-template'), 'content', '')
        if(templateSrc) {
            MD.data.demoTemplate = (await axios.get(join(MD.data.root, templateSrc))).data;
        }
        console.log(MD.data.demoTemplate);
        var md = create(MD);
        window.md = md;
        
    }
};

Vue.use(plugin)