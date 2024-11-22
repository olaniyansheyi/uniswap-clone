<template>
  <div class="fixed inset-0 z-50">
    <div
      class="z-10 fixed inset-0 bg-black bg-opacity-50"
      @click="tokenStore.handleCloseModal"
    ></div>

    <div
      class="bg-bgLight fixed left-0 right-0 bottom-0 top-[10%] rounded-t-2xl sm:rounded-2xl z-20 py-12 sm:py-6 px-6 overflow-y-auto sm:shadow-xl shadow-black sm:w-[400px] sm:h-[92%] sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2"
      @scroll.passive="handleScroll"
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
            v-model="query"
            @input="handleSearch"
            placeholder="Search Tokens"
            class="w-full rounded-full text-textSecondary py-[14px] px-4 pl-12 outline-none"
            :class="
              themeStore.theme === 'dark' ? 'bg-[#413c3c6e]' : 'bg-[#e2dddd3b]'
            "
          />
        </div>
      </div>

      <!-- Tokens List -->
      <div v-if="tokenStore.loading" class="text-center">Loading...</div>
      <div v-else>
        <div
          v-for="token in tokenStore.tokens"
          :key="token.address"
          @click="
            () => {
              tokenStore.handleSelectedToken({
                symbol: token.symbol,
                image: token.image,
                price: token.price,
              });
              tokenStore.handleCloseModal();
            }
          "
          class="w-full flex items-center gap-x-4 p-2 rounded-2xl hover:bg-[#e2dddd3b]"
        >
          <img :src="token.image" class="w-[40px] h-[40px]" />
          <div class="flex flex-col">
            <p class="text-textPrimary">{{ token.name }}</p>
            <p class="text-textSecondary">{{ token.symbol }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";

const themeStore = useThemeStore();
const menuStore = useMenuStore();

const query = ref("");
const debounceTimeout = ref(null);
const tokenStore = useTokenStore();

const handleSearch = () => {
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    if (!query.value.trim()) {
      tokenStore.resetTokens();
      tokenStore.fetchPopularTokens();
    } else {
      tokenStore.searchTokens(query.value);
    }
  }, 700); // Debounce API calls
};

const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    tokenStore.fetchPopularTokens();
  }
};

onMounted(() => {
  tokenStore.fetchPopularTokens(); // Fetch first 20 tokens on mount
});
</script>
