const express = require('express');
const axios = require('axios');
const cors = require('cors');

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
            x_cg_demo_api_key:process.env.X_CG_DEMO_API_KEY
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching from Bitnodes API:', error.message);
      res.status(500).json({ error: 'Failed to fetch Bitnodes data' });
    }
  });



app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
