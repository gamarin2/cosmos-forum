import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function r (type, pageName) { return require(`../components/${type}/Page${pageName}`) }

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'all-threads', component: r('threads', 'ThreadsAll') },
    { path: '/threads/new', name: 'new-thread', component: r('threads', 'ThreadsNew') },
    { path: '/threads/:thread', name: 'thread', component: r('threads', 'Thread') },

    { path: '/users', name: 'users', component: r('users', 'Users') },
    { path: '/users/:user', name: 'user', component: r('users', 'User') },
    { path: '/settings', name: 'settings', component: r('users', 'Settings') }
  ]
})
