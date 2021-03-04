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
      path: '/invite/:id',
      name: 'Invite',
      component: require('pages/Invite/Invite').default
    },
    {
      path: '/user/:id',
      name: 'User',
      component: require('pages/User/User').default
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
          name: 'AdminUser',
          path: 'user',
          component: require('components/Admin/User/User').default,
          children: [
            {
              path: 'create',
              name: 'AdminUserCreate',
              component: require('components/Admin/User/Create/Create').default,
            },
            {
              path: 'edit/:id',
              name: 'AdminUserEdit',
              component: require('components/Admin/User/Edit/Edit').default,
            },
          ]
        },

        {
          name: 'AdminOrganisations',
          path: 'organisations',
          component: require('components/Admin/Organisations/Organisations').default,
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
