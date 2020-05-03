<template>
  <div class="container">
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

  .container {
    width: 100%;
    max-width: 100%;
    padding: 48px 108px;
  }

</style>
