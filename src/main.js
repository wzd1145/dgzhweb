import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import { getUrlKey } from './libs/utils'

import VueSweetalert2 from './plugins/vue-sweetalert2'

import { checkUser } from './libs/login'
import('./libs/prototype')

import request from './libs/request'
import GlobalEvents from '@irooty/vue-global-events';

import Vant from 'vant';
import 'vant/lib/index.css';

// import vConsole from '@/libs/vconsole.js'



var id = getUrlKey('id')
store.commit('setId', id)

checkUser(store, "wxfa72db87e1464d41", id).then((res) => {
    return createApp(App).use(store).use(Vant).use(router).use(VueSweetalert2).use(GlobalEvents, { request: request }).mount('#app')
})
