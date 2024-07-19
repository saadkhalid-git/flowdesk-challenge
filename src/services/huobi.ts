import axios from 'axios';
import { OrderBook } from '../types/orderBook';

const HUOBI_API_URL = 'https://api.huobi.pro/market/depth';

export const fetchHuobiOrderBook = async (): Promise<OrderBook> => {
  const response = await axios.get(HUOBI_API_URL, { params: { symbol: 'btcusdt', type: 'step0' } });
  return {
    asks: response.data.tick.asks.slice(0, 5).map((ask: [number, number]) => [ask[0], ask[1]]),
    bids: response.data.tick.bids.slice(0, 5).map((bid: [number, number]) => [bid[0], bid[1]]),
  };
};
