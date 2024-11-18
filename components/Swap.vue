<template>
  <div
    class="rounded-2xl bg-white p-t flex flex-col items-center justify-center w-full sm:w-[450px] lg:w-[500px] mx-auto z-10 p-4 gap-y-1 relative"
  >
    <!-- First Section, Order Controlled by swap State -->
    <div
      :class="[
        'rounded-2xl bg-[#e2e0e014] bottom-[1px] border border-solid border-[rgba(34, 34, 34, 0.08)] flex justify-between items-center w-full py-3 px-4',
        swap ? 'order-2' : 'order-1',
      ]"
    >
      <div
        class="flex flex-col items-start justify-start text-textSecondary text-lg font-medium gap-y-3 w-[65%]"
      >
        <p>{{ swap ? "Buy" : "Sell" }}</p>
        <input
          class="text-lg text-textPrimary placeholder:text-3xl outline-none bg-transparent"
          type="text"
          placeholder="0"
        />
        <p>$0</p>
      </div>

      <div
        @click="menuStore.handleToggleOpenTokensModal"
        class="rounded-full bg-white bg-[#e2e0e014] bottom-[1px] border border-solid border-[rgba(34, 34, 34, 0.08)] flex px-3 py-2 justify-center items-center gap-x-2 cursor-pointer"
      >
        <img src="~/assets/img/eth.png" class="w-[28px] h-[28px]" />
        <div class="flex">
          <h1 class="text-textPrimary font-medium gap-x-1">ETH</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            class="rotate-360 font-medium"
            stroke="#7D7D7D"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Second Section, Order Controlled by swap State -->
    <div
      :class="[
        'rounded-2xl bg-[#91909014] bottom-[1px] flex justify-between items-center w-full py-5 px-4 ',
        swap ? 'order-1' : 'order-2',
      ]"
    >
      <div
        class="flex flex-col items-start justify-start text-textSecondary text-lg font-medium gap-y-3 w-[55%]"
      >
        <p>{{ swap ? "Sell" : "Buy" }}</p>
        <input
          class="text-lg text-textPrimary placeholder:text-3xl outline-none bg-transparent"
          type="text"
          placeholder="0"
        />
      </div>

      <button
        @click="menuStore.handleToggleOpenTokensModal"
        class="text-white px-3 py-2 rounded-full outline-none border-none flex justify-center items-center gap-x-2 font-medium bg-primary whitespace-nowrap text-xs"
      >
        <span>Select token</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          class="rotate-360 font-medium"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <!-- Toggle button to swap sections -->
      <button
        @click="toggleSwap"
        class="absolute left-1/2 transform -translate-x-1/2 top-[34%] flex justify-center items-center p-2 rounded-2xl border-solid border-white border-[4px] bg-[#91909014]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          style="
            color: rgb(34, 34, 34);
            width: 24px;
            height: 24px;
            transform: rotateZ(0deg);
          "
        >
          <path
            d="M12 5V19"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M19 12L12 19L5 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Get Started button -->
    <button
      class="rounded-lg py-4 px-3 text-primary bg-[#fd72ff1e] text-center font-semibold text-lg w-full order-3"
    >
      Connect wallet
    </button>
  </div>
</template>

<script setup>
import { useMenuStore } from "~/stores/menu";

const swap = ref(false);
const menuStore = useMenuStore();

const toggleSwap = () => {
  swap.value = !swap.value;
};
</script>
