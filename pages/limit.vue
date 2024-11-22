<template>
  <div class="flex justify-center items-center py-16 flex-col">
    <TabNavigation />

    <div class="">
      <div
        class="rounded-2xl bg-bgLight p-t flex flex-col items-center justify-center w-full sm:w-[450px] lg:w-[500px] mx-auto z-10 p-4 gap-y-1 relative"
      >
        <!-- First Section, Order Controlled by swap State -->
        <div
          class="'rounded-2xl bg-[#91909014] bottom-[1px] flex justify-between items-start w-full py-3 px-4 order-1"
        >
          <div
            class="flex flex-col items-start justify-start text-textSecondary text-lg font-medium gap-y-3 w-[70%]"
          >
            <p>limit price</p>
            <input
              class="text-lg text-textPrimary placeholder:text-3xl outline-none bg-transparent"
              type="tenumberxt"
              placeholder="0"
              v-model.number="limitPrice"
              @input="recalculateAmounts"
            />
            <div class="flex gap-x-2 justify-center items-center font-medium">
              <button
                @click="adjustLimitPrice(0)"
                class="text-sm px-3 outline-none py-1 rounded-full bottom-[1px] border border-solid"
                :class="
                  themeStore.theme === 'dark' ? 'border-[#4943436e] ' : ''
                "
              >
                Market
              </button>
              <button
                @click="adjustLimitPrice(1)"
                class="text-sm px-3 outline-none py-1 rounded-full bottom-[1px] border border-solid"
                :class="themeStore.theme === 'dark' ? 'border-[#4943436e]' : ''"
              >
                +1%
              </button>
              <button
                @click="adjustLimitPrice(5)"
                class="text-sm px-3 outline-none py-1 rounded-full bottom-[1px] border border-solid"
                :class="themeStore.theme === 'dark' ? 'border-[#4943436e]' : ''"
              >
                +5%
              </button>
              <button
                @click="adjustLimitPrice(10)"
                class="text-sm px-3 outline-none py-1 rounded-full bottom-[1px] border border-solid"
                :class="themeStore.theme === 'dark' ? 'border-[#4943436e]' : ''"
              >
                +10%
              </button>
            </div>
          </div>

          <div
            class="flex flex-col gap-y-5 justify-end items-end pt-2 p-1 cursor-pointer"
          >
            <svg
              @click="
                () => {
                  toggleSwap();
                }
              "
              width="16px"
              height="16px"
              viewBox="0 3 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="themeStore.theme === 'dark' ? 'color-white' : ''"
            >
              <path
                d="M19.4834 5.71191C19.0879 5.29883 18.4727 5.30762 18.0859 5.71191L13.6562 10.2471C13.4805 10.4229 13.3662 10.6953 13.3662 10.9326C13.3662 11.4863 13.7529 11.8643 14.2979 11.8643C14.5615 11.8643 14.7725 11.7764 14.9482 11.5918L16.7588 9.71094L17.9189 8.375L17.8486 10.2383L17.8486 21.6465C17.8486 22.1914 18.2441 22.5869 18.7891 22.5869C19.334 22.5869 19.7207 22.1914 19.7207 21.6465L19.7207 10.2383L19.6592 8.375L20.8105 9.71094L22.6211 11.5918C22.7969 11.7764 23.0166 11.8643 23.2803 11.8643C23.8164 11.8643 24.2031 11.4863 24.2031 10.9326C24.2031 10.6953 24.0889 10.4229 23.9131 10.2471L19.4834 5.71191ZM7.84668 22.2793C8.24218 22.6924 8.85742 22.6836 9.24414 22.2793L13.6738 17.7529C13.8496 17.5684 13.9639 17.2959 13.9639 17.0586C13.9639 16.5137 13.5771 16.1357 13.0322 16.1357C12.7773 16.1357 12.5576 16.2236 12.3818 16.3994L10.5713 18.2803L9.41992 19.6162L9.48144 17.7529L9.48144 6.34473C9.48144 5.80859 9.08594 5.4043 8.54101 5.4043C8.00488 5.4043 7.60937 5.80859 7.60937 6.34473L7.60937 17.7529L7.6709 19.6162L6.51953 18.2803L4.70898 16.3994C4.5332 16.2236 4.31347 16.1357 4.05859 16.1357C3.51367 16.1357 3.12695 16.5137 3.12695 17.0586C3.12695 17.2959 3.24121 17.5684 3.41699 17.7529L7.84668 22.2793Z"
                fill="currentColor"
              ></path>
            </svg>

            <div
              v-if="
                tokenStore.selectedTokens.limit.sell !== null &&
                tokenStore.selectedTokens.limit.buy !== null
              "
              class="rounded-full bottom-[1px] flex px-3 py-2 justify-center items-center gap-x-2 border border-solid"
              :class="
                themeStore.theme === 'dark'
                  ? 'bg-bgSec border-none'
                  : 'bg-[#e2e0e014]'
              "
            >
              <img
                :src="
                  isSell
                    ? tokenStore.selectedTokens.limit.sell.image
                    : tokenStore.selectedTokens.limit.buy.image
                "
                class="w-[20px] h-[20px]"
              />
              <div class="flex">
                <h1 class="text-textPrimary font-medium gap-x-1">
                  {{
                    isSell
                      ? tokenStore.selectedTokens.limit.sell.symbol
                      : tokenStore.selectedTokens.limit.buy.symbol
                  }}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <!-- Second Section, Order Controlled by swap State -->
        <div
          :class="[
            'rounded-2xl bg-[#91909014] bottom-[1px] flex justify-between items-center w-full py-5 px-4 ',
            swap ? 'order-3' : 'order-2',
          ]"
        >
          <div
            class="flex flex-col items-start justify-start text-textSecondary text-lg font-medium gap-y-3 w-[65%]"
          >
            <p>{{ swap ? "Buy" : "Sell" }}</p>
            <input
              class="text-lg text-textPrimary placeholder:text-3xl outline-none bg-transparent"
              type="number"
              placeholder="0"
              v-model.number="sellAmount"
              @input="recalculateBuyAmount"
            />
          </div>

          <button
            v-if="tokenStore.selectedTokens.limit.sell === null"
            @click="tokenStore.handleToggleOpenTokensModal('limit-sell-tab')"
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
            @click="tokenStore.handleToggleOpenTokensModal('limit-sell-tab')"
            class="rounded-full bottom-[1px] border border-solid flex px-3 py-2 justify-center items-center gap-x-2"
            :class="
              themeStore.theme === 'dark'
                ? 'bg-bgSec border-none'
                : 'bg-[#e2e0e014]'
            "
          >
            <img
              :src="tokenStore.selectedTokens.limit.sell.image"
              class="w-[28px] h-[28px]"
            />
            <div class="flex">
              <h1 class="text-textPrimary font-medium gap-x-1">
                {{ tokenStore.selectedTokens.limit.sell.symbol }}
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

        <!-- third section -->
        <div
          :class="[
            'rounded-2xl bg-[#91909014] bottom-[1px] flex justify-between items-center w-full py-5 px-4 ',
            swap ? 'order-2' : 'order-3',
          ]"
        >
          <div
            class="flex flex-col items-start justify-start text-textSecondary text-lg font-medium gap-y-3 w-[65%]"
          >
            <p>{{ swap ? "Sell" : "Buy" }}</p>
            <input
              class="text-lg text-textPrimary placeholder:text-3xl outline-none bg-transparent"
              type="number"
              placeholder="0"
              v-model.number="buyAmount"
              @input="recalculateSellAmount"
            />
          </div>

          <button
            v-if="tokenStore.selectedTokens.limit.buy === null"
            @click="tokenStore.handleToggleOpenTokensModal('limit-buy-tab')"
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
            @click="tokenStore.handleToggleOpenTokensModal('limit-sell-tab')"
            class="rounded-full bottom-[1px] border border-solid flex px-3 py-2 justify-center items-center gap-x-2"
            :class="
              themeStore.theme === 'dark'
                ? 'bg-bgSec border-none'
                : 'bg-[#e2e0e014]'
            "
          >
            <img
              :src="tokenStore.selectedTokens.limit.buy.image"
              class="w-[28px] h-[28px]"
            />
            <div class="flex">
              <h1 class="text-textPrimary font-medium gap-x-1">
                {{ tokenStore.selectedTokens.limit.buy.symbol }}
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

        <!-- Toggle button to swap sections -->
        <button
          @click="toggleSwap"
          class="absolute left-1/2 transform -translate-x-1/2 top-[53%] flex justify-center items-center p-2 rounded-2xl border-solid border-[4px] bg-[#91909014]"
          :class="
            themeStore.theme === 'dark' ? 'border-[#4943436e]' : 'border-white'
          "
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

        <!-- Get Started button -->
        <button
          class="rounded-lg py-4 px-3 text-primary bg-[#fd72ff1e] text-center font-semibold text-lg w-full order-4"
        >
          Connect wallet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";

