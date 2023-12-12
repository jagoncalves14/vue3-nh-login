import App from './App.vue'
import router from './router'
import store from './store'

import '@nordhealth/css'
import '@/assets/main.css'
import 'uno.css'

createApp(App).use(router).use(store).mount('#app')
