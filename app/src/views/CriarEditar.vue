<template>
  <Container>

    <div class="head-actions flexed space-between">
      <Title text="Criar nova automação" />
      <div class="flexed">
        <button class="white mr-25" @click="redirectToListar()">
          Voltar
        </button>
        <button class="yellow" @click="saveProductWithQuestion()" v-if="!productDto._id">
          Criar
        </button>
        <button class="yellow" @click="editProductWithQuestion()" v-if="productDto._id">
          Editar
        </button>
      </div>
    </div>

    <div class="forms">

      <div class="flexed-column w100p">
        <label>Nome do produto<small>*</small></label>
        <input type="text" v-model="productDto.product" placeholder="Ex: Boné">
      </div>

      <div class="flexed mt-35">
        <label>Perguntas<small>*</small></label>
        <div class="suround-question flexed space-between w100p">

          <div class="left-column column flexed-column">
            <div class="flexed-column w100p">
              <label>Pergunta<small>*</small></label>
              <input type="text" v-model="question.question" @blur="findKeywords()"
                  placeholder="Ex: Você tem o produto no estoque ?">
            </div>
            <div class="flexed-column mt-26">
              <label>Respostas<small>*</small></label>
              <div class="flexed-column mb-18">
                <label class="not-big">Positiva</label>
                <input type="text" v-model="question.answers.positive"
                    placeholder="Ex: Sim, nós temos o produto em estoque...">
              </div>
              <div class="flexed-column mb-18">
                <label class="not-big">Negativa</label>
                <input type="text" v-model="question.answers.negative"
                    placeholder="Ex: Não, estamos fabricando mais...">
              </div>
              <div class="flexed-column">
                <label class="not-big">Informativa</label>
                <input type="text" v-model="question.answers.informative"
                    placeholder="Ex: Por enquanto não, mas ele chegará no próximo mês">
              </div>
            </div>
          </div>

          <div class="right-column column flexed-column">
            <div class="flexed-column w100p">
              <label>Palavras chaves</label>
              <input type="text" v-model="keyword"
                  placeholder="Ex: Estoque" v-on:keyup.enter="addKeyword">
              <span class="validate" v-if="keywordExist">Palavra chave já está cadastrada</span>
            </div>
            <div class="suround-keywords">
              <div class="keywords flexed mt-26">
                <div class="keyword flexed mr-14 mb-14"
                    v-for="(keyword, index) in question.keywords" :key="index">
                  {{ keyword }}
                  <a href="javascript:;" @click="removeKeyword(index)" class="btn-remove-keyword">
                    <font-awesome-icon icon="times" />
                  </a>
                </div>
              </div>
            </div>
            <div class="flexed-column w100p">
              <label>Resposta Padrão<small>*</small></label>
              <div class="flexed mt-20">
                <label class="custom-radio radio mr-42">Positiva
                  <input type="radio" value="positive" v-model="question.standardAnswer"
                      name="radio">
                  <span class="checkmark"></span>
                </label>
                <label class="custom-radio radio mr-42">Negativa
                  <input type="radio" value="negative" v-model="question.standardAnswer"
                      name="radio">
                  <span class="checkmark"></span>
                </label>
                <label class="custom-radio radio">Informativa
                  <input type="radio" value="informative" v-model="question.standardAnswer"
                      name="radio">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="flexed flex-end mt-64">
              <button class="yellow" @click="addQuestion()">
                {{ question.index || question.index === 0 ? 'Editar' : 'Adicionar' }}
              </button>
            </div>
          </div>

        </div>
      </div>

      <div class="flexed-column suround-questions mt-18" v-if="productDto.questions.length > 0">
        <div class="flexed space-between question" :class="index%2 === 1 ? 'boder-top' : ''"
            v-for="(question, index) in productDto.questions" :key="index">
          <label class="not-big">{{ question.question }}</label>
          <div class="flexed">
            <a href="javascript:;" class="btn-edit mr-14" @click="editQuestion(index)">
              <font-awesome-icon icon="edit" />
            </a>
            <a href="javascript:;" class="btn-delete" @click="deleteQuestion(index)">
              <font-awesome-icon icon="trash" />
            </a>
          </div>
        </div>
      </div>

    </div>

  </Container>
</template>

<script>
import Title from '@/components/Title.vue';
import Container from '@/components/Container.vue';

export default {
	name: 'CriarEditar',
	components: {
		Title,
		Container,
	},
	data() {
		return {
			productDto: {
				questions: [],
			},
			question: {
				answers: {},
				keywords: [],
			},
			keyword: '',
			keywordExist: false,
			apiUrl: process.env.VUE_APP_API_URL,
		};
	},
	methods: {
		async findProductBydId() {
			if (this.$route.params) {
				const response = await this.$http.get(`${this.apiUrl}/questions/${this.$route.params.id}`);
				this.productDto = response.data;
				this.editQuestion(0);
			}
		},
		redirectToListar() {
			this.$router.push('/');
		},
		saveProductWithQuestion() {
			this.$http.post(`${this.apiUrl}/questions/create`, this.productDto).then(() => {
				this.$router.push('/');
			});
		},
		editProductWithQuestion() {
			// eslint-disable-next-line no-underscore-dangle
			this.$http.put(`${this.apiUrl}/questions/${this.productDto._id}`, this.productDto).then(() => {
				this.$router.push('/');
			});
		},
		addKeyword() {
			if (this.keyword === '') {
				return;
			}
			if (this.question.keywords.includes(this.keyword)) {
				this.keywordExist = true;
				return;
			}
			this.question.keywords.push(this.keyword);
			this.keyword = '';
			this.keywordExist = false;
		},
		removeKeyword(index) {
			this.question.keywords.splice(index, 1);
		},
		addQuestion() {
			if (this.question.index || this.question.index === 0) {
				this.editAddedQuestion();
				return;
			}
			this.productDto.questions.push(this.question);
			this.question = {
				answers: {},
				keywords: [],
			};
		},
		editQuestion(index) {
			this.question = this.productDto.questions[index];
			delete this.question.index;
			this.question.index = index;
		},
		deleteQuestion(index) {
			this.productDto.questions.splice(index, 1);
		},
		editAddedQuestion() {
			this.productDto.questions[this.question.index] = this.question;
			delete this.question.index;
			this.question = {
				answers: {},
				keywords: [],
			};
		},
		async findKeywords() {
			const response = await this.$http.get(`${this.apiUrl}/keywords/${this.question.question}`);
			this.question.keywords = response.data.keywords;
		},
	},
	beforeMount() {
		this.findProductBydId();
	},
};
</script>

<style lang="stylus" scoped>

</style>
