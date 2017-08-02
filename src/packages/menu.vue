<script>
    import isArray from 'lodash/isArray'
    import isEmpty from 'lodash/isEmpty'
    import without from 'ramda/src/without'
    // TODO watch data
    // TODO 自定义内容
    // TODO 事件
    export default {
        name: 'menu',
        prefix: 'sa',
        props: {
            collapsed: {
                type: Boolean,
                default: false
            },
            data: {
                default() {
                    return []
                }
            },
            // path, hash, click
            activateBy: {
                type: String,
                default: 'hash'
            },
            manual: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            data() {
                this.current = null;
                this.openWhoHasChildrenActive();
            }
        },
        data() {
            return {
                openedItems: [],
                activeItem: null
            }  
        },
        render(h) {
            return h('side-menu', {
                attrs:{
                    collapsed: this.collapsed,
                    inverse: true
                }
            }, this.data.map(item=>this.renderItem(h, item)))  
        },
        created() {
            window.addEventListener('hashchange', this.updateHash)
            
            this.openWhoHasChildrenActive();
        },
        destroyed() {
            window.removeEventListener('hashchange', this.updateHash)
        },
        methods: {
            getHref(item) {
                return item.href||('#/'+item.file);
            },
            updateHash() {
                this.$forceUpdate();
            },
            renderItem(h, item) {
                return h('item-u', {
                    attrs: {
                        opened: this.isOpened(item),
                        active: this.isActive(item) || (!this.isOpened(item)&&this.isChildrenActive(item))
                    },
                    on: {
                        click: event=>{
                            event.stopPropagation();
                            this.$emit('click', item);
                            if(this.hasChildren(item))
                                this.toggleItem(item);
                            else {
                                this.activateItem(item)
                                if(this.manual) return;
                                if(!this.getHref(item)) return;
                                location.href = this.getHref(item);
                            }
                        } 
                    }
                } ,
                    !this.hasChildren(item)
                    ?this.renderItemHeader(h, item)
                    :[
                        h('header', this.renderItemHeader(h, item)),
                        item.children.map(item=>this.renderItem(h, item))
                    ]
                )
            },
            renderItemHeader(h, item) {
                return [
                    !item.icon?null: h('i', {
                        class: ['fa', 'fa-'+item.icon]
                    }),
                    ...this.$scopedSlots.default
                    ?this.$scopedSlots.default(item)
                    :[item.title]
                    
                ]
            },
            toggleItem(item) {
                if(this.isOpened(item)) {
                    // this.openedItems = without([item], this.openedItems);
                    this.openedItems = [];
                }else {
                    // this.openedItems.push(item);
                    this.openedItems = [item]
                }
            },
            isOpened(item) {
                if(this.collapsed) return false;
                if(!this.hasChildren(item)) return false;
                return this.openedItems.includes(item);
            },
            hasChildren(item) {
                if(!isArray(item.children)) return false;
                if(isEmpty(item.children)) return false;
                return true;
            },
            isActive(item) {
                if(this.activateBy === 'hash') {
                    if(this.getHref(item) === location.hash) return true;
                }
                if(this.activateBy === 'path') {
                    if(this.getHref(item) === location.pathname) return true;
                }
                return this.activeItem === item;
            },
            isChildrenActive(item) {
                if(!this.hasChildren(item)) return false;
                if(item.children.some(item=>this.isActive(item))) return true;
                if(item.children.some(item=>this.isChildrenActive(item))) return true;
                return false;
            },
            openWhoHasChildrenActive() {
                this.data.forEach(item=>{
                    if(this.isChildrenActive(item))
                        this.openedItems = [item]
                })
            },
            activateItem(item) {
                this.activeItem = item;    
            }
        }
    }
</script>

