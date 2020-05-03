<template>
  <Container>

    <div class="head-actions flexed space-between">
      <Title text="Criar nova automação" />
      <div class="flexed">
        <button class="white mr-25" @click="redirectToListar()">
          Voltar
        </button>
        <button class="yellow">
          Criar
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
          <td class="pl-37">{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <a href="javascript:;" class="btn-table btn-edit mr-25">
              <font-awesome-icon icon="edit" />
            </a>
            <a href="javascript:;" class="btn-table btn-delete">
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
			productDto: {},
			apiUrl: process.env.VUE_API_URL,
		};
	},
	methods: {
		redirectToListar() {
			this.$router.push('/');
		},
	},
};
</script>

<style lang="stylus" scoped>

</style>
