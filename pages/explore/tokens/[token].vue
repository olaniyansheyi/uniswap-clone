<template>
  <div
    class="w-full px-5 sm:px-8 lg:px-12 flex flex-col justify-start items-start gap-y-5 pb-10"
  >
    <div
      class="flex justify-center items-center gap-x-3 gap-y-5 text-lg font-medium mt-16"
    >
      <img src="~/assets/img/eth.png" class="w-[30px] h-[30px]" alt="" />
      <h1 class="text-textPrimary">Ethereum</h1>
      <h1 class="text-textSecondary">ETH</h1>
    </div>
    <h1 class="text-textPrimary w-full text-4xl font-medium">$3,187.08</h1>
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
      class="w-full flex justify-start items-start gap-6 flex-wrap sm:justify-between"
    >
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">TVL</h1>
        <h1 class="text-textPrimary w-full text-4xl">$1.9B</h1>
      </div>
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">FDV</h1>
        <h1 class="text-textPrimary w-full text-4xl">$383.5B</h1>
      </div>
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">Market cap</h1>
        <h1 class="text-textPrimary w-full text-4xl">$383.5B</h1>
      </div>
      <div class="flex flex-col justify-start items-start w-[45%] sm:w-auto">
        <h1 class="text-textSecondary text-sm">1 ay volume</h1>
        <h1 class="text-textPrimary w-full text-4xl">$1.9B</h1>
      </div>
    </div>

    <h1 class="text-textPrimary w-full text-2xl py-5 font-medium">
      Transactions
    </h1>
    <img src="~/assets/img/trans-pool.png" alt="" />
  </div>
</template>

<script setup></script>
