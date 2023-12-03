const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

const urlMappings = {};

app.use(express.json());

// Endpoint to shorten a URL
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;

    // Generate a short URL using MD5 hashing
    const shortUrl = generateShortUrl(longUrl);

    // Save the mapping in the in-memory object
    urlMappings[shortUrl] = longUrl;

    res.json({ shortUrl });
});

// Endpoint to redirect to the original URL
app.get('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    const longUrl = urlMappings[shortUrl];

    if (longUrl) {
        // Redirect to the original URL
        res.redirect(301, longUrl);
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
});

function generateShortUrl(longUrl) {
    const hash = crypto.createHash('md5').update(longUrl).digest('hex');
    return hash.slice(0, 7); // Use the first 7 characters as the short URL
}

app.listen(port, () => {
    console.log(`URL Shortener Service is listening at http://localhost:${port}`);
});

