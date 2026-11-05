// SPA em Nuxt 4 
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },
  telemetry: false,

  ssr: false,

  modules: ['@pinia/nuxt'],


  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.thedogapi.com/v1',
      apiKey: '',
    },
  },

  css: ['~/assets/scss/principal.scss'],

  app: {
    pageTransition: { name: 'pagina', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Patinhas que Transformam — Adoção responsável de cães',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portal de adoção responsável: conheça os cães disponíveis, filtre por temperamento, favoritos e adote seu novo melhor amigo.',
        },
        { name: 'theme-color', content: '#5f3722' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        
        scss: {
          additionalData: '@use "~/assets/scss/_variaveis" as *; @use "~/assets/scss/_mixins" as *;',
        },
      },
    },
  },

})
