import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta:{
      leftNav:true
    },
    component: () => import('../views/DashBoard.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      leftNav:true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('../views/Rooms.vue')
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import('../views/Devices.vue')
  },
  {
    path: '/security',
    name: 'Security',
    meta:{
      leftNav:true
    },
    component: () => import('../views/Security.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    meta:{
      leftNav:true
    },
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/members',
    name: 'Members',
    meta:{
      leftNav:true
    },
    component: () => import('../views/Members.vue')
  },
  {
    path: '/login',
    name: 'Log In',
    meta:{
      leftNav:false
    },
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta:{
      leftNav:false
    },
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
