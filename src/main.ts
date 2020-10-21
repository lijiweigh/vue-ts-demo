import Vue from "vue"

import App from "./App.vue"
import "normalize.css"
import store from "@/store"
import router from "@/router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import {AppModule} from "@/store/modules/app"

import i18n from "@/lang"

Vue.use(ElementUI, {
    size: AppModule.size,
    i18n: (key: string, value: string) => i18n.t(key, value)
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app")