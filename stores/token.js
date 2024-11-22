import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  // State
  state: () => ({
    tokens: [],
    selectedTokens: {
      swap: {
        sell: null,
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

    async fetchTokenDetailsBySymbol(symbol) {
      this.loading = true;

      try {
        // Fetch all coins and find the token's ID by its symbol
        const coinsListResponse = await fetch(
          `${this.COINGECKO_BASE_URL}/coins/list`
        );
        const coinsList = await coinsListResponse.json();

        // Find the token by its symbol
        const tokenData = coinsList.find(
          (coin) => coin.symbol.toLowerCase() === symbol.toLowerCase()
        );

        if (!tokenData) {
          throw new Error("Token not found");
        }

        // Fetch detailed market data for the token
        const marketDataResponse = await fetch(
          `${this.COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${tokenData.id}&sparkline=false`
        );
        const marketData = await marketDataResponse.json();

        if (marketData.length === 0) {
          throw new Error("Market data not available for this token");
        }

        // Map the data to your desired structure
        const details = marketData[0];
        this.tokenDetails = {
          name: details.name,
          symbol: details.symbol,
          price: details.current_price,
          marketCap: details.market_cap,
          volume: details.total_volume,
          fdv: details.fully_diluted_valuation,
          image: details.image,
        };
      } catch (error) {
        console.error("Error fetching token details:", error);
        this.tokenDetails = {}; // Reset the details in case of an error
      } finally {
        this.loading = false;
      }
    },

    formatPrice(price) {
      // If price is not a valid number, return 0
      if (isNaN(price) || price === null || price === undefined) {
        return "0.00";
      }

      // Abbreviate trillions (T)
      if (price >= 1_000_000_000_000) {
        return `${(price / 1_000_000_000_000).toFixed(1)}T`; // Shorten to 6.7T
      }

      // Abbreviate billions (B)
      if (price >= 1_000_000_000) {
        return `${(price / 1_000_000_000).toFixed(1)}B`; // Shorten to 6.7B
      }

      // Abbreviate millions (M)
      if (price >= 1_000_000) {
        return `${(price / 1_000_000).toFixed(1)}M`; // Shorten to 4.5M
      }

      // Format smaller numbers with commas and 2 decimal places
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
