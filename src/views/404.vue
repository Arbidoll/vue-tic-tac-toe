<template>
  <div class="container">
    <h1>Page not found!</h1>
  </div>
</template>

<script>
export default {
name: "404",
  mounted() {
    setTimeout(()=>this.$router.push("/"), 2000)
  }
}
</script>

<style scoped>
  h1{
    color: white;
  }
</style>