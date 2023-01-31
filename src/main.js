import { createApp } from 'vue'
import piniaStore from './stores'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(piniaStore)
app.use(router)

app.mount('#app')
