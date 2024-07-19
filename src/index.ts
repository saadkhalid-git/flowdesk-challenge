import express from 'express';
import { getGlobalPriceIndex } from './services/orderBookService';

const app = express();
const port = 3000;

app.get('/global-price-index', async (req, res) => {
  try {
    const globalPriceIndex = await getGlobalPriceIndex();
    res.json({ globalPriceIndex });
  } catch (error) {
    res.status(500).send('Error fetching global price index');
  }
});

// Global error handling middleware
app.use((err: Error, req: any, res: any, next: any) => {
  console.error('Error:', err.message); // Log error message
  console.error('Stack:', err.stack);   // Log error stack
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


