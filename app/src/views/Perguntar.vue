<template>
  <Container>

    <div class="head-actions flexed space-between">
      <Title text="Faça uma pergunta" />
    </div>

  <div class="flexed-column w100p mb-24">
    <label>Escolha o produto</label>
    <select v-model="questionDto.productName">
      <option value="" selected disabled>Selecione o produto</option>
      <option v-for="(product, index) in products" :key="index"
          v-bind:value="product.name">{{ product.name }}</option>
    </select>
  </div>

  <div class="flexed-column w100p mb-39">
    <label>Pergunta</label>
    <input type="text" v-model="questionDto.question" placeholder="Ex: Você tem em estoque ?">
  </div>

  <div class="w100p flexed flex-end">
    <button class="yellow" @click="sendQuestion()">
      Enviar
    </button>
  </div>

  </Container>
</template>

<script>
import Title from '@/components/Title.vue';
import Container from '@/components/Container.vue';

export default {
	name: 'Perguntar',
	components: {
		Title,
		Container,
	},
	data() {
		return {
			apiUrl: process.env.VUE_API_URL,
			questionDto: {},
			products: [],
		};
	},
	methods: {
		findAllProducts() {
			// this.$http.get(this.apiUrl).then((response) => {
			//  console.log(response);
			// });
			this.products = [
				{
					id: 1,
					name: 'Bike',
				},
				{
					id: 3,
					name: 'Bike top',
				},
				{
					id: 1,
					name: 'Bike boa',
				},
			];
		},
		sendQuestion() {
			console.log(this.questionDto);
		},
	},
	beforeMount() {
		this.findAllProducts();
	},
};
</script>

<style lang="stylus" scoped>

</style>
