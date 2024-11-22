<template>
  <div
    class="w-full px-5 sm:px-8 lg:px-12 flex flex-col justify-start items-start gap-y-5 pb-10 relative"
  >
    <div
      class="flex justify-center items-center gap-x-3 gap-y-5 text-lg font-medium mt-16"
    >
      <img
        :src="tokenStore.tokenDetails.image"
        class="w-[30px] h-[30px]"
        alt=""
      />
      <h1 class="text-textPrimary">{{ tokenStore.tokenDetails.name }}</h1>
      <h1 class="text-textSecondary">{{ symbol }}</h1>
    </div>
    <h1 class="text-textPrimary w-full text-4xl font-medium">
      ${{ tokenStore.formatPrice(tokenStore.tokenDetails.price) }}
    </h1>
    <div class="w-full flex justify-center items-center gap-x-8">
      <img
        src="~/assets/img/tokens-chart.png"
        alt=""
        class="hidden sm:block rounded-2xl"
      />
      <img
        src="~/assets/img/tokens-chart-mobile.png"
        alt=""
        class="sm:hidden block rounded-2xl"
      />
      <div class="hidden lg:block">
        <Swap />
      </div>
    </div>
    <h1 class="text-textPrimary w-full text-4xl font-medium">Stats</h1>
    <div
      class="w-full flex justify-start items-start gap-6 flex-wrap sm:justify-between font-medium"
    >
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">TVL</h1>
        <h1 class="text-textPrimary w-full text-4xl">
          ${{ tokenStore.formatPrice(tokenStore.tokenDetails.volume) }}
        </h1>
      </div>
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">FDV</h1>
        <h1 class="text-textPrimary w-full text-4xl">
          ${{
            tokenStore.tokenDetails.marketCap === 0 || null
              ? "406.0B"
              : tokenStore.formatPrice(tokenStore.tokenDetails.marketCap)
          }}
        </h1>
      </div>
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">Market cap</h1>
        <h1 class="text-textPrimary w-full text-4xl">
          ${{
            tokenStore.tokenDetails.marketCap === 0 || null
              ? "406.0B"
              : tokenStore.formatPrice(tokenStore.tokenDetails.marketCap)
          }}
        </h1>
      </div>
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">1 day volume</h1>
        <h1 class="text-textPrimary w-full text-4xl">
          ${{ tokenStore.formatPrice(tokenStore.tokenDetails.volume) }}
        </h1>
      </div>
    </div>

    <h1 class="text-textPrimary w-full text-2xl py-5 font-medium">
      Transactions
    </h1>
    <img src="~/assets/img/trans-pool.png" alt="" />

    <div
      class="fixed left-0 right-0 bottom-0 h-[80px] bg-white bg-opacity-20 backdrop-blur-md flex lg:hidden justify-around items-center"
    >
      <NuxtLink
        to="/buy"
        class="px-6 py-3 rounded-full btn-bg text-white flex gap-x-1 justify-center items-center outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M21 8V9.25H3V8C3 6 4 5 6 5H18C20 5 21 6 21 8ZM21 10.75V16C21 18 20 19 18 19H6C4 19 3 18 3 16V10.75H21ZM10.75 15C10.75 14.586 10.414 14.25 10 14.25H7C6.586 14.25 6.25 14.586 6.25 15C6.25 15.414 6.586 15.75 7 15.75H10C10.414 15.75 10.75 15.414 10.75 15Z"
            fill="white"
          ></path>
        </svg>
        <span>Buy</span>
      </NuxtLink>
      <NuxtLink
        to="/swap"
        class="px-6 py-3 rounded-full btn-bg text-white flex gap-x-1 justify-center items-center outline-none"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.28516 11.9999C1.28516 6.08243 6.08194 1.28564 11.9994 1.28564C17.9169 1.28564 22.7137 6.08243 22.7137 11.9999C22.7137 17.9174 17.9169 22.7142 11.9994 22.7142C6.08194 22.7142 1.28516 17.9174 1.28516 11.9999ZM10.9816 7.49994C10.9816 6.9378 11.4373 6.48209 11.9995 6.48209C12.5616 6.48209 13.0173 6.9378 13.0173 7.49994V14.0426L15.7798 11.2802C16.1772 10.8827 16.8217 10.8827 17.2192 11.2802C17.6167 11.6777 17.6167 12.3222 17.2192 12.7197L12.7192 17.2197C12.3217 17.6172 11.6772 17.6172 11.2798 17.2197L6.77975 12.7197C6.38225 12.3222 6.38225 11.6777 6.77975 11.2802C7.17725 10.8827 7.82172 10.8827 8.21922 11.2802L10.9816 14.0426V7.49994Z"
            fill="white"
          ></path>
        </svg>
        <span>Sell</span>
      </NuxtLink>
      <NuxtLink
        to="/send"
        class="px-6 py-3 rounded-full btn-bg text-white flex gap-x-1 justify-center items-center outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M21.421 5.66912L18.1411 18.7892C17.6711 20.6592 16.071 21.4992 14.671 21.4992C14.661 21.4992 14.6511 21.4992 14.6511 21.4992C13.2411 21.4892 11.6311 20.6292 11.1911 18.7392L10.3311 15.0893L15.7111 9.70916C16.1011 9.31916 16.1011 8.67924 15.7111 8.28924C15.3211 7.89924 14.681 7.89924 14.291 8.28924L8.91104 13.6691L5.26107 12.8093C3.37107 12.3693 2.51106 10.7593 2.50106 9.35931C2.49106 7.94931 3.33109 6.32931 5.21109 5.85931L18.3311 2.57928C19.2011 2.35928 20.1111 2.6092 20.7511 3.2492C21.3911 3.8892 21.641 4.79912 21.421 5.66912Z"
            fill="white"
          ></path>
        </svg>
        <span>Send</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useTokenStore } from "~/stores/token";
const route = useRoute();

const tokenStore = useTokenStore();
const symbol = route.params.token;

onMounted(() => {
  if (symbol) {
    tokenStore.fetchTokenDetailsBySymbol(symbol);
  }
});
</script>

<style scoped>
.btn-bg {
  background-color: rgb(73, 112, 213);
}
</style>
