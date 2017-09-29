import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function r (type, pageName) { return require(`../components/${type}/Page${pageName}`) }

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'page-index', component: r('common', 'Index') },
    { path: '/d/:discussion', name: 'page-threads', component: r('threads', 'Threads') },
    { path: '/d/:discussion/t/new', name: 'page-threads-new', component: r('threads', 'ThreadsNew') },
    { path: '/d/:discussion/t/:thread', name: 'page-thread', component: r('threads', 'Thread') },

    { path: '/users', name: 'users', component: r('users', 'Users') },
    { path: '/users/:user', name: 'user', component: r('users', 'User') },
    { path: '/settings', name: 'settings', component: r('users', 'Settings') }
  ]
})
