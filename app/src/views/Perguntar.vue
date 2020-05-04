<template>
  <Container>

    <div class="head-actions flexed space-between">
      <Title text="Faça uma pergunta" />
    </div>

  <div class="flexed-column w100p mb-24 mt-26">
    <label>Escolha o produto</label>
    <select v-model="questionDto.product">
      <option value="" selected disabled>Selecione o produto</option>
      <option v-for="(product, index) in products" :key="index"
          v-bind:value="product.product">{{ product.product }}</option>
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

  <div class="w100p flexed-column mt-64">
    <label>Resposta</label>
    <div class="answer">
      {{ answer }}
    </div>
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
			apiUrl: process.env.VUE_APP_API_URL,
			questionDto: {},
			products: [],
			answer: '',
		};
	},
	watch: {
		questionDto: {
			handler(value) {
				if (value.question === '') {
					this.answer = '';
				}
			},
			deep: true,

		},
	},
	methods: {
		findAllProducts() {
			this.$http.get(`${this.apiUrl}/questions`).then((response) => {
				this.products = response.data.docs;
			});
		},
		sendQuestion() {
			this.$http.post(`${this.apiUrl}/questions/ask`, this.questionDto).then((response) => {
				if (response.data.message) {
					this.answer = 'Nenhuma resposta encontrada, colocamos ela nas Perguntas não respondidas.';
					return;
				}
				this.answer = response.data.answer;
			});
		},
	},
	beforeMount() {
		this.findAllProducts();
	},
};
</script>

<style lang="stylus" scoped>
  .answer {
    width: 100%;
    height: 50px;
    background: #333652;
    border: 2px solid $roxo;
    border-radius: 5px;
    font-family: $fonte;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    padding-left: 8px;
    display: flex;
    align-items: center;
  }
</style>
