<template>
  <div class="flex space-x-4 bg-transparent p-4">
    <NuxtLink :to="{ name: 'swap' }" :class="tabClass('swap')"> Swap </NuxtLink>
    <NuxtLink :to="{ name: 'limit' }" :class="tabClass('limit')">
      Limit
    </NuxtLink>

    <NuxtLink :to="{ name: 'send' }" :class="tabClass('send')"> Send </NuxtLink>
    <NuxtLink :to="{ name: 'buy' }" :class="tabClass('buy')"> Buy </NuxtLink>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const tabClass = (tabName) => {
  return route.name === tabName
    ? "bg-[#91909014]  text-textPrimary font-semibold py-1 px-4 rounded-full"
    : "bg-transparent text-textSecondary  font-semibold py-1 px-4 rounded-full hover:bg-[#91909014]";
};
</script>
