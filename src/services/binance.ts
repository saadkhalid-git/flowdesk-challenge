import axios from 'axios';
import { OrderBook } from '../types/orderBook';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/depth';

export const fetchBinanceOrderBook = async (): Promise<OrderBook> => {
  const response = await axios.get(BINANCE_API_URL, { params: { symbol: 'BTCUSDT', limit: 5 } });
  return {
    asks: response.data.asks.map((ask: [string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
    bids: response.data.bids.map((bid: [string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
  };
};
