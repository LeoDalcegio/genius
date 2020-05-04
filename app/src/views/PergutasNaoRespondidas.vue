<template>
  <Container>

    <div class="head-actions flexed space-between">
      <Title text="Perguntas não respondidas" />
      <input type="text" v-model="search" placeholder="Pesquisar" @change="filterAnsweredQuestions">
      <div class="flexed">
        <button class="white" @click="redirectToListar()">
          Voltar
        </button>
      </div>
    </div>

    <table class="mt-38" cellspacing=0 cellpadding=0>
      <thead>
        <tr>
          <th class="pl-37">Produto</th>
          <th>Pergunta</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in notAnsweredQuestions" :key="question._id">
          <td class="pl-37">{{ question.product }}</td>
          <td>{{ question.question }}</td>
          <td>
            <a href="javascript:;" class="btn-table btn-delete"
                @click="openDeleteModal(question._id)">
              <font-awesome-icon icon="trash" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal ref="delete-modal" hide-footer hide-header>
      <div class="super-icon w100p flexed center mb-24">
        <svg width="152" height="151" viewBox="0 0 152 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="25" y="25" width="102" height="101">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M76 25.1352C48.0001 25.1352 25.3017 47.6843 25.3017 75.5C25.3017 103.316 48.0001 125.865 76 125.865C104 125.865 126.698 103.316 126.698 75.5C126.668 47.6967 103.987 25.1653 76 25.1352ZM76 104.879C72.5 104.879 69.6627 102.061 69.6627 98.5839C69.6627 95.1069 72.5 92.2883 76 92.2883C79.5 92.2883 82.3373 95.1069 82.3373 98.5839C82.3373 102.061 79.5 104.879 76 104.879ZM80.2248 83.2099C80.224 81.5403 81.2194 80.029 82.7598 79.3612V79.3654C90.4955 76.0114 94.5541 67.5017 92.2674 59.4304C89.9807 51.3591 82.05 46.2015 73.6889 47.3481C65.3279 48.4948 59.1004 55.5941 59.1005 63.9789C59.1005 66.2969 60.9921 68.176 63.3254 68.176C65.6587 68.176 67.5503 66.2969 67.5503 63.9789C67.5481 59.786 70.6608 56.2345 74.8417 55.6597C79.0226 55.0849 82.9892 57.6632 84.1333 61.6991C85.2775 65.7351 83.2482 69.9908 79.3799 71.668C74.7603 73.6708 71.7744 78.2027 71.7751 83.2099C71.7751 85.5279 73.6667 87.407 76 87.407C78.3333 87.407 80.2248 85.5279 80.2248 83.2099Z" fill="white"/>
          </mask>
          <g mask="url(#mask0)">
          <rect width="152" height="151" fill="#ECD92F"/>
          </g>
        </svg>
      </div>
      <p class="modal-description mb-39">
        Tem certeza que quer excluir <br>
        esse item ?
      </p>
      <div class="flexed center mb-24">
        <button class="purple mr-14" @click="closeDeleteModal">
          Não
        </button>
        <button class="white" @click="deleteProduct()">
          Sim
        </button>
      </div>
    </b-modal>

  </Container>
</template>

<script>
import Title from '@/components/Title.vue';
import Container from '@/components/Container.vue';
import _ from 'lodash';

export default {
	name: 'PerguntasNaoRespondidas',
	components: {
		Title,
		Container,
	},
	data() {
		return {
			notAnsweredQuestions: [],
			apiUrl: process.env.VUE_APP_API_URL,
			search: '',
			idDeleteProduct: '',
		};
	},
	methods: {
		async fetchNotAnsweredQuestions() {
			const response = await this.$http.get(`${this.apiUrl}/notAnsweredQuestions`);
			this.notAnsweredQuestions = response.data;
		},
		redirectToListar() {
			this.$router.push('/');
		},
		openDeleteModal(id) {
			this.idDeleteProduct = id;
			this.$refs['delete-modal'].show();
		},
		closeDeleteModal() {
			this.idDeleteProduct = '';
			this.$refs['delete-modal'].hide();
		},
		editProduct(id) {
			this.$router.push({ name: 'Editar', params: { id } });
		},
		async deleteProduct() {
			await this.$http.delete(`${this.apiUrl}/notAnsweredQuestions/${this.idDeleteProduct}`);
			this.idDeleteProduct = '';
			this.fetchNotAnsweredQuestions();
			this.$refs['delete-modal'].hide();
		},
		// eslint-disable-next-line func-names
		filterAnsweredQuestions: _.debounce(async function () {
			if (this.search === '') {
				this.fetchNotAnsweredQuestions();
				return;
			}
			const response = await this.$http.get(`${this.apiUrl}/notAnsweredQuestions?product=${this.search}`);
			this.notAnsweredQuestions = response.data;
		}, 500),
	},
	beforeMount() {
		this.fetchNotAnsweredQuestions();
	},
};
</script>

<style lang="stylus" scoped>

</style>
