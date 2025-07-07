// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt'
  ],
  nitro: {
    devProxy: {
      '/api/medusa': {
        target: 'https://xclusive-medusa-production.up.railway.app',
        changeOrigin: true,
        prependPath: false,
        ws: false,
        rewrite: (path: string) => path.replace(/^\/api\/medusa/, '')
      }
    }
  },
  runtimeConfig: {
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    }
  },
  css: [],
  app: {
    head: {
      title: 'Xclusive Digital Printing Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional digital printing services - banners, decals, signs, and custom graphics with e-commerce shopping cart.' }
      ]
    }
  }
})