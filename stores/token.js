import { defineStore } from "pinia";
import ethImage from "@/assets/img/eth.png";

export const useTokenStore = defineStore("token", {
  // State
  state: () => ({
    tokens: [],
    selectedTokens: {
      swap: {
        sell: { symbol: "ETH", image: ethImage, price: 0 },
        buy: null,
      },
      buy: null,
      send: null,
      limit: null,
    }, // Stores selected tokens per tab
    currentAction: null,
    openTokensModal: false,
    tokenDetails: {}, // Detailed token information
    loading: false,
    page: 1, // Pagination for popular tokens
    hasMore: true, // To handle pagination
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

    handleSelectedToken(selectedToken) {
      if (this.currentAction === "sell") {
        this.selectedTokens.swap.sell = selectedToken;
      } else if (this.currentAction === "buy") {
        this.selectedTokens.swap.buy = selectedToken;
      }
    },

    updatePrice(action, tokenUnit) {
      const selectedToken =
        action === "sell"
          ? this.selectedTokens.swap.sell
          : this.selectedTokens.swap.buy;
      if (!selectedToken) return;

      const tokenPrice = selectedToken.price;

      if (action === "sell") {
        // If user selects a sell token, update the buy price based on the sell price.
        const buyToken = this.selectedTokens.swap.buy;
        if (buyToken) {
          buyToken.price = tokenPrice * tokenUnit;
        }
      } else if (action === "buy") {
        // If user selects a buy token, update the sell price based on the buy price.
        const sellToken = this.selectedTokens.swap.sell;
        if (sellToken) {
          sellToken.price = tokenPrice * tokenUnit;
        }
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
        // Step 1: Get search results from CoinGecko's Search API
        const response = await fetch(
          `${this.COINGECKO_BASE_URL}/search?query=${query}`
        );
        const data = await response.json();

        // Extract IDs of tokens returned by the search
        const tokenIds = data.coins.map((coin) => coin.id);

        if (tokenIds.length === 0) {
          this.tokens = []; // No tokens found
          return;
        }

        // Step 2: Fetch detailed data for these tokens using the Markets API
        const marketsResponse = await fetch(
          `${
            this.COINGECKO_BASE_URL
          }/coins/markets?vs_currency=usd&ids=${tokenIds.join(
            ","
          )}&order=market_cap_desc&sparkline=false`
        );
        const marketsData = await marketsResponse.json();

        // Map the detailed token data into the desired structure
        this.tokens = marketsData.map((token) => ({
          address: token.id,
          symbol: token.symbol,
          name: token.name,
          image: token.image,
          marketCap: token.market_cap,
          price: token.current_price,
          volume: token.total_volume,
        }));
      } catch (error) {
        console.error("Error fetching detailed token data:", error);
      } finally {
        this.loading = false;
      }
    },

    handleToggleOpenTokensModal(actionType) {
      this.openTokensModal = !this.openTokensModal;
      this.currentAction = actionType;
    },
    handleCloseModal() {
      this.openTokensModal = !this.openTokensModal;
    },

    // async searchTokens(query) {
    //   if (this.loading) return;
    //   this.loading = true;

    //   try {
    //     // Call CoinGecko's search endpoint
    //     const response = await fetch(
    //       `${this.COINGECKO_BASE_URL}/search?query=${query}`
    //     );
    //     const data = await response.json();

    //     // Map the returned data into the desired structure
    //     this.tokens = data.coins.map((coin) => ({
    //       address: coin.id, // CoinGecko uses `id` as a unique identifier
    //       symbol: coin.symbol,
    //       name: coin.name,
    //       image: coin.thumb, // Use thumbnail image for tokens
    //       marketCap: null, // CoinGecko search API does not provide market cap
    //       price: null, // CoinGecko search API does not provide price
    //       volume: null, // CoinGecko search API does not provide volume
    //     }));
    //   } catch (error) {
    //     console.error(
    //       "Error searching tokens using CoinGecko's search API:",
    //       error
    //     );
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    /**
     * Reset tokens and pagination
     */

    formatPrice(price) {
      // If price is not a valid number, return 0
      if (isNaN(price) || price === null || price === undefined) {
        return "0.00";
      }

      // Format the number with commas and limit to 2 decimal places
      return price
        .toFixed(2) // Ensure 2 decimal places
        .replace(/\d(?=(\d{3})+\.)/g, "$&,"); // Add commas for thousands
    },

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
