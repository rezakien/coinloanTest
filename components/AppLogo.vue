<template lang="pug">
nuxt-link.logo__link(to="/")
  .logo__block.bold
    <img src="@/static/logo.svg" class="logo"/>
    span CoinLoan
</template>

<script>
  export default {
    name: "AppLogo"
};
</script>
<style lang="scss">
.logo__link {
  text-decoration: none;
  .logo__block {
    display: flex;
    color: #fff;
    gap: 10px;
    align-items: center;
    font-size: 1.5rem;
    .logo {
      display: flex;
      width: 40px;
      height: 40px;
      border: 1px solid #fff;
      border-radius: 12px;
      padding: 5px;
    }
  }
}
</style>
