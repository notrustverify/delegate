# Delegation Hub

A simple web application for delegating AAVE, stkAAVE, and aAAVE voting power to a specified delegate address. Users can connect their wallet and delegate their voting power with a single click.

## What It Does

This website allows AAVE token holders to delegate their voting power (both VOTING and PROPOSITION) to a trusted delegate. It supports:
- **AAVE** token delegation
- **stkAAVE** token delegation  
- **aAAVE** token delegation
- Delegation of all tokens at once

Users connect their wallet, view their token balances, and can delegate or remove delegation with a simple interface.

## How to Create Your Own Page

### Prerequisites

- [Bun](https://bun.sh) (or Node.js/npm)
- An Ethereum wallet for testing

### Setup

1. **Clone or fork this repository**

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   VITE_DELEGATE_ADDRESS=0xYourDelegateAddressHere
   VITE_DELEGATE_NAME=Your Delegate Name
   VITE_LOGO_NAME=Your Logo Text
   
   # Optional: Customize colors
   VITE_MAIN_COLOR=#e8f8a6
   VITE_MAIN_COLOR_DARK=#0d1208
   
   # Optional: WalletConnect Project ID (for better wallet connection)
   VITE_WALLETCONNECT_PROJECT_ID=your-project-id
   ```

4. **Update the configuration**
   - Set `VITE_DELEGATE_ADDRESS` to the Ethereum address you want users to delegate to
   - Set `VITE_DELEGATE_NAME` to the display name (e.g., "No Trust Verify")
   - Set `VITE_LOGO_NAME` to the text shown in the header (defaults to delegate name)

5. **Run the development server**
   ```bash
   bun run dev
   ```

6. **Build for production**
   ```bash
   bun run build
   ```

### Configuration Options

- **`VITE_DELEGATE_ADDRESS`** (required): The Ethereum address to delegate voting power to
- **`VITE_DELEGATE_NAME`** (required): Display name for the delegate
- **`VITE_LOGO_NAME`** (optional): Logo text in header (defaults to delegate name)
- **`VITE_MAIN_COLOR`** (optional): Light theme background color (default: `#e8f8a6`)
- **`VITE_MAIN_COLOR_DARK`** (optional): Dark theme background color (default: `#0d1208`)
- **`VITE_WALLETCONNECT_PROJECT_ID`** (optional): WalletConnect project ID for better wallet support

### Deployment

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages. Just push to the `main` branch and it will deploy automatically.

For manual deployment, build the project and serve the `dist` folder:
```bash
bun run build
# Serve the dist folder with your preferred static hosting service
```

## How It Works

The app interacts with AAVE governance contracts:
- **AAVE Token**: `0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9`
- **stkAAVE Token**: `0x4da27a545c0c5b758a6ba100e3a049001de870f5`
- **aAAVE Token**: `0xa700b4eb416be35b2911fd5dee80678ff64ff6c9`

It calls the `delegateByType(address, powerType)` function where:
- `address`: The delegate address (or user's own address to remove delegation)
- `powerType`: `0` for VOTING, `1` for PROPOSITION

### Inspired By

This project is inspired by [AaveChan's delegation interface](https://apps.aavechan.com/delegate).

