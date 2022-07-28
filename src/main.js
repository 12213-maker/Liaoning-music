import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/global.scss' //
import '@/assets/fonts/font.scss';

import 'element-ui/lib/theme-chalk/icon.css';

import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import * as echarts from 'echarts'

import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css';

import './assets/icons' // icon
import './permission' // permission control
import {getDicts} from "@/api/system/dict/data"
import {getConfigKey} from "@/api/system/config"
import {
  addDateRange,
  download,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels
} from "@/utils/tools";
import Pagination from "@/components/Pagination"
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
// 代码高亮插件
import hljs from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
// 引入jquery
import $ from 'jquery'
// 站店听音-播放组件
import 'jplayer/dist/skin/blue.monday/css/jplayer.blue.monday.css'
import * as jPlayer from 'jplayer'

Vue.use(VueAwesomeSwiper);

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.$ = $;
Vue.prototype.$echarts = echarts
Vue.prototype.$loadingIns = null


Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)
Vue.use(hljs.vuePlugin);




/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});

Vue.config.productionTip = false

//全局设置:关闭弹框点击弹框外出发关闭
Element.Dialog.props.closeOnClickModal.default = false



const rootApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

console.log(rootApp)
