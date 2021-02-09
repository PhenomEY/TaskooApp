import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',

  routes: [
    {
      path: '/project/:projectId',
      name: 'Project',
      component: require('pages/Project/Project').default,
    },
    {
      path: '/task/:taskId',
      name: 'Task',
      component: require('pages/Task/Task').default
    },
    {
      path: '/project/create',
      name: 'CreateProject',
      component: require('pages/Project/Create/CreateProject').default
    },
    {
      path: '/',
      name: 'Dashboard',
      component: require('pages/Dashboard/Dashboard').default
    },
    {
      path: '/login',
      name: 'Login',
      component: require('pages/Login/Login').default
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: require('pages/Tasks/Tasks').default,
      children: [
        {
          path: 'done',
          name: 'DoneTasks',
          component: require('pages/Tasks/Tasks').default
        },
      ]

    },
    {
      path: '/admin',
      name: 'Administration',
      component: require('pages/Administration/Administration').default,
      children: [
        {
          path: 'user/create',
          component: require('components/Admin/UserCreate/UserCreate').default,
        },
        {
          path: 'user/list',
          component: require('components/Admin/UserList/UserList').default,
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
