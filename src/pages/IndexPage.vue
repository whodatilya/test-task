<template>
  <div>
    123
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async mounted() {
    await this.$store.dispatch('movies/loadMovies')
    console.log(this.$store)
  }
}
</script>

<style scoped lang="sass">
</style>