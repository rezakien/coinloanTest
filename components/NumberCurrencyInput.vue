<template lang="pug">
div
  .form-input-group 
    label.bold__6(:for="inputId") {{ label }}
    .inline-flex
      input.form-input(
        :id="inputId",
        v-model="value",
        :placeholder="placeholder",
        @input="onModelValueChange"
      )
      v-select.form-input-select(
        :options="currenciesList",
        v-model="currency",
        v-on:input="onModelCurrencyChange"
      )
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'NumberCurrencyInput.vue',
  props: {
    label: {
      type: String,
      required: true,
    },
    exchangeType: {
      type: String,
      required: true
    },
    modelCurrency: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true
    },
    modelCurrencies: {
      type: Object | Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  data: () => {
    return {
      value: '',
      currency: '',
      currencies: null,
      userEntered: false
    }
  },
  updated () {
    if (this.modelValue === '') {
      this.modelValue = ''
    }
  },
  computed: {
    inputId () {
      return _.camelCase(this.label)
    },
    currenciesList () {
      if (this.currencies) {
        if (this.exchangeType === 'base') {
          return Object.keys(this.currencies)
        } else {
          return this.currencies
        }
      }
    }
  },
  methods: {
    onModelValueChange (event) {
      const regex = new RegExp(/^[0-9]+\.?\d{0,}$/, 'g')
      let value = event.target.value
      
      if (this.userEntered === false)
        this.userEntered = true
      
      if (!value.match(regex)) {
        this.value = ''
      }
      this.$emit('modelValueChanged', {
        type: this.exchangeType,
        value: value
      })
    },
    onModelCurrencyChange (currency) {
      this.$emit('modelCurrencyChanged', {
          type: this.exchangeType,
          currency: currency
        })
    }
  },
  watch: {
    modelValue (newValue) {
      this.value = newValue
    },
    modelCurrency (newValue) {
      this.currency = newValue
    },
    modelCurrencies (newValue) {
      this.currencies = newValue
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input-group {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.5em;
  }
}
</style>