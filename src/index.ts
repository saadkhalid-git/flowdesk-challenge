import express from 'express';
import { getGlobalPriceIndex } from './services/orderBookService';
import logger from '../utils/logger';

const app = express();
const port = 3000;

app.get('/global-price-index', async (req, res) => {
  try {
    const globalPriceIndex = await getGlobalPriceIndex();
    res.json({ globalPriceIndex });
  } catch (error: any) {
    logger.error(`Error in /global-price-index: ${error.message}`);
    res.status(500).send('Error fetching global price index');
  }
});

// Global error handling middleware
app.use((err: Error, req: any, res: any, next: any) => {
  logger.error('Error:', err.message); // Log error message
  logger.error('Stack:', err.stack);   // Log error stack
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
