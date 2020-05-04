import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faFilter, faTrash, faEdit, faCheck, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/stylus/reset.styl';
import './assets/stylus/main.styl';


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(ModalPlugin);

library.add(faFilter, faTrash, faEdit, faCheck, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
