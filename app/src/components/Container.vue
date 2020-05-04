<template>
  <div class="container-genius">
    <slot></slot>
  </div>
</template>


<script>
export default {
	name: 'Container',
	props: {},
};
</script>

<style scoped lang="stylus">
  @import '../assets/stylus/variables.styl';

  .container-genius {
    width: 100%;
    max-width: 100%;
    padding: 48px 108px;
    display: flex;
    flex-flow: wrap;
  }

</style>
