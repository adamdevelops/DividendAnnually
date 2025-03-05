let url = "https://api.polygon.io/"

export async function fetchStocks(stockTicker) {
    let stockUrl = url + "v3/reference/tickers?ticker=" + stockTicker + "&market=stocks&active=true&limit=100&apiKey="
    const response = await fetch(stockUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  }