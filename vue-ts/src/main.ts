import {createApp} from 'vue'
import ElementPlus from 'element-plus';
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'

createApp(App)
    .directive('highlight', function (el) {
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: HTMLElement) => {
                hljs.highlightBlock(block)
            }
        )
    }).use(ElementPlus).use(router).mount('#app')
