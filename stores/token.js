import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  // State
  state: () => ({
    tokens: [],
    loading: false,
    page: 1, // Pagination for popular tokens
    hasMore: true, // To handle pagination
    buyData: {},
    sellData: {},
    COINGECKO_BASE_URL: "https://api.coingecko.com/api/v3",
  }),

  // Actions
  actions: {
    /**
     * Fetch the top 20 popular tokens by market cap
     */
    async fetchPopularTokens() {
      if (this.loading || !this.hasMore) return; // Prevent duplicate requests
      this.loading = true;

      try {
        const response = await fetch(
          `${this.COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=${this.page}&sparkline=false`
        );
        const data = await response.json();

        if (data.length === 0) this.hasMore = false; // Stop fetching if no tokens are returned

        this.tokens = [
          ...this.tokens,
          ...data.map((token) => ({
            address: token.id,
            symbol: token.symbol,
            name: token.name,
            image: token.image,
            marketCap: token.market_cap,
            price: token.current_price,
            volume: token.total_volume,
          })),
        ];

        this.page += 1; // Move to the next page
      } catch (error) {
        console.error("Error fetching popular tokens:", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Search tokens by name or symbol
     */
    /**
     * Search tokens by name or symbol using CoinGecko's Search API
     */
    async searchTokens(query) {
      if (this.loading) return;
      this.loading = true;

      try {
        // Call CoinGecko's search endpoint
        const response = await fetch(
          `${this.COINGECKO_BASE_URL}/search?query=${query}`
        );
        const data = await response.json();

        // Map the returned data into the desired structure
        this.tokens = data.coins.map((coin) => ({
          address: coin.id, // CoinGecko uses `id` as a unique identifier
          symbol: coin.symbol,
          name: coin.name,
          image: coin.thumb, // Use thumbnail image for tokens
          marketCap: null, // CoinGecko search API does not provide market cap
          price: null, // CoinGecko search API does not provide price
          volume: null, // CoinGecko search API does not provide volume
        }));
      } catch (error) {
        console.error(
          "Error searching tokens using CoinGecko's search API:",
          error
        );
      } finally {
        this.loading = false;
      }
    },

    /**
     * Reset tokens and pagination
     */
    resetTokens() {
      this.tokens = [];
      this.page = 1;
      this.hasMore = true;
    },
  },

  // Getters (computed properties)
  getters: {
    getTokens: (state) => state.tokens,
    isLoading: (state) => state.loading,
    hasMoreTokens: (state) => state.hasMore,
  },
});
