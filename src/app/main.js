import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App.vue';

import { store } from './store.js'

Vue.use(VueFire);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
