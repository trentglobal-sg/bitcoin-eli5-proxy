const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Enable CORS for your proxy server
app.use(cors());

// Mirror the original Bitnodes API path
app.get('/api/v1/snapshots/latest/', async (req, res) => {
  try {
    const response = await axios.get('https://bitnodes.io/api/v1/snapshots/latest/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Bitnodes API:', error.message);
    res.status(500).json({ error: 'Failed to fetch Bitnodes data' });
  }
});

app.get('/api/v1/snapshots', async (req, res) => {
  try {
    const response = await axios.get('https://bitnodes.io/api/v1/snapshots', {

      params: {
        ...req.query,
        x_cg_demo_api_key: process.env.X_CG_DEMO_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Bitnodes API:', error.message);
    res.status(500).json({ error: 'Failed to fetch Bitnodes data' });
  }
});


app.get('/api/coingecko/v3/coins/bitcoin/market_chart', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {

      params: {
        ...req.query,
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
})

app.get('/api/coingecko/v3/coins/bitcoin/tickers', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/tickers', {

      params: {
        ...req.query,
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Bitnodes API:', error.message);
    res.status(500).json({ error: 'Failed to fetch Bitnodes data' });
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
