const http = require('http');
const fs = require('fs');
const path = require('path');

// Load API key from .env
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const API_KEY = envContent.match(/API_KEY=(.+)/)?.[1]?.trim();
if (!API_KEY) { console.error('No API_KEY found in .env'); process.exit(1); }

const PORT = 3000;
const MORALIS_BASE = 'https://deep-index.moralis.io';

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // Serve the HTML page
  if (req.url === '/' || req.url === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'whale-tracker.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Proxy Moralis API calls: /api/v2.2/... → Moralis
  if (req.url.startsWith('/api/')) {
    const moralisUrl = MORALIS_BASE + req.url;
    try {
      const response = await fetch(moralisUrl, {
        method: req.method,
        headers: { 'X-API-Key': API_KEY, 'accept': 'application/json' },
      });
      const body = await response.text();
      res.writeHead(response.status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(body);
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n  Whale Tracker running at http://localhost:${PORT}\n`);
});
