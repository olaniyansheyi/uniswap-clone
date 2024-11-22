<template>
  <div class="flex justify-center items-center py-16 flex-col w-full">
    <TabNavigation />

    <div class="mt-[-15px] w-full">
      <div
        class="rounded-2xl p-t flex flex-col items-center justify-center w-full sm:w-[450px] lg:w-[500px] mx-auto z-10 p-4 gap-y-1 relative"
      >
        <div
          class="rounded-lg bg-[#91909014] flex justify-center items-center w-full py-5 px-4 flex-col text-textSecondary font-medium"
        >
          <p class="text-left text-textSecondary me-auto">You're buying</p>
          <div class="pt-10 pb-4">
            <input
              class="text-textPrimary placeholder:text-6xl outline-none bg-transparent w-[100%] mx-auto text-center text-5xl mt-4 py-4"
              type="text"
              :value="formattedInputPrice"
              placeholder="$0"
              @input="onInputChange"
            />

            <div
              @click="tokenStore.handleToggleOpenTokensModal('buy-tab')"
              class="flex gap-x-1 w-full justify-center items-center font-medium text-lg cursor-pointer"
            >
              <p v-if="tokenStore.selectedTokens.buy === null">
                Select a token
              </p>
              <div
                v-else
                class="flex justify-center items-center gap-x-1 text-textSecondary"
              >
                <img
                  :src="tokenStore.selectedTokens.buy.image"
                  class="w-[20px] h-[20px]"
                  alt=""
                />
                <p>{{ formattedUnits }}</p>
                <p>{{ tokenStore.selectedTokens.buy.symbol }}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                class="rotate-360 font-medium"
                stroke="#7d7d7d"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div
              class="flex gap-x-2 justify-center items-center font-medium pt-4"
            >
              <button
                class="text-sm px-4 outline-none py-[5px] rounded-full bottom-[1px] bg-bgSec text-textPrimary"
                @click="setInputPrice(100)"
              >
                $100
              </button>
              <button
                class="text-sm px-4 outline-none py-[5px] rounded-full bottom-[1px] bg-bgSec text-textPrimary"
                @click="setInputPrice(300)"
              >
                $300
              </button>
              <button
                class="text-sm px-4 outline-none py-[5px] rounded-full bottom-[1px] bg-bgSec text-textPrimary"
                @click="setInputPrice(1000)"
              >
                $1000
              </button>
            </div>
          </div>
        </div>

        <!-- Get Started button -->
        <button
          class="rounded-lg py-3 px-3 text-primary bg-[#fd72ff1e] text-center flex justify-center items-center font-semibold text-lg w-full order-4"
        >
          <span>Connect wallet</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTokenStore } from "~/stores/token";

const tokenStore = useTokenStore();

// Reactive variables
const inputPrice = ref(""); // Raw input price (no dollar sign)
const calculatedUnits = ref(0); // Calculated token units

// Function to calculate token units
const calculateUnit = () => {
  const tokenPrice = tokenStore.selectedTokens.buy?.price || 0; // Get token price
  const price =
    parseFloat(inputPrice.value.replace("$", "").replace(",", "")) || 0; // Clean the input (remove '$' and ',' for thousands)
  calculatedUnits.value = tokenPrice > 0 ? price / tokenPrice : 0; // Calculate units
};

// Computed property to format the input with a dollar sign (without decimals)
const formattedInputPrice = computed(() => {
  const numericValue =
    parseInt(inputPrice.value.replace("$", "").replace(",", "")) || 0; // Remove decimals and dollar sign
  return `$${numericValue}`; // Add dollar sign without decimals
});

// Computed property to format the units with a maximum of 7 decimal places
const formattedUnits = computed(() => {
  return calculatedUnits.value.toFixed(7); // Limit units to 7 decimals
});

// Handle input change to update raw input value without dollar sign
const onInputChange = (event) => {
  const inputValue = event.target.value;
  const cleanedValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  inputPrice.value = cleanedValue; // Update the raw input value (without dollar sign)
  calculateUnit(); // Recalculate units
};

// Function to set price on button click (button sets the price)
const setInputPrice = (amount) => {
  inputPrice.value = amount.toString(); // Set the price as a string (no decimals)
  calculateUnit(); // Recalculate units
};
</script>
