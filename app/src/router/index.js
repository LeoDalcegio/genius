import Vue from 'vue';
import VueRouter from 'vue-router';
import Listar from '../views/Listar.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Listar',
		component: Listar,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
