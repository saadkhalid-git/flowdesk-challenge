# Global Price Index Service

## Overview

The Global Price Index Service is a Node.js application built with TypeScript that computes a global price index for the trading pair BTC/USDT by fetching order book data from multiple cryptocurrency exchanges. The service integrates with Binance, Kraken, and Huobi exchanges to obtain the necessary data, calculate mid-prices, and provide a unified global price index through a REST API.

## Architecture

### Components

1. **Express Server**
   - **Purpose:** Serves the global price index via a REST API endpoint.
   - **Endpoint:** `/global-price-index`
   - **Error Handling:** Implements global error handling middleware to catch and log errors.

2. **Order Book Service**
   - **Purpose:** Fetches order book data from different exchanges, calculates mid-prices, and computes the global price index.
   - **Data Sources:** 
     - **REST API:** Binance and Kraken.
     - **WebSocket:** Huobi.
   - **Functions:**
     - `fetchOrderBookRest(url: string)`: Fetches order book data from a REST API.
     - `fetchOrderBookWebSocket(url: string, message: any)`: Fetches order book data from a WebSocket.
     - `computeMidPrice(orderBook: OrderBook)`: Computes the mid-price from the order book data.
     - `getGlobalPriceIndex()`: Computes the global price index as the average of mid-prices from different exchanges.

3. **Logger**
   - **Purpose:** Provides centralized logging for debugging and error handling.
   - **Implementation:** Uses the Winston library to log messages to both the console and log files.

### Data Flow

1. **Fetching Data:**
   - The `OrderBookService` fetches order book data from Binance and Kraken using REST API calls.
   - It uses WebSocket to fetch real-time data from Huobi.
   
2. **Computing Prices:**
   - The `computeMidPrice` function calculates the mid-price for each order book by averaging the best bid and best ask prices.
   
3. **Calculating Global Price Index:**
   - The `getGlobalPriceIndex` function computes the global price index as the average of the mid-prices obtained from Binance, Kraken, and Huobi.

4. **Serving the API:**
   - The Express server exposes a REST API endpoint to provide the global price index.
   - It employs global error handling to ensure the server continues running even if some exchanges fail or if there are internal errors.

### Error Handling

- **Global Error Handling Middleware:** Catches and logs errors, returning a 500 status code and an error message to the client.
- **Error Logging:** All errors are logged using the Winston logger, which captures both the error message and stack trace.
