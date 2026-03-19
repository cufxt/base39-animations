import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initLenis } from '@/plugins/lenis'

import '@/assets/styles/main.scss'

initLenis()

const app = createApp(App)

app.use(router)
app.mount('#app')
