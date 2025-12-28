import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet } from '@reown/appkit/networks';
import { http, fallback } from 'viem';

// Get project ID from environment (optional for basic functionality)
// For WalletConnect QR codes and social logins, get a free ID at https://cloud.reown.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

// Check if we have a valid project ID
export const hasValidProjectId = projectId && projectId.length > 10;

// Use multiple RPC endpoints for reliability with fallback
const transports = {
  [mainnet.id]: fallback([
    http('https://cloudflare-eth.com'),
    http('https://eth.llamarpc.com'),
    http('https://rpc.ankr.com/eth'),
    http('https://ethereum.publicnode.com'),
  ]),
};

// Create the Wagmi adapter with explicit transports
export const wagmiAdapter = new WagmiAdapter({
  projectId: hasValidProjectId ? projectId : 'DISABLED',
  networks: [mainnet],
  transports,
});

// Export the wagmi config from the adapter
export const config = wagmiAdapter.wagmiConfig;
