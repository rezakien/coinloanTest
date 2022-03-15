<template lang="pug">
ul.user__coin_actions
  li.coin_action(
    v-for="action in coinActions",
    :class="action.active === true ? 'active' : ''"
  )
    a(
      :href="action.link",
      @click.prevent="changeContent(action.componentRender)"
    ) {{ action.title }}
</template>

<script>
export default {
    name: 'AppUserCoinActions',
    data: function () {
        return {
            coinActions: [
                {
                    title: 'My Wallet',
                    link: '#',
                    icon: '',
                    active: true,
                    componentRender: 'MyWallet'
                },
                {
                    title: 'Interest Account',
                    link: '#',
                    icon: '',
                    active: false,
                    componentRender: 'InterestAccount'
                },
                {
                    title: 'Instant Loan',
                    link: '#',
                    icon: '',
                    active: false,
                    componentRender: 'InstantLoan',
                },
                {
                    title: 'My Loans',
                    link: '#',
                    icon: '',
                    active: false,
                    componentRender: 'MyLoans',
                },
                {
                    title: 'Crypto Exchange',
                    link: '#',
                    icon: '',
                    active: false,
                    componentRender: 'CryptoExchange',
                },
                {
                    title: 'Affiliate Program',
                    link: '#',
                    icon: '',
                    active: false,
                    componentRender: 'AffiliateProgram',
                },
            ]
        }
    },
    methods: {
        changeContent(content) {
            let last_active = this.coinActions.findIndex(x => x.active === true)
            let current = this.coinActions.findIndex(x => x.componentRender === content)
            if (last_active !== current) {
                this.coinActions[current].active = true
                if (last_active !== -1)
                    this.coinActions[last_active].active = false
                this.$emit('onChangeContent', content)
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.user__coin_actions {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 1rem 0rem 1rem 1rem;
  width: 100%;
  li {
    display: flex;
    &.active::before {
      content: "";
      position: relative;
      display: block;
      width: 4px;
      height: 100%;
      background-color: $primary-color;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      text-decoration: none;
      color: rgba(0, 0, 0, 0.6);
      padding: 0.8rem 0.8rem 0.8rem 2rem;
      font-weight: bold;
      &:hover {
        background-color: rgb(236, 236, 236);
      }
    }
  }
}
</style>