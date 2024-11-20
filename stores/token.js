import { ref, computed } from "vue";

export const useTokenStore = () => {
  const tokens = ref([]);
  const loading = ref(false);
  const page = ref(1); // Pagination for popular tokens
  const hasMore = ref(true); // To handle pagination

  const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

  /**
   * Fetch the top 20 popular tokens by market cap
   */
  const fetchPopularTokens = async () => {
    if (loading.value || !hasMore.value) return; // Prevent duplicate requests
    loading.value = true;

    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=${page.value}&sparkline=false`
      );
      const data = await response.json();

      if (data.length < 0) hasMore.value = false; // Stop fetching if less than 20 tokens are returned

      tokens.value = [
        ...tokens.value,
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

      page.value += 1; // Move to the next page
    } catch (error) {
      console.error("Error fetching popular tokens:", error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Search tokens by name or symbol
   */
  const searchTokens = async (query) => {
    if (loading.value) return;
    loading.value = true;

    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await response.json();

      // Filter tokens by name or symbol
      tokens.value = data.filter((token) => {
        return (
          token.name.toLowerCase().includes(query.toLowerCase()) ||
          token.symbol.toLowerCase().includes(query.toLowerCase())
        );
      });
    } catch (error) {
      console.error("Error searching tokens:", error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Reset tokens and pagination
   */
  const resetTokens = () => {
    tokens.value = [];
    page.value = 1;
    hasMore.value = true;
  };

  return {
    tokens: computed(() => tokens.value),
    loading: computed(() => loading.value),
    hasMore: computed(() => hasMore.value),
    fetchPopularTokens,
    searchTokens,
    resetTokens,
  };
};
