import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function r (type, pageName) { return require(`../components/${type}/Page${pageName}`) }

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: r('common', 'Index') },
    { path: '/d/:discussion', name: 'threads', component: r('threads', 'Threads') },
    { path: '/d/:discussion/t/new', name: 'threads-new', component: r('threads', 'ThreadsNew') },
    { path: '/d/:discussion/t/:thread', name: 'thread', component: r('threads', 'Thread') },
    {
      path: '/d/:discussion/t/:thread/c/:comment',
      name: 'comment',
      component: r('threads', 'Comment')
    },
    { path: '/users', name: 'users', component: r('users', 'Users') },
    { path: '/users/:user', name: 'user', component: r('users', 'User') },
    { path: '/users/:user/threads', name: 'user-threads', component: r('users', 'UserThreads') },
    { path: '/users/:user/comments', name: 'user-comments', component: r('users', 'UserComments') },
    { path: '/users/:user/votes', name: 'user-votes', component: r('users', 'UserVotes') },
    { path: '/settings', name: 'settings', component: r('users', 'Settings') }
  ]
})
