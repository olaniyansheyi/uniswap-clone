<template>
  <div class="fixed inset-0 z-50">
    <div
      class="z-10 fixed inset-0 bg-black bg-opacity-50 sm:bg-transparent"
      @click="menuStore.handleToggleGlobalPreference"
    ></div>

    <div
      class="bg-bgLight fixed left-0 right-0 bottom-0 top-[65%] rounded-t-2xl sm:bottom-auto sm:rounded-2xl z-20 pt-10 sm:py-6 px-6 overflow-y-auto sm:shadow-xl shadow-black sm:top-[11%] sm:right-[3%] sm:left-auto sm:w-[330px] tracking-wider"
    >
      <h1 class="text-lg font-medium text-textPrimary">Global preferences</h1>
      <div class="py-4 flex flex-col gap-y-4 w-full cursor-pointer">
        <div class="w-full flex justify-between items-center">
          <p class="text-textSecondary text-lg">Theme</p>
          <div
            class="flex items-center justify-center gap-x-4 p-1 rounded-full border-[1px]"
            :class="
              themeStore.theme === 'dark' && !themeStore.auto
                ? 'border-[#5f5c5c6e]'
                : 'border-[#2b292915]'
            "
          >
            <div
              @click="themeStore.resetToAuto"
              class="h-[29px] w-[60px] flex justify-center items-center rounded-full"
              :class="themeStore.auto ? 'bg-[#4943436e]' : ''"
            >
              <h1 class="text-textPrimary text-sm">Auto</h1>
            </div>
            <div
              @click="themeStore.handleToggleTheme"
              class="h-[29px] w-[60px] flex justify-center items-center rounded-full"
              :class="themeStore.theme === 'light' ? 'bg-[#4943436e]' : ''"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="8"
                style="width: 20px; height: 20px"
                :class="themeStore.theme === 'dark' ? 'color-white' : ''"
              >
                <path
                  d="M16.5 12C16.5 14.481 14.481 16.5 12 16.5C9.519 16.5 7.5 14.481 7.5 12C7.5 9.519 9.519 7.5 12 7.5C14.481 7.5 16.5 9.519 16.5 12ZM12.75 5V3C12.75 2.586 12.414 2.25 12 2.25C11.586 2.25 11.25 2.586 11.25 3V5C11.25 5.414 11.586 5.75 12 5.75C12.414 5.75 12.75 5.414 12.75 5ZM12.75 21V19C12.75 18.586 12.414 18.25 12 18.25C11.586 18.25 11.25 18.586 11.25 19V21C11.25 21.414 11.586 21.75 12 21.75C12.414 21.75 12.75 21.414 12.75 21ZM5.75 12C5.75 11.586 5.414 11.25 5 11.25H3C2.586 11.25 2.25 11.586 2.25 12C2.25 12.414 2.586 12.75 3 12.75H5C5.414 12.75 5.75 12.414 5.75 12ZM21.75 12C21.75 11.586 21.414 11.25 21 11.25H19C18.586 11.25 18.25 11.586 18.25 12C18.25 12.414 18.586 12.75 19 12.75H21C21.414 12.75 21.75 12.414 21.75 12ZM7.58099 7.58099C7.87399 7.28799 7.87399 6.81299 7.58099 6.51999L6.16699 5.10599C5.87399 4.81299 5.39899 4.81299 5.10599 5.10599C4.81299 5.39899 4.81299 5.87399 5.10599 6.16699L6.51999 7.58099C6.66599 7.72699 6.85799 7.80099 7.04999 7.80099C7.24199 7.80099 7.43399 7.72699 7.58099 7.58099ZM18.894 18.894C19.187 18.601 19.187 18.126 18.894 17.833L17.48 16.419C17.187 16.126 16.712 16.126 16.419 16.419C16.126 16.712 16.126 17.187 16.419 17.48L17.833 18.894C17.979 19.04 18.171 19.114 18.363 19.114C18.555 19.114 18.748 19.041 18.894 18.894ZM6.16699 18.894L7.58099 17.48C7.87399 17.187 7.87399 16.712 7.58099 16.419C7.28799 16.126 6.81299 16.126 6.51999 16.419L5.10599 17.833C4.81299 18.126 4.81299 18.601 5.10599 18.894C5.25199 19.04 5.44399 19.114 5.63599 19.114C5.82799 19.114 6.01999 19.041 6.16699 18.894ZM17.48 7.58099L18.894 6.16699C19.187 5.87399 19.187 5.39899 18.894 5.10599C18.601 4.81299 18.126 4.81299 17.833 5.10599L16.419 6.51999C16.126 6.81299 16.126 7.28799 16.419 7.58099C16.565 7.72699 16.757 7.80099 16.949 7.80099C17.141 7.80099 17.333 7.72699 17.48 7.58099Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div
              @click="themeStore.handleToggleTheme"
              class="h-[29px] w-[60px] flex justify-center items-center rounded-full"
              :class="
                themeStore.theme === 'dark' && !themeStore.auto
                  ? 'bg-[#4943436e]'
                  : ''
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="8"
                style="width: 20px; height: 20px"
                :class="themeStore.theme === 'dark' ? 'color-white' : ''"
              >
                <path
                  d="M12.133 3C12.136 3 12.14 3 12.143 3C12.462 3 12.6 3.39301 12.36 3.60001C10.679 5.04701 9.75503 7.32199 10.226 9.77399C10.749 12.495 12.988 14.566 15.773 14.938C17.532 15.173 19.161 14.728 20.456 13.839C20.719 13.658 21.068 13.897 20.989 14.203C19.885 18.519 15.626 21.595 10.767 20.902C6.73101 20.326 3.54402 17.087 3.06602 13.095C2.81602 11.013 3.289 9.05101 4.27 7.42001C5.86 4.77401 8.78601 3 12.133 3Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-between items-center">
          <p class="text-textSecondary text-lg">Language</p>

          <div><p class="text-textPrimary text-lg font-medium">English</p></div>
        </div>
        <div class="w-full flex justify-between items-center">
          <p class="text-textSecondary text-lg">Currency</p>

          <div><p class="text-textPrimary text-lg font-medium">USD</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();
const menuStore = useMenuStore();
</script>
