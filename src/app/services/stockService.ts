import apiKey from "../utils/secrets.js"

let url = "https://api.polygon.io/"


export async function fetchStocks(stockTicker) {
    let stockUrl = url + "v3/reference/tickers?ticker=" + stockTicker + "&market=stocks&active=true&limit=100&apiKey=" + apiKey;
    const response = await fetch(stockUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    let data = await response.json()

    if(data.results.length >= 1){
      console.log('resp on service', data.results)
    } else{
      console.log('Invalid ticker entered')
    }
    
    
    return data;
  }