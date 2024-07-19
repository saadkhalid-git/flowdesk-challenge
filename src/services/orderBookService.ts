import { fetchBinanceOrderBook } from './binance';
import { fetchKrakenOrderBook } from './kraken';
import { fetchHuobiOrderBook } from './huobi';
import { OrderBook } from '../types/orderBook';
import logger from '../../utils/logger';

const calculateMidPrice = (orderBook: OrderBook): number => {
  const bestAsk = orderBook.asks[0][0];
  const bestBid = orderBook.bids[0][0];
  return (bestAsk + bestBid) / 2;
};

export const getGlobalPriceIndex = async (): Promise<number> => {
    try {
        // Fetch order books concurrently
        const [binanceOrderBook, krakenOrderBook, huobiOrderBook] = await Promise.all([
          fetchBinanceOrderBook(),
          fetchKrakenOrderBook(),
          fetchHuobiOrderBook(),
        ]);
    
        // Calculate mid prices
        const binanceMidPrice = calculateMidPrice(binanceOrderBook);
        const krakenMidPrice = calculateMidPrice(krakenOrderBook);
        const huobiMidPrice = calculateMidPrice(huobiOrderBook);
    
        // Calculate the global price index as the average of the mid prices
        const globalPriceIndex = (binanceMidPrice + krakenMidPrice + huobiMidPrice) / 3;
    
        return globalPriceIndex;
      } catch (error: any) {
        logger.error(`Error computing global price index: ${error.message}`);
        throw new Error('Failed to get global price index');
      }
};
