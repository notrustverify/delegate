// AAVE Token Contract Addresses
export const AAVE_TOKEN_ADDRESS = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' as const;
export const STK_AAVE_TOKEN_ADDRESS = '0x4da27a545c0c5b758a6ba100e3a049001de870f5' as const;

// Delegation Types
export const DELEGATION_TYPE = {
  VOTING: 0,
  PROPOSITION: 1,
} as const;

export type DelegationType = typeof DELEGATION_TYPE[keyof typeof DELEGATION_TYPE];

// ABI for delegation functions (shared by AAVE and stkAAVE)
export const DELEGATION_ABI = [
  {
    name: 'delegateByType',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'delegatee', type: 'address' },
      { name: 'delegationType', type: 'uint8' },
    ],
    outputs: [],
  },
  {
    name: 'delegate',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'delegatee', type: 'address' },
    ],
    outputs: [],
  },
  {
    name: 'getDelegateeByType',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'delegator', type: 'address' },
      { name: 'delegationType', type: 'uint8' },
    ],
    outputs: [
      { name: '', type: 'address' },
    ],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'account', type: 'address' },
    ],
    outputs: [
      { name: '', type: 'uint256' },
    ],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: '', type: 'string' },
    ],
  },
] as const;

// Token info
export const TOKENS = {
  aave: {
    address: AAVE_TOKEN_ADDRESS,
    name: 'AAVE',
    symbol: 'AAVE',
  },
  stkaave: {
    address: STK_AAVE_TOKEN_ADDRESS,
    name: 'Staked AAVE',
    symbol: 'stkAAVE',
  },
} as const;

export type TokenType = keyof typeof TOKENS;


