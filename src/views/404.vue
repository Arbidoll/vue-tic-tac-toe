<template>
  <v-main>
    <v-container>
      <h1 class="white--text">Page not found!</h1>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "404",
  mounted() {
    setTimeout(() => this.$router.push("/"), 2000)
  }
}
</script>

<style scoped>

</style>