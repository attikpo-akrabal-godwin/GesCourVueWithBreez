import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import Header from "../views/Cours.vue"
import { useCourStore } from '../stores/cours'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/cours',
      name: 'cours',
      component:  Header
    }
  ]
})
router.beforeEach((to,from,next)=>{
  let courStore = useCourStore()
  if(to.name==='cours'){
    if(!courStore.isConnect){
       next({name:"login"})
    }
  }
  next()
 
})
export default router
