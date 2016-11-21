import Vue from 'vue'
import resource from 'vue-resource'
import VueRouter from 'vue-router'
import search from './component/search.vue'
import newC from './component/new.vue'
Vue.use(VueRouter);
Vue.use(resource);
const router = new VueRouter();
router.map({
  '/index': {
    name: 'index',
    component: search,
    // //子路由
    // subRoutes:{
    //   '/xxx':{
    //     name:'zxxx',
    //     component:xxx
    //   }
    // }
  },
  '/new': {
    name: 'new',
    component: newC
  }
});
//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
router.redirect({
  '*':"/index"//重定向任意未匹配路径到/index
});
var App = Vue.extend({});
router.start(App, "#app");

