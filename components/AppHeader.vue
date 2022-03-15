<template lang="pug">
header
  AppLogoVue
  AppUserActions
</template>
<script>
import AppLogoVue from "./AppLogo.vue"
import AppUserActions from "./AppUserActions.vue"
export default {
    name: 'AppHeader',
    components: {
        AppLogoVue,
        AppUserActions
    }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 35px;
  background-color: $primary-color;
}
</style>