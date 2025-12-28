import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectWallet() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  if (isConnected && address) {
    return (
      <button 
        className="connect-wallet-btn connected"
        onClick={() => open({ view: 'Account' })}
      >
        <span className="wallet-address">
          {formatAddress(address)}
        </span>
        <span className="connected-dot"></span>
      </button>
    );
  }

  return (
    <button 
      className="connect-wallet-btn"
      onClick={() => open()}
    >
      Connect wallet
    </button>
  );
}
