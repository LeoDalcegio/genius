<template>
  <Container>

    <div class="head-actions flexed space-between">
      <Title text="AUTOMAÇÕES" />
      <input type="text" v-model="pesquisa" placeholder="Pesquisar">
      <div class="flexed">
        <button class="white mr-25">
          <font-awesome-icon icon="filter" />
          Filtros
        </button>
        <button class="yellow" @click="redirectToCriar()">
          Nova automação
        </button>
      </div>
    </div>

    <table class="mt-38" cellspacing=0 cellpadding=0>
      <thead>
        <tr>
          <th class="pl-37">Nome do produto</th>
          <th>Qtd. Questões</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="pl-37">{{ product.product }}</td>
          <td>{{ product.questions.length }}</td>
          <td>
            <a href="javascript:;" class="btn-table btn-edit mr-25"
            @click="editProduct(product._id)">
              <font-awesome-icon icon="edit" />
            </a>
            <a href="javascript:;" class="btn-table btn-delete" @click="deleteProduct(product._id)">
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

export default {
	name: 'Listar',
	components: {
		Title,
		Container,
	},
	data() {
		return {
			products: [],
			apiUrl: process.env.VUE_APP_API_URL,
			pesquisa: '',
		};
	},
	methods: {
		fetchProducts() {
			this.$http.get(`${this.apiUrl}/questions`).then((response) => {
				this.products = response.data.docs;
			});
		},
		redirectToCriar() {
			this.$router.push('criar');
		},
		editProduct(id) {
			console.log(id);
			this.$router.push({ path: `editar/${id}` });
		},
		deleteProduct(id) {
			this.$http.delete(`${this.apiUrl}/questions/${id}`).then((response) => {
				console.log(response);
			});
		},
	},
	beforeMount() {
		this.fetchProducts();
	},
};
</script>

<style lang="stylus" scoped>

</style>
