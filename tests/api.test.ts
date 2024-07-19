import request from 'supertest';
import express from 'express';
import { getGlobalPriceIndex } from '../src/services/orderBookService';

jest.mock('../src/services/orderBookService');

const app = express();
app.get('/global-price-index', async (req, res) => {
  try {
    const globalPriceIndex = await getGlobalPriceIndex();
    res.json({ globalPriceIndex });
  } catch (error) {
    res.status(500).send('Error fetching global price index');
  }
});

describe('API', () => {
  it('should return the global price index', async () => {
    (getGlobalPriceIndex as jest.Mock).mockResolvedValue(19500);
    const response = await request(app).get('/global-price-index');
    expect(response.status).toBe(200);
    expect(response.body.globalPriceIndex).toBe(19500);
  });

  it('should handle errors gracefully', async () => {
    (getGlobalPriceIndex as jest.Mock).mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).get('/global-price-index');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Error fetching global price index');
  });
});
