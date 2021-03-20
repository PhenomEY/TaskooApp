import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',

  routes: [
    {
      path: '/project/create',
      name: 'CreateProject',
      component: require('pages/Project/Create/CreateProject').default
    },
    {
      path: '/project/:projectId',
      name: 'Project',
      component: require('pages/Project/Project').default,
      children: [
        {
          path: 'edit',
          name: 'EditProject',
          component: require('pages/Project/Edit/EditProject').default,
          children: [{
            path: 'users',
            name: 'EditProjectUsers',
            components: {users: require('pages/Project/Edit/Users/Users').default}
          }]
        },
      ]
    },
    {
      path: '/task/:taskId',
      name: 'Task',
      component: require('pages/Task/Task').default
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
      components: {
        default: require('pages/Administration/Administration').default
      },
      children: [
        {
          name: 'AdminUser',
          path: 'user',
          components: {
            adminUsers:require('pages/Administration/User/User').default,
          } ,

          children: [
            {
              path: 'create',
              name: 'AdminUserCreate',
              component: require('pages/Administration/User/Create/Create').default,
            },
            {
              path: 'edit/:id',
              name: 'AdminUserEdit',
              component: require('pages/Administration/User/Edit/Edit').default,
            },
          ]
        },

        {
          name: 'AdminOrganisations',
          path: 'organisations',
          components: {
            adminOrganisations: require('pages/Administration/Organisations/Organisations').default
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
