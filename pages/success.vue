<template lang="pug">
section.container
  AppHeader
  .content.success
    h1.success-text Exchange was completed.
    div
      button.success(@click="$router.go(-1)") Go Back
</template>

<script>
import AppHeader from "../components/AppHeader.vue"
export default {
  components: {
    AppHeader
  },
  created () {
      setTimeout(() => {
          this.$router.go(-1);
      }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.success-text {
  color: $text-color;
}
.content.success {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
  button.success {
    width: 180px;
  }
}
</style>
