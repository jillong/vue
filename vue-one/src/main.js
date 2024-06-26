import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from "@/router"

let app = createApp(App);

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式

//创建v-highlight全局指令
app.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    })
}).use(ElementPlus).use(router).mount('#app')
