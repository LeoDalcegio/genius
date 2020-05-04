import Vue from 'vue';
import VueRouter from 'vue-router';
import Listar from '../views/Listar.vue';
import CriarEditar from '../views/CriarEditar.vue';
import Perguntar from '../views/Perguntar.vue';
import PerguntasNaoRespondidas from '../views/PergutasNaoRespondidas.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Listar',
		component: Listar,
	},
	{
		path: '/perguntas-nao-respondidas',
		name: 'PerguntasNaoRespondidas',
		component: PerguntasNaoRespondidas,
	},
	{
		path: '/criar',
		name: 'Criar',
		component: CriarEditar,
	},
	{
		path: '/editar/:id',
		name: 'Editar',
		component: CriarEditar,
	},
	{
		path: '/perguntar',
		name: 'Perguntar',
		component: Perguntar,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