const tokenStore = useTokenStore();
const themeStore = useThemeStore();

const isSell = ref(true); // Toggles between Sell and Buy modes
const swap = ref(false);
const limitPrice = ref(0); // Price of 1 unit of the token
const sellAmount = ref(0); // Amount to sell
const buyAmount = ref(0); // Amount to buy

// Computed property to track current token prices
const currentPrice = computed(() =>
  isSell.value
    ? tokenStore.selectedTokens.limit.sell?.price || 0
    : tokenStore.selectedTokens.limit.buy?.price || 0
);

// Watch for token price changes and update Limit Price
watch(currentPrice, (newPrice) => {
  limitPrice.value = newPrice;
});

// Adjust the limit price by a percentage
const adjustLimitPrice = (percentage) => {
  if (percentage === 0) {
    limitPrice.value = limitPrice.value * 1;
    recalculateAmounts();
    return;
  }

  limitPrice.value += (limitPrice.value * percentage) / 100;
  recalculateAmounts();
};

// Toggle between Sell and Buy modes
const toggleSwap = () => {
  isSell.value = !isSell.value;
  limitPrice.value = currentPrice.value;
  recalculateAmounts();
};

// Calculate Buy Amount from Sell Amount and Limit Price
const recalculateBuyAmount = () => {
  if (limitPrice.value > 0) {
    buyAmount.value = sellAmount.value * limitPrice.value;
  }
};

// Calculate Sell Amount from Buy Amount and Limit Price
const recalculateSellAmount = () => {
  if (limitPrice.value > 0) {
    sellAmount.value = buyAmount.value / limitPrice.value;
  }
};

// Recalculate both amounts if Limit Price changes
const recalculateAmounts = () => {
  if (sellAmount.value > 0) {
    recalculateBuyAmount();
  } else if (buyAmount.value > 0) {
    recalculateSellAmount();
  }
};
</script>
