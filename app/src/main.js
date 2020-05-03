import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './assets/stylus/reset.styl';
import './assets/stylus/main.styl';

library.add(faFilter, faTrashAlt, faEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
