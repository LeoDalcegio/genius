<template>
    <div id="app">
        <Header />
        <router-view/>
        <b-modal ref="answer_saved" hide-footer hide-header>
          <div class="super-icon w100p flexed center mb-24">
            <svg width="188" height="188" viewBox="0 0 188 188" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="34" y="44" width="119" height="100">
              <path d="M152.243 59.5121L137.654 44.8808C137.164 44.3893 136.498 44.1132 135.804 44.1132C135.11 44.1132 134.444 44.3893 133.954 44.8808L72.3352 106.541C71.845 107.033 71.1795 107.309 70.4854 107.309C69.7913 107.309 69.1257 107.033 68.6356 106.541L54.046 91.9101C53.5558 91.4187 52.8903 91.1425 52.1962 91.1425C51.5021 91.1425 50.8365 91.4187 50.3464 91.9101L35.7568 106.541C34.7368 107.562 34.7368 109.216 35.7568 110.236L68.6356 143.12C69.1257 143.611 69.7913 143.887 70.4854 143.887C71.1795 143.887 71.845 143.611 72.3352 143.12L152.243 63.17C153.239 62.154 153.239 60.5281 152.243 59.5121Z" fill="white"/>
              </mask>
              <g mask="url(#mask0)">
              <rect width="188" height="188" fill="#3FD00C"/>
              </g>
            </svg>
          </div>
          <p class="modal-description mb-39">
            Suas respostas foram cadastradas <br>
            com sucesso!
          </p>
          <div class="flexed center mb-24">
            <button class="purple mr-14" @click="closeAnswerSavedModal">
              Fechar
            </button>
          </div>
        </b-modal>
    </div>
</template>


<script>
import Header from '@/components/Header.vue';

export default {
	name: 'App',
	components: {
		Header,
	},
};
</script>

<style lang="stylus">

</style>
