import WebSocket from 'ws';
import { OrderBook } from '../types/orderBook';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@depth5@100ms';

export const fetchBinanceOrderBook = (): Promise<OrderBook> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(BINANCE_WS_URL);

    ws.on('message', (data: Buffer) => {
      try {
        // Convert buffer to string and parse it as JSON
        const parsedData = JSON.parse(data.toString());

        if (parsedData.asks && parsedData.bids) {
          const orderBook: OrderBook = {
            asks: parsedData.asks.slice(0, 5).map((ask: [string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
            bids: parsedData.bids.slice(0, 5).map((bid: [string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
          };
          ws.close();
          resolve(orderBook);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        reject(error);
      }
    });

    ws.on('error', (err) => {
      reject(err);
    });
  });
};
