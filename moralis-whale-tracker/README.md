# Moralis Onchain Skills Whale Tracker

A web app that lets you look up any Ethereum wallet address and get a full breakdown — net worth, token holdings, NFTs, DeFi positions, P&L, and approval risk.

Built with vanilla HTML/JS on the frontend and a lightweight Node.js proxy server that keeps your API key safe on the backend. Powered by the [Moralis Web3 Data API](https://moralis.io).

## Prerequisites

- **Node.js** v18 or higher (uses the built-in `fetch` API)
- A **Moralis API key** — get one free at [https://moralis.io](https://moralis.io)

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd onchain-skills
```

### 2. Create your `.env` file

Create a file called `.env` in the project root with your Moralis API key:

```
API_KEY=your_moralis_api_key_here
```

You can copy the example file as a starting point:

```bash
cp .env_example .env
```

Then replace `PASTE_YOUR_API_KEY_HERE` with your actual key.

### 3. Run the app

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

```
Browser (whale-tracker.html)
    |
    |  /api/v2.2/...
    v
Node.js Proxy Server (server.js, port 3000)
    |
    |  + X-API-Key header
    v
Moralis API (deep-index.moralis.io)
```

The frontend never touches your API key directly. All Moralis requests go through the local Node server, which attaches your key and forwards the request.

## Moralis API Endpoints Used

| Feature          | Endpoint                                    |
| ---------------- | ------------------------------------------- |
| ENS Resolve      | `/v2.2/resolve/{address}/reverse`           |
| Active Chains    | `/v2.2/wallets/{address}/chains`            |
| Net Worth        | `/v2.2/wallets/{address}/net-worth`         |
| Wallet Stats     | `/v2.2/wallets/{address}/stats`             |
| DeFi Summary     | `/v2.2/wallets/{address}/defi/summary`      |
| Token Holdings   | `/v2.2/wallets/{address}/tokens`            |
| Tx History       | `/v2.2/wallets/{address}/history`           |
| NFT Collections  | `/v2.2/{address}/nft/collections`           |
| Profitability    | `/v2.2/wallets/{address}/profitability/summary` |
| Approvals        | `/v2.2/wallets/{address}/approvals`         |

All endpoints require a valid Moralis API key. See the [Moralis Web3 Data API docs](https://docs.moralis.io) for rate limits and plan details.

## Project Structure

```
onchain-skills/
├── server.js            # Node.js proxy server
├── whale-tracker.html   # Frontend (single-page app)
├── .env                 # Your API key (not committed)
├── .env_example         # Example env file
└── .gitignore           # Ignores .env and logs
```
