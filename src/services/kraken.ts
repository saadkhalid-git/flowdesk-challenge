import axios from 'axios';
import { OrderBook } from '../types/orderBook';

const KRAKEN_API_URL = 'https://api.kraken.com/0/public/Depth';

export const fetchKrakenOrderBook = async (): Promise<OrderBook> => {
  const response = await axios.get(KRAKEN_API_URL, { params: { pair: 'XXBTZUSD', count: 5 } });
  const orderBook = response.data.result.XXBTZUSD;
  return {
    asks: orderBook.asks.map((ask: [string, string, string]) => [parseFloat(ask[0]), parseFloat(ask[1])]),
    bids: orderBook.bids.map((bid: [string, string, string]) => [parseFloat(bid[0]), parseFloat(bid[1])]),
  };
};
