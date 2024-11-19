<template>
  <div class="w-full relative">
    <!-- Hero Section with Background Image -->
    <div
      class="relative w-full bg-cover bg-center flex justify-center items-center overflow-hidden flex-col gap-y-12 py-16 px-6"
    >
      <!-- Colored Balls Behind Blur -->
      <div
        class="absolute top-10 left-10 w-[69px] h-[69px] bg-[#fee162] rounded-full opacity-80"
      ></div>
      <div
        class="absolute bottom-12 right-12 w-[39px] h-[39px] bg-blue-600 rounded-full opacity-80"
      ></div>
      <div
        class="absolute top-1/4 right-1/4 w-[49px] h-[49px] bg-red-800 rounded-full opacity-80"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-[49px] h-[49px] bg-orange-400 rounded-full opacity-80"
      ></div>

      <!-- Blurred Overlay -->
      <div
        class="absolute inset-0 bg-bgLight bg-opacity-10 backdrop-blur-md "
      ></div>

      <!-- Content on Top of Blur -->
      <h1
        class="relative text-4xl text-center lg:text-6xl text-textPrimary font-medium tracking-wide z-10"
      >
        Swap anytime,<br />
        anywhere
      </h1>

      <Swap />

      <h1
        class="text-lg text-center text-textSecondary font-medium tracking-wide z-10 sm:w-[60%] lg:w-[35%] sm:mx-auto"
      >
        The largest onchain marketplace. Buy and sell crypto on Ethereum and 11+
        other chains.
      </h1>
    </div>
  </div>
</template>

<script setup></script>
