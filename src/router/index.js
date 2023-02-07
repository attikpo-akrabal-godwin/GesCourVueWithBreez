import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import Header from "../views/Cours.vue"
import {useBreezCours} from "../stores/BreezCours.js"



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
  let BreezCours = useBreezCours()
  if(to.name==='cours'){
    if(!BreezCours.isConnect){
       next({name:"login"})
    }
  }
  next()
 
})
export default router
