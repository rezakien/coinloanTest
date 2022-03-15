<template lang="pug">
.error__not-found
  span(v-if="error.statusCode === 404") #[nuxt-link(to="/") Go To Home]
</template>

<script>
  export default {
    name: 'LayoutA',
    head() {
        return {
            link: [
                { rel: 'stylesheet', href: '/css/LayoutA/app.min.css' }
            ],
            bodyAttrs: {
                class: 'LayoutA'
            }
        }
    },
    props: ['error'],
    layout: 'error'
  }
</script>

<style lang="scss">
.error__not-found {
  background-color: #333;
}
</style>