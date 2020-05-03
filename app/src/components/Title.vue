<template>
  <h1>{{ text }}</h1>
</template>


<script>
export default {
	name: 'Header',
	props: {
		text: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped lang="stylus">
  @import '../assets/stylus/variables.styl';

  h1 {
    font-family: $fonte;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    color: #282828;
  }

</style>
