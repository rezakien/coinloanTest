<template lang="pug">
div
  .head.align-items-center
    <img src="@/static/switch.svg" class="switch-icon"/> 
    h1 Crypto Exchange
  .exchanging__blocks
    .exchanging__block.exchange
      h2.border-bottom(v-if="currenciesChecked") Exchange
        | &nbsp;
        span(v-if="currenciesChecked") {{ baseCurrency.type }} to {{ quoteCurrency.type }}
      h2(v-else) Choose some of exchange types
      .base 
        .inline-flex.align-flex-end
          NumberCurrencyInput(
            label="You Pay",
            placeholder="Pay Amount",
            exchangeType="base",
            :modelCurrencies="currencies",
            :modelCurrency="baseCurrency.type",
            :modelValue="baseCurrency.value",
            @modelValueChanged="modelValueChanged",
            @modelCurrencyChanged="modelCurrencyChanged"
          )
        .available.hint
          span Available: 0 {{ baseCurrency.type }}
      .base.align-flex-end.switch-block
        .switch(v-if="currenciesChecked", @click="switchCurrencies")
          <img src="@/static/switch.svg" class="switch-icon"/>
      .base
        .inline-flex.align-flex-end
          NumberCurrencyInput(
            label="Get Amount",
            placeholder="Get Amount",
            exchangeType="quote",
            :modelCurrencies="quoteCurrencies",
            :modelCurrency="quoteCurrency.type",
            :modelValue="quoteCurrency.value",
            @modelValueChanged="modelValueChanged",
            @modelCurrencyChanged="modelCurrencyChanged"
          )
        .available.hint
          span Available: 0 {{ quoteCurrency.type }}
    .exchanging__block.summary
      h2.border-bottom Summary
      .tabled_view
        .row(v-if="baseCurrency.type")
          span.key.bold__6 Your {{ baseCurrency.type }} Balance
          span.value 0 {{ baseCurrency.type }}
        .row(v-if="quoteCurrency.type")
          span.key.bold__6 Your {{ quoteCurrency.type }} Balance
          span.value 0 {{ quoteCurrency.type }}
        .row
          span.key.bold__6 Exchange Commission
          span.value(v-if="exchangeComission") {{ exchangeComission.base_currency }} - {{ exchangeComission.quote_currency }} - {{ exchangeComission.commission }}%
          span(v-else) -
        .row
          span.key.bold__6 Exchange Rate
          span.value(v-if="exchangeRate") 1 {{ exchangeRate.pair.split('/')[0] }} = {{ exchangeRate.rate }} {{ exchangeRate.pair.split('/')[1] }}
          span(v-else) -
      button.exchange(@click="success", v-if="formFilled") Exchange
</template>

