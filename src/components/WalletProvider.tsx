import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { wagmiAdapter, hasValidProjectId } from '../config/wagmi';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

// Get project ID from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

// App metadata
const metadata = {
  name: 'Delegation Hub',
  description: 'Delegate your AAVE tokens',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Initialize AppKit only if we have required config
// Without a valid project ID, we'll rely on injected wallets only
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId: hasValidProjectId ? projectId : 'DISABLED',
  metadata,
  features: {
    analytics: false,
    // Disable features that require a valid project ID
    email: hasValidProjectId ? true : false,
    socials: hasValidProjectId ? ['google', 'x', 'discord', 'github', 'farcaster'] : [],
    swaps: false
  },
  // Disable WalletConnect if no valid project ID
  enableWalletConnect: hasValidProjectId ? true : false,
});

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
