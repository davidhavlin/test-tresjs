// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@tresjs/nuxt', '@unocss/nuxt'],
  css: ['~/styles/global.css']
})
