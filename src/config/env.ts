// Environment configuration
export const config = {
  delegateAddress: import.meta.env.VITE_DELEGATE_ADDRESS,
  delegateName: import.meta.env.VITE_DELEGATE_NAME,
  logoName: import.meta.env.VITE_LOGO_NAME || import.meta.env.VITE_DELEGATE_NAME,
} as const;

// Helper to check if string is an Ethereum address (not ENS)
export function isEthereumAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

// Helper to format/truncate address
export function formatAddress(address: string): string {
  if (isEthereumAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  return address;
}

// Get display address (truncated if it's an address, full if ENS)
export function getDisplayAddress(): string {
  return formatAddress(config.delegateAddress);
}

