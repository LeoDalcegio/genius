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
            <a href="javascript:;" class="btn-table btn-edit mr-25"
            @click="editProduct(question._id)">
              <font-awesome-icon icon="edit" />
            </a>
            <a href="javascript:;" class="btn-table btn-delete"
                @click="deleteProduct(question._id)">
              <font-awesome-icon icon="trash" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>

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
		};
	},
	methods: {
		fetchNotAnsweredQuestions() {
			this.$http.get(`${this.apiUrl}/notAnsweredQuestions`).then((response) => {
				this.notAnsweredQuestions = response.data.docs;
			});
		},
		redirectToListar() {
			this.$router.push('/');
		},
		editProduct(id) {
			this.$router.push({ name: 'Editar', params: { id } });
		},
		deleteProduct(id) {
			this.$http.delete(`${this.apiUrl}/notAnsweredQuestions/${id}`).then(() => {
				this.fetchProducts();
			});
		},
		// eslint-disable-next-line func-names
		filterAnsweredQuestions: _.debounce(function () {
			if (this.search === '') {
				this.fetchNotAnsweredQuestions();
				return;
			}
			this.$http.get(`${this.apiUrl}/notAnsweredQuestions?product=${this.search}`).then((response) => {
				this.notAnsweredQuestions = response.data.docs;
			});
		}, 500),
	},
	beforeMount() {
		this.fetchNotAnsweredQuestions();
	},
};
</script>

<style lang="stylus" scoped>

</style>