<script>
import NumberCurrencyInput from "../NumberCurrencyInput.vue"
export default {
  name: 'CryptoExchange',
  components: {
    NumberCurrencyInput
  },
  data: function () {
    return {
      intervalCurrenciesLoad: null,
      currencies: {},
      currenciesPairs: [],
      currenciesRates: [],
      comission: [
        1.0,
        2.0,
        3.0,
        4.0,
        5.0
      ],
      baseCurrency: {
        type: '',
        value: ''
      },
      quoteCurrency: {
        type: '',
        value: ''
      },
      updateRateSeconds: 15
    }
  },
  async created () {
    await this.loadCurrencies()
    
    this.intervalCurrenciesLoad = setInterval(async () => {
      await this.loadCurrencies()
      this.reCalculate()
    }, this.updateRateSeconds * 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalCurrenciesLoad)
  },
  methods: {
    async loadCurrencies () {
      await this.getCurrencies()
      this.getCurrenciesPairs()
      this.getCurrenciesRates()
      this.setDefaultCurrency()

      this.$notify({ group: 'client-notifications', text: `Currencies are loaded. Next update in ${this.updateRateSeconds} seconds` })
    },
    async getCurrencies () {
      const response = await fetch('https://openexchangerates.org/api/currencies.json')
      const data = await response.json();
      this.currencies = data;
    },
    getCurrenciesPairs () {
      let currenciesPairs = []
      if (Object.keys(this.currencies).length > 0) {
        for (const [currency, country] of Object.entries(this.currencies)) {
          for (const [currency1, country] of Object.entries(this.currencies)) {
            if (currency !== currency1) {
              currenciesPairs.push({
                base_currency: currency,
                quote_currency: currency1,
                commission: parseFloat(this.comission[Math.floor(Math.random() * this.comission.length)]).toFixed(1).toString()
              })
            }
          }
        }
        this.currenciesPairs = currenciesPairs
      }
    },
    getCurrenciesRates () {
      let currenciesRates = []
      if (Object.keys(this.currenciesPairs).length > 0) {
        for (const [index, currencyPair] of Object.entries(this.currenciesPairs)) {
          let pair = currencyPair['base_currency'] + '/' + currencyPair['quote_currency']
          let rate = Math.floor(Math.random() * 900 + 0.1).toString()
          currenciesRates.push({
            pair: pair,
            rate: rate,
            base_currency: currencyPair['base_currency'],
            quote_currency: currencyPair['quote_currency'],
          })
        }
        this.currenciesRates = currenciesRates
      }
    },
    setDefaultCurrency () {
      let eur = Object.keys(this.currencies).find(currency => currency === 'EUR')
      let btc = Object.keys(this.currencies).find(currency => currency === 'BTC')
      if (eur && btc) {
        this.baseCurrency.type = eur
        this.quoteCurrency.type = btc
      }
    },
    switchCurrencies () {
      [this.baseCurrency, this.quoteCurrency] = [this.quoteCurrency, this.baseCurrency]
    },
    modelCurrencyChanged (currencyType) {
      if (currencyType.type === 'base') {
        if (currencyType.currency === null) {
          this.emptyForm()
        } else {
          this.baseCurrency.type = currencyType.currency
        }
      } else if (currencyType.type === 'quote') {
        if (currencyType.currency === null) {
          this.quoteCurrency.value = ''
          this.quoteCurrency.type = ''
        } else {
           this.quoteCurrency.type = currencyType.currency
        }
      }
    },
    modelValueChanged (valueType) {
      this.calculateValue(valueType)
    },
    calculateValue (valueType) {
      let type, value = ''
      if ((typeof valueType) === 'object') {
        type = valueType.type
        value = valueType.value
      } else {
        type = valueType
        value = this.baseCurrency.value
      }
      if (type === 'base') {
        let res = this.calculateCurrencyValue(value, this.baseCurrency.type, this.quoteCurrency.type)
        this.baseCurrency.value = value
        this.quoteCurrency.value = res
      } else if (type === 'quote') {
        let res = this.calculateCurrencyValue(value, this.quoteCurrency.type, this.baseCurrency.type)
        this.baseCurrency.value = res
        this.quoteCurrency.value = value
      }
    },
    calculateCurrencyValue (value, currencyFrom, currencyTo) {
      let currenciesPair = this.currenciesPairs.find(item => item.base_currency === currencyFrom && item.quote_currency === currencyTo)
      let currenciesRate = this.currenciesRates.find(item => item.base_currency === currencyFrom && item.quote_currency === currencyTo)
      if (currenciesPair && currenciesRate) {
        let val = value / currenciesRate.rate
        let sum = val - val * currenciesPair.commission / 100
        return sum.toString()
      }
    },
    emptyForm () {
      this.baseCurrency.type = ''
      this.baseCurrency.value = ''
      this.quoteCurrency.type = ''
      this.quoteCurrency.value = ''
    },
    success () {
      this.$router.push({path: 'success'});
    },
    reCalculate () {
      if (this.formFilled)
        this.calculateValue('base')
    }
  },
  computed: {
    quoteCurrencies () {
      if (this.baseCurrency) {
        let availableCurrencies = this.currenciesPairs.filter(x => x.base_currency === this.baseCurrency.type)
        if (availableCurrencies.length > 0) {
          return availableCurrencies.map((currencyObj) => {
            return currencyObj.quote_currency
          })
        }
      } else return []
    },
    exchangeComission () {
      if (this.baseCurrency.type && this.quoteCurrency.type) {
        let currencyPair = this.currenciesPairs.find(courrenciesPair => courrenciesPair.base_currency === this.baseCurrency.type && courrenciesPair.quote_currency === this.quoteCurrency.type)
        if (currencyPair)
          return currencyPair
      } else
        return null
    },
    exchangeRate () {
      if (this.baseCurrency.type && this.quoteCurrency.type) {
        let currencyRate = this.currenciesRates.find(courrenciesRate => courrenciesRate.pair.startsWith(this.baseCurrency.type) && courrenciesRate.pair.endsWith(this.quoteCurrency.type))
        if (currencyRate)
          return currencyRate
      } else
        return null
    },
    currenciesChecked () {
      return this.baseCurrency.type && this.quoteCurrency.type
    },
    formFilled () {
      return this.baseCurrency.type && this.baseCurrency.value !== '' && this.quoteCurrency.type && this.quoteCurrency.value !== ''
    }
  }
}
</script>

<style lang="scss">
.head {
  display: flex;
  gap: 0.5em;
  .switch-icon {
    width: 25px;
  }
}
.exchanging__blocks {
  display: flex;
  gap: 25px;
  margin-top: 20px;
  .exchanging__block {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 500px;
    padding: 2em;
    border-radius: 10px;
    background-color: #fff;
    transition: 0.2s ease-out;
    &:hover {
      box-shadow: 6px 8px 17px -10px rgba(34, 60, 80, 0.2);
    }
    .base {
      display: flex;
      flex-direction: column;
      margin-top: 1em;
      span.title {
        margin-bottom: 0.5em;
      }
      &:nth-child(1) {
        margin-top: 2em;
      }
      .available {
        font-size: 12px;
        margin-top: 0.5rem;
        &.hint {
          color: #ccc;
        }
      }
      &.switch-block {
        height: 0;
        margin-top: 0;
        margin-right: 125px;
        .switch {
          cursor: pointer;
          .switch-icon {
            width: 25px;
            height: 25px;
            transform: rotate(90deg);
          }
        }
      }
    }
    &.summary {
      .tabled_view {
        display: flex;
        flex-direction: column;
        margin-top: 1em;
        .row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 1.5em;
        }
      }
    }
  }
}
</style>