<template>
    <div class="relative">
        <span 
            class="hover-primary pointer bold absolute" 
            style="font-size:.7em; right:5px; top: -25px;"
            @click="expanding=!expanding"
        ></></span>
        <panel-u border :style="expanding?{}:transparent">
            <header v-show="expanding">
                DEMO
                <button close @click="expanding=false"></button>
            </header>
            <iframe class="pct-100" ref="iframe" :style="{height: height+'px'}"></iframe>
            <div v-show="false" style="margin: -10px -15px;">
                <slot></slot>
            </div>
            <hr v-show="expanding" class="mb-20">
            <div v-show="expanding" style="margin: -10px -15px;">
                <textarea ref="htmlEditor"></textarea>    
            </div>
            <hr dashed v-show="expanding" class="mv-20">
            <div v-show="expanding" style="margin: -10px -15px;">
                <textarea ref="jsEditor"></textarea>
            </div>
        </panel-u>
    </div>
    
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
import get from 'lodash/get'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/bespin.css'
import codemirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import debounce from 'lodash/debounce'

// 格式化 html 代码
function formate(html) {
    var htmlArr = html.split('\n').slice(1, -1)
    var min = htmlArr.reduce(function(x, item){
        var length = /^( *)/.exec(item)[0].length
        return length < x ? length : x;
    },Infinity);
    var html = htmlArr.map(function (item){
        return item.replace(new RegExp('^'+Array(min).fill(' ').join('')), '')
    }).join('\n');
    return html
}
Array.from(document.querySelectorAll('sa-example')).forEach(item=>{
    var template = item.querySelector('template');
    var script = item.querySelector('script[src]');
    var html = '';
    
    if(template) {
        html = `<textarea data-lang-html>${formate(template.innerHTML)}</textarea>`
    }
    if(script) {
        html += `<textarea data-lang-js>${formate(script.innerHTML)}</textarea>`
    }
    if(!html) return;
    item.innerHTML = html;
})

function initEditor(el, mode) {
    return codemirror.fromTextArea(el, {
        lineNumbers: false,
        styleActiveLine: true,
        matchBrackets: true,
        insertSoftTab: 2,
        readOnly: true,
        mode: mode==='html'?'htmlmixed':'javascript'
    });
}
export default {
    prefix: 'sa',
    name: 'example',
    props: {
        height: {
            default: 200
        },
        html: {
            default: ''
        },
        js: {
            default: ''
        },
        template: {
            default: '${html}\n${js}'
        }
    },
    data() {
        return {
            expanding: false,
            transparent: {
                border: 'none',
                padding: 0
            },
            editing: false,
            htmlEditor: null,
            jsEditor: null,
            readonly: true,
            htmlStr: '',
            jsStr: ''
        }  
    },
    mounted() {
        this.htmlStr = get(this.$el.querySelector('[data-lang-html]'), 'innerText', unescape(this.html))
        this.jsStr = get(this.$el.querySelector('[data-lang-js]'), 'innerText', unescape(this.js))
        this.updateIframe(this.htmlStr, this.jsStr);
        this.$refs.htmlEditor.innerHTML = this.htmlStr;
        this.$refs.jsEditor.innerHTML = this.jsStr;
    },
    watch: {
        async expanding(val) {
            if(val) {
                await this.$nextTick();
                if(this.htmlEditor) return;
                this.initEditor();
                this.editable();
            }
        }
    },
    methods: {
        iframeT(html, js) {
            return unescape(this.template).replace(/\$\{(\w*)\}/g, function($0, $1){
                return $1==='html'?html:`<script>${js}<\/script>`;
            });
        },
        updateIframe(html, js) {
            var global = this.$refs.iframe.contentWindow;
            this.$refs.iframe.addEventListener('load', event=>{
                global.document.write(this.iframeT(html, js));
            }, {
                once: true
            });
            
            global.location.reload();
            
        },
        initEditor(){
            this.htmlEditor = initEditor(this.$refs.htmlEditor, 'html');
            this.jsEditor = initEditor(this.$refs.jsEditor, 'javascript');
            
            this.htmlEditor.on('change', debounce(event=>{
                this.htmlStr = this.htmlEditor.getValue()
                this.updateIframe(this.htmlStr, this.jsStr);
            }, 500))
            
            this.jsEditor.on('change', debounce(event=>{
                this.jsStr = this.jsEditor.getValue()
                this.updateIframe(this.htmlStr, this.jsStr);
            }, 500))
        },
        editable() {
            this.readonly = false;
            
            this.htmlEditor.setOption('readOnly', false);
            this.htmlEditor.setOption('lineNumbers', true);
            
            this.jsEditor.setOption('readOnly', false);
            this.jsEditor.setOption('lineNumbers', true);
        },
        readonlyit() {
            this.readonly = true;
            
            this.htmlEditor.setOption('readOnly', true);
            this.htmlEditor.setOption('lineNumbers', false);
            
            this.jsEditor.setOption('readOnly', true);
            this.jsEditor.setOption('lineNumbers', false);
        }
    }
}
</script>
<style>
.CodeMirror {
    height: auto;
}
</style>
