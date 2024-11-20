// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  app: {
    head: {
      title: "uniswap",
      meta: [
        {
          name: "trading platform",
          content: "Trade crypto an NFTs on the top Defi platform",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
});
