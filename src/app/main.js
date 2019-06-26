import Vue from 'vue';
import VueFire from 'vuefire';
import VueStripeCheckout from 'vue-stripe-checkout';

import App from './App.vue';

import { store } from './store.js'

Vue.use(VueFire);
Vue.use(VueStripeCheckout, 'pk_test_VwTRhhTmGeEZVzbnn9ozpwfN00lGct3b8L');


new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
