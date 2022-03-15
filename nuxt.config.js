module.exports = {
  ssr: false,
  plugins: [
    '~/plugins/notifications.js',
  ],
  modules: [
    'nuxt-vue-select',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/global/variables.scss',
      '~/assets/scss/global/layout.scss',
    ]
  },
  head: {
    title: 'TestApp Coinloan.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'https://app.coinloan.io/favicon-32x32.png' }
    ]
  },
  build: {
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}