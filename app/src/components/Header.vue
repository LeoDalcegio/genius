<template>
  <header class="flexed space-between">
    <img src="../assets/images/logo-olist.svg" alt="Logo da olist">
    <div class="flexed">
      <router-link to="/">
        Listar
      </router-link>
      <router-link to="/criar">
        Criar
      </router-link>
      <router-link to="/perguntas">
        Perguntas
      </router-link>
    </div>
  </header>
</template>


<script>
export default {
	name: 'Header',
	props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import '../assets/stylus/variables.styl';

  header {
    width: 100%;
    max-width: 100%;
    height: 80px;
    padding: 0 108px;
    background: $azul;
		div {
			a {
				width: 100px;
				height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $brancoFonte;
        font-family: $fonte;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        &:hover {
          background: $azulHover;
        }
			}
		}
  }

</style>
