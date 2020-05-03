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
        <button class="yellow">
          Nova automação
        </button>
      </div>
    </div>

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
};
</script>

<style lang="stylus" scoped>
  .head-actions {
    width: 100%;
  }
</style>
