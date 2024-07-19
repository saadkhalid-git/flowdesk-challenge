import { getGlobalPriceIndex } from '../src/services/orderBookService';
import * as binanceService from '../src/services/binance';
import * as krakenService from '../src/services/kraken';
import * as huobiService from '../src/services/huobi';

jest.mock('../src/services/binance');
jest.mock('../src/services/kraken');
jest.mock('../src/services/huobi');

const mockOrderBook = {
  asks: [[20000, 1], [21000, 1]],
  bids: [[19000, 1], [18000, 1]],
};

describe('Order Book Service', () => {
  it('should return the correct global price index', async () => {
    (binanceService.fetchBinanceOrderBook as jest.Mock).mockResolvedValue(mockOrderBook);
    (krakenService.fetchKrakenOrderBook as jest.Mock).mockResolvedValue(mockOrderBook);
    (huobiService.fetchHuobiOrderBook as jest.Mock).mockResolvedValue(mockOrderBook);

    const globalPriceIndex = await getGlobalPriceIndex();
    expect(globalPriceIndex).toBe(19500);
  });
});
