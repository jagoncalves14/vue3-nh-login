import { createHead } from '@unhead/vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/main.css'
import 'uno.css'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(store)

app.mount('#app')
