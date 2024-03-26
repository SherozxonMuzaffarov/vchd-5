import "./assets/main.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

let BASE_URL = "http://127.0.0.1:3000";

axios.defaults.baseURL = BASE_URL;


app.use(router)
app.mount('#app')
