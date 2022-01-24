const express = require('express');
const request = require('request-promise'); // Use to call API-requests

const app = express();
const PORT = process.env.PORT || 5000;

// Function to take in user's own API key from ScraperAPI
const scraper_url = (api_key) => `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Amazon SG Scrapper API');
});

// Retrieve product details
app.get('/products/:productId', async (req, res) => {
    
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}&url=https://www.amazon.sg/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

});

// Retrieve product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}&url=https://www.amazon.sg/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

});

// Retrieve product offers
app.get('/products/:productId/offers', async (req, res) => {
    
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}&url=https://www.amazon.sg/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

});

// Search for products (GET)
app.get('/search/:searchQuery', async (req, res) => {
    
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${scraper_url(api_key)}&url=https://www.amazon.sg/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }

});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));