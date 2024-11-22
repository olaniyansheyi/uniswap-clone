<template>
  <div
    class="rounded-2xl bg-bgLight p-t flex flex-col items-center justify-center w-full sm:w-[450px] lg:w-[500px] mx-auto z-10 p-4 gap-y-1 relative"
  >
    <!-- First Section, Order Controlled by swap State -->
    <div
      :class="[
        'rounded-2xl bg-[#5a565614] bottom-[1px] border border-solid  flex justify-between items-center w-full py-3 px-4',
        swap ? 'order-2' : 'order-1',
        themeStore.theme === 'dark' ? 'border-[#4943436e]' : '',
      ]"
    >
      <div
        class="flex flex-col items-start justify-start text-textSecondary text-lg font-medium gap-y-3 w-[55%]"
      >
        <p>{{ swap ? "Buy" : "Sell" }}</p>
        <input
          class="text-textSecondary text-3xl placeholder:text-3xl outline-none bg-transparent"
          placeholder="0"
          v-model="sellUnit"
          type="number"
          @input="handleSellUnitInput"
        />
        <p class="text-textSecondary text-lg">
          ${{
            tokenStore.formatPrice(
              tokenStore.selectedTokens.swap.sell?.price * sellUnit
            )
          }}
        </p>
      </div>

      <button
        v-if="tokenStore.selectedTokens.swap.sell === null"
        @click="tokenStore.handleToggleOpenTokensModal('sell')"
        class="text-white px-2 py-2 rounded-full outline-none border-none flex justify-center items-center gap-x-1 font-medium bg-primary whitespace-nowrap text-xs"
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

      <div
        v-else
        @click="tokenStore.handleToggleOpenTokensModal('sell')"
        class="rounded-full bg-[#e2e0e014] bottom-[1px] border border-solid border-[#4943436e] flex px-3 py-2 justify-center items-center gap-x-2 cursor-pointer"
      >
        <img
          :src="tokenStore.selectedTokens.swap.sell.image"
          class="w-[28px] h-[28px]"
        />
        <div class="flex">
          <h1 class="text-textPrimary font-medium gap-x-1">
            {{ tokenStore.selectedTokens.swap.sell.symbol }}
          </h1>
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
          class="text-textSecondary text-3xl placeholder:text-3xl outline-none bg-transparent"
          v-model="buyUnit"
          type="number"
          @input="handleBuyUnitInput"
          placeholder="0"
        />
        <p class="text-textSecondary text-lg">
          ${{
            tokenStore.formatPrice(
              tokenStore.selectedTokens.swap.buy?.price * buyUnit
            )
          }}
        </p>
      </div>

      <button
        v-if="tokenStore.selectedTokens.swap.buy === null"
        @click="tokenStore.handleToggleOpenTokensModal('buy')"
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

      <div
        v-else
        @click="tokenStore.handleToggleOpenTokensModal('buy')"
        class="rounded-full bg-[#e2e0e014] bottom-[1px] border border-solid border-[#4943436e] flex px-3 py-2 justify-center items-center gap-x-2 cursor-pointer"
      >
        <img
          :src="tokenStore.selectedTokens.swap.buy.image"
          class="w-[28px] h-[28px]"
        />
        <div class="flex">
          <h1 class="text-textPrimary font-medium gap-x-1">
            {{ tokenStore.selectedTokens.swap.buy.symbol }}
          </h1>
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

      <!-- Toggle button to swap sections -->
      <button
        @click="toggleSwap"
        class="absolute left-1/2 transform -translate-x-1/2 top-[34%] flex justify-center items-center p-2 rounded-2xl border-solid border-[4px] bg-[#91909014]"
        :class="
          themeStore.theme === 'dark' ? 'border-[#4943436e]' : 'border-white'
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          style="width: 24px; height: 24px; transform: rotateZ(0deg)"
          :style="
            themeStore.theme === 'dark'
              ? 'color: #FFFFFF;'
              : 'color: rgb(34, 34, 34);'
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
import { ref, watch } from "vue";
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";

const tokenStore = useTokenStore();
const themeStore = useThemeStore();
const swap = ref(false);
const menuStore = useMenuStore();

const sellUnit = ref(0); // Input for sell amount
const buyUnit = ref(0); // Input for buy amount

const toggleSwap = () => {
  swap.value = !swap.value;
};

const handleSellUnitInput = () => {
  const sellToken = tokenStore.selectedTokens.swap.sell;
  const buyToken = tokenStore.selectedTokens.swap.buy;

  if (sellToken && buyToken && sellToken.price && buyToken.price) {
    const sellValue = parseFloat(sellUnit.value);
    if (!isNaN(sellValue) && sellValue >= 0) {
      // Calculate and limit to three decimals
      const calculatedBuyUnit = sellValue * (sellToken.price / buyToken.price);
      buyUnit.value = parseFloat(calculatedBuyUnit.toFixed(6));
    } else {
      buyUnit.value = 0; // Reset to avoid invalid state
    }
  } else {
    buyUnit.value = 0; // Reset when prices or tokens are invalid
  }
};

const handleBuyUnitInput = () => {
  const sellToken = tokenStore.selectedTokens.swap.sell;
  const buyToken = tokenStore.selectedTokens.swap.buy;

  if (sellToken && buyToken && sellToken.price && buyToken.price) {
    const buyValue = parseFloat(buyUnit.value);
    if (!isNaN(buyValue) && buyValue >= 0) {
      // Calculate and limit to three decimals
      const calculatedSellUnit = buyValue * (buyToken.price / sellToken.price);
      sellUnit.value = parseFloat(calculatedSellUnit.toFixed(6));
    } else {
      sellUnit.value = 0; // Reset to avoid invalid state
    }
  } else {
    sellUnit.value = 0; // Reset when prices or tokens are invalid
  }
};

// Watch for token changes and reset units
watch(
  () => tokenStore.selectedTokens.swap.sell,
  (newValue) => {
    if (newValue) {
      sellUnit.value = 0;
      buyUnit.value = 0;
    }
  }
);

watch(
  () => tokenStore.selectedTokens.swap.buy,
  (newValue) => {
    if (newValue) {
      sellUnit.value = 0;
      buyUnit.value = 0;
    }
  }
);
</script>
