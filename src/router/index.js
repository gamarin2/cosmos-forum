import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function r (pageName) { return require(`../components/Page${pageName}`) }

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'page-index', component: r('Index') }
  ]
})
