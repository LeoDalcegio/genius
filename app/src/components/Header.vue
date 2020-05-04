<template>
  <header class="flexed space-between align-center">
    <img src="../assets/images/logo-genius.svg" alt="Logo Genius Questions">
    <div class="flexed">
      <router-link to="/" active-class="ativo" exact>
        Listar
      </router-link>
      <router-link to="/criar" active-class="ativo" exact>
        Criar
      </router-link>
      <router-link to="/perguntar" active-class="ativo" exact>
        Perguntar
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

<style scoped lang="stylus">
  @import '../assets/stylus/variables.styl';

  header {
    width: 100%;
    max-width: 100%;
    height: 80px;
    padding: 0 108px;
    background: $roxo;
    img {
      width: 125px;
      height: 43px;
    }
		div {
      height: 100%;
			a {
				min-width: 100px;
				height: 100%;
        display: flex;
        padding: 26px;
        justify-content: center;
        align-items: center;
        color: $brancoFonte;
        font-family: $fonte;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        &.ativo,
        &:hover {
          background: $amareloHover
          color: $roxo;
        }
			}
		}
  }

</style>
