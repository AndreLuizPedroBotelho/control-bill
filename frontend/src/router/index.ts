// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Auth.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
    meta: { requiresToken: true },

  },
  {
    path: '/user',
    component: () => import('@/layouts/default/Auth.vue'),
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('@/views/User.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/bill',
    component: () => import('@/layouts/default/Auth.vue'),
    children: [
      {
        path: '',
        name: 'Bill',
        component: () => import('@/views/Bill.vue'),
      },
    ],
    meta: { requiresAuth: true },

  },

  {
    path: '/payment',
    component: () => import('@/layouts/default/Auth.vue'),
    children: [
      {
        path: '',
        name: ' Payment',
        component: () => import('@/views/Payment.vue'),
      },
    ],

  },
  {
    path: '/typePayment',
    component: () => import('@/layouts/default/Auth.vue'),
    children: [
      {
        path: '',
        name: 'TypePayment',
        component: () => import('@/views/TypePayment.vue'),
      },
    ],
    meta: { requiresAuth: true },

  },

  {
    path: "/:catchAll(.*)",
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Payment',
        component: () => import('@/views/PageNotFound.vue'),
      },
    ]

  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, _from) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    return {
      path: '/login'
    }
  }


  if (to.meta.requiresToken && token) {
    return {
      path: '/'
    }
  }
})

export default router
