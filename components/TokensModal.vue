<template>
  <div class="fixed inset-0 z-50">
    <div
      class="z-10 fixed inset-0 bg-black bg-opacity-50"
      @click="menuStore.handleToggleOpenTokensModal"
    ></div>

    <div
      class="bg-bgLight fixed left-0 right-0 bottom-0 top-[10%] rounded-t-2xl sm:rounded-2xl z-20 py-12 sm:py-6 px-6 overflow-y-auto sm:shadow-xl shadow-black sm:w-[400px] sm:h-[92%] sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2"
    >
      <div class="w-full flex justify-between items-center pe-5">
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7D7D7D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Tokens"
            class="w-full rounded-full text-textSecondary py-[14px] px-4 pl-12 outline-none bg-[#e2dddd3b]"
          />
        </div>
      </div>

      <div class="flex justify-start items-center gap-x-2 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
        <p class="text-sm text-textSecondary tracking-wide font-medium">
          Popular tokens
        </p>
      </div>
      <div class="my-3 w-full flex justify-between items-center font-medium">
        <div
          class="w-[70px] py-2 flex justify-center items-center bg-[#e2dddd3b] rounded-2xl"
        >
          <div class="flex flex-col justify-center items-center">
            <img src="~/assets/img/eth.png" class="w-[28px] h-[28px]" />
            <h1 class="">ETH</h1>
          </div>
        </div>
        <div
          class="w-[70px] py-2 flex justify-center items-center bg-[#e2dddd3b] rounded-2xl"
        >
          <div class="flex flex-col justify-center items-center">
            <img src="~/assets/img/usdc.png" class="w-[28px] h-[28px]" />
            <h1 class="">USDC</h1>
          </div>
        </div>
        <div
          class="w-[70px] py-2 flex justify-center items-center bg-[#e2dddd3b] rounded-2xl"
        >
          <div class="flex flex-col justify-center items-center">
            <img src="~/assets/img/tether.png" class="w-[28px] h-[28px]" />
            <h1 class="text-lg">USDT</h1>
          </div>
        </div>
        <div
          class="w-[70px] py-2 flex justify-center items-center bg-[#e2dddd3b] rounded-2xl"
        >
          <div class="flex flex-col justify-center items-center">
            <img src="~/assets/img/eth.png" class="w-[28px] h-[28px]" />
            <h1 class="text-lg">ETH</h1>
          </div>
        </div>
        <div
          class="w-[70px] py-2 flex justify-center items-center bg-[#e2dddd3b] rounded-2xl"
        >
          <div class="flex flex-col justify-center items-center">
            <img src="~/assets/img/eth.png" class="w-[28px] h-[28px]" />
            <h1 class="text-lg">ETH</h1>
          </div>
        </div>
      </div>

      <div class="flex justify-start items-center gap-x-2 py-2">
        <svg
          viewBox="0 0 18 17"
          fill="none"
          stroke-width="8"
          style="color: rgb(125, 125, 125); width: 16px; height: 16px"
        >
          <path
            d="M8.80054 0.829883L10.4189 4.09404C10.5406 4.33988 10.7756 4.50989 11.0481 4.54906L14.7838 5.08902C15.4688 5.18818 15.7422 6.0282 15.2464 6.50987L12.5456 9.13071C12.3481 9.32238 12.258 9.5982 12.3047 9.86904L12.9221 13.4557C13.0471 14.1832 12.283 14.7382 11.628 14.3957L8.38805 12.6999C8.14471 12.5724 7.85469 12.5724 7.61219 12.6999L4.37468 14.394C3.71885 14.7374 2.95216 14.1815 3.07799 13.4524L3.69556 9.86904C3.74223 9.5982 3.65218 9.32238 3.45468 9.13071L0.753871 6.50987C0.257205 6.0282 0.530481 5.18818 1.21631 5.08902L4.95217 4.54906C5.22384 4.50989 5.45885 4.33988 5.58135 4.09404L7.19969 0.829883C7.52553 0.167383 8.47221 0.167383 8.80054 0.829883Z"
            fill="currentColor"
          ></path>
        </svg>
        <p class="text-lg text-textSecondary tracking-wide font-medium">
          Tokens
        </p>
      </div>

      <!-- Tokens list -->

      <div
        class="w-full flex flex-col gap-y-1 justify-center items-center font-medium py-3"
      >
        <div
          class="w-full me-auto flex justify-start items-start gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img src="~/assets/img/usdc.png" class="w-[40px] h-[40px]" />
          <div class="flex flex-col justify-start items-start">
            <p class="text-textPrimary">USD Coin</p>
            <p class="text-textSecondary">USDC</p>
          </div>
        </div>
        <div
          class="w-full me-auto flex justify-start items-start gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img src="~/assets/img/tether.png" class="w-[40px] h-[40px]" />
          <div class="flex flex-col justify-start items-start">
            <p class="text-textPrimary">Tether protocol token</p>
            <p class="text-textSecondary">USDT</p>
          </div>
        </div>
        <div
          class="w-full me-auto flex justify-start items-start gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img src="~/assets/img/usdc.png" class="w-[40px] h-[40px]" />
          <div class="flex flex-col justify-start items-start">
            <p class="text-textPrimary">USD Coin</p>
            <p class="text-textSecondary">USDC</p>
          </div>
        </div>
        <div
          class="w-full me-auto flex justify-start items-start gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img src="~/assets/img/usdc.png" class="w-[40px] h-[40px]" />
          <div class="flex flex-col justify-start items-start">
            <p class="text-textPrimary">USD Coin</p>
            <p class="text-textSecondary">USDC</p>
          </div>
        </div>
        <div
          class="w-full me-auto flex justify-start items-start gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img src="~/assets/img/usdc.png" class="w-[40px] h-[40px]" />
          <div class="flex flex-col justify-start items-start">
            <p class="text-textPrimary">USD Coin</p>
            <p class="text-textSecondary">USDC</p>
          </div>
        </div>
        <div
          class="w-full me-auto flex justify-start items-start gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img src="~/assets/img/usdc.png" class="w-[40px] h-[40px]" />
          <div class="flex flex-col justify-start items-start">
            <p class="text-textPrimary">USD Coin</p>
            <p class="text-textSecondary">USDC</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from "~/stores/menu";

const menuStore = useMenuStore();
</script>
