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
              placeholder="$0"
            />
            <div
              class="flex gap-x-1 w-full justify-center items-center font-medium text-lg cursor-pointer"
            >
              <p>Select a token</p>
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
              >
                $100
              </button>
              <button
                class="text-sm px-4 outline-none py-[5px] rounded-full bottom-[1px] bg-bgSec text-textPrimary"
              >
                $300
              </button>
              <button
                class="text-sm px-4 outline-none py-[5px] rounded-full bottom-[1px] bg-bgSec text-textPrimary"
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

<script setup></script>
