<template lang="pug">
section.container
  AppHeader
  .content
    .nav-bar
      AppUserCoinActions(@onChangeContent="changeCoinComponent")
    .tab-content
      keep-alive
        component(:is="currentComponent")
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppUserCoinActions from '@/components/AppUserCoinActions.vue'
import CryptoExchange from '@/components/dynamicComponents/CryptoExchange.vue'
import AffiliateProgram from '@/components/dynamicComponents/AffiliateProgram.vue'
import InstantLoan from '@/components/dynamicComponents/InstantLoan.vue'
import InterestAccount from '@/components/dynamicComponents/InterestAccount.vue'
import MyLoans from '@/components/dynamicComponents/MyLoans.vue'
import MyWallet from '@/components/dynamicComponents/MyWallet.vue'

export default {
  data: () => {
    return {
      currentComponent: 'MyWallet'
    }
  },
  components: {
    AppHeader,
    AppUserCoinActions,
    CryptoExchange, AffiliateProgram, InstantLoan, InterestAccount, MyLoans, MyWallet
  },

  methods: {
    changeCoinComponent (content) {
      this.currentComponent = this.currentComponent !== content ? content : this.currentComponent
    }
  },
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex-direction: row;
    flex: 1;
    .nav-bar {
      display: flex;
      width: 270px;
      background-color: #fff;
    }
    .tab-content {
      display: flex;
      flex-grow: 1;
      background-color: #f0f0f0;
      padding: 3.5rem 2rem;
    }
  }
}
</style>
