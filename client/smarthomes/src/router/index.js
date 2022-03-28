import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// let getApp = false

function getCookie(name) {
  let cookies = document.cookie.split('; ')
  let index = cookies.findIndex(x => x.includes(name))
  if (index != -1 && cookies[index].length > name.length + 1){
    return true
  } else {
    return false
  }
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta:{
      leftNav:true
    },
    component: () => import('../views/DashBoard.vue'),
    beforeEnter: (to, from, next) => {
      if (!getCookie('__shtk')) next('/login')
      else next()
    }
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
    meta:{
      leftNav:true
    },
    component: () => import('../views/Rooms.vue')
  },
  {
    path: '/devices',
    name: 'Devices',
    meta:{
      leftNav:true
    },
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
    component: () => import('../views/LogIn.vue'),
    beforeEnter:(to, from, next) => {
      if (getCookie('__shtk')) next('/')
      else next()
    }
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

// router.beforeEach(async (to, from, next) => {
//   let error 
//   if (!getApp) {
//     let resp = await this.$store.actions('GET_DATA')
//     error = resp.error
//     getApp = true
//   }

//   if (error) return console.log('ERROR =>>',error)
//   next()
// })

export default router
