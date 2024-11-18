<template>
  <div
    class="py-10 w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-y-8 justify-start items-start"
  >
    <h1 class="text-textPrimary tracking-wide sm:text-4xl text-3xl font-medium">
      Trusted by millions
    </h1>
    <div
      class="flex justify-center items-center w-full gap-x-5 gap-y-14 text-textPrimary flex-wrap"
    >
      <div
        class="flex flex-col justify-start items-start gap-y-5 w-full text-left sm:w-[48%] order-2 sm:order-1"
      >
        <p>
          Uniswap products are powered by the Uniswap Protocol. The protocol is
          the largest onchain marketplace, with billions of dollars in weekly
          volume across thousands of tokens on Ethereum and 7+ additional chains
        </p>
        <button
          class="py-3 px-7 rounded-full bg-[#F9F9F9] text-textPrimary font-medium flex gap-x-2 justify-center items-center"
        >
          <span> Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#222222"
            stroke="#F9F9F9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 16 16 12 12 8"></polyline>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>
      <div
        class="flex justify-center items-center flex-wrap gap-5 w-full sm:w-[48%] order-1 sm:order-2"
      >
        <div
          class="bg-[#F9F9F9] rounded-2xl p-4 flex flex-col justify-between h-[220px] w-[45%]"
        >
          <p class="text-textSecondary text-lg">All time volume</p>
          <p class="text-textPrimary text-3xl font-semibold">$2.2T</p>
        </div>
        <div
          class="bg-[#F9F9F9] rounded-2xl p-4 flex flex-col justify-between h-[220px] w-[45%] font-semibold"
        >
          <p class="text-textSecondary text-lg">All time swappers</p>
          <p class="text-textPrimary text-3xl font-semibold">16.6M</p>
        </div>
        <div
          class="bg-[#F9F9F9] rounded-2xl p-4 flex flex-col justify-between h-[220px] w-[45%]"
        >
          <p class="text-textSecondary text-lg">All time LPfees</p>
          <p class="text-textPrimary text-3xl font-semibold">$3.4B</p>
        </div>
        <div
          class="bg-[#F9F9F9] rounded-2xl p-4 flex flex-col justify-between h-[220px] w-[45%] text-[#40B66B]"
        >
          <p class="text-lg">24H volume</p>
          <p class="text-3xl font-semibold">$1.4B</p>
        </div>
      </div>
    </div>
  </div>
</template>
