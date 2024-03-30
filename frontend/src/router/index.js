import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/Sidebar.vue'),
      children: [
        {
          path: 'vagon-nazorat',
          redirect: {path: '/vagon-nazorat/remain'},
          component: () => import('../views/vagonNazorat/Home.vue'),
          children: [
            {
              path: 'remain', // This will match /vagon-nazorat/remain
              component: () => import('../views/vagonNazorat/RemainVagons.vue')
            },
            {
              path: 'repairing', // This will match /vagon-nazorat/repairing
              component: () => import('../views/vagonNazorat/RepairingVagons.vue')
            },
            {
              path: 'repaired', // This will match /vagon-nazorat/repaired
              component: () => import('../views/vagonNazorat/RepairedVagons.vue')
            },
            {
              path: 'owner', // This will match /vagon-nazorat/repaired
              component: () => import('../views/vagonNazorat/Owner.vue')
            },
            {
              path: 'owner-company', // This will match /vagon-nazorat/repaired
              component: () => import('../views/vagonNazorat/OwnerCompany.vue')
            }
          ]
        },
        {
          path: 'gildirak-sexi',
          redirect: {path: '/gildirak-sexi/vu-53'},
          component: () => import('../views/gildirakSexi/Home.vue'),
          children: [
            {
              path: 'vu-53',
              component: () => import('../views/gildirakSexi/VU-53.vue')
            },
            {
              path: 'vu-53-expense/:id/:status',
              component: () => import('../views/gildirakSexi/VU-53Expense.vue')
            },
            {
              path: 'vu-90',
              component: () => import('../views/gildirakSexi/VU-90.vue')
            },
            {
              path: 'vu-91',
              component: () => import('../views/gildirakSexi/VU-91.vue')
            },
            {
              path: 'naplavka',
              component: () => import('../views/gildirakSexi/Naplavka.vue')
            }
          ]
        },
        {
          path: 'users',
          component: () => import('../views/User.vue'),
        },
        {
          path: 'settings',
          component: () => import('../views/Settings.vue')
        }	
      ]
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: {
        hideSidebar: true // Setting meta property to hide sidebar on the login page
      }
    }
  ]
})

export default router
