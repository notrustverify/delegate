import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { DELEGATION_ABI, TOKENS, DELEGATION_TYPE, type TokenType, type DelegationType } from '../config/contracts';
import { formatUnits } from 'viem';

// Hook to get token balance
export function useTokenBalance(tokenType: TokenType) {
  const { address } = useAccount();
  const token = TOKENS[tokenType];

  const { data: balance, refetch, isLoading, isError, error } = useReadContract({
    address: token.address,
    abi: DELEGATION_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Debug logging
  if (address) {
    console.log(`[${tokenType}] Balance query:`, {
      address,
      tokenAddress: token.address,
      balance: balance?.toString(),
      isLoading,
      isError,
      error: error?.message,
    });
  }

  return {
    balance: balance ? formatUnits(balance, 18) : '0',
    rawBalance: balance ?? BigInt(0),
    refetch,
    isLoading,
    isError,
  };
}

// Hook to get current delegatee for a token and delegation type
export function useCurrentDelegatee(tokenType: TokenType, delegationType: DelegationType) {
  const { address } = useAccount();
  const token = TOKENS[tokenType];

  const { data: delegatee, refetch } = useReadContract({
    address: token.address,
    abi: DELEGATION_ABI,
    functionName: 'getDelegateeByType',
    args: address ? [address, delegationType] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const isDelegated = delegatee && delegatee !== '0x0000000000000000000000000000000000000000' && delegatee !== address;

  return {
    delegatee,
    isDelegated,
    refetch,
  };
}

// Hook to delegate by type
export function useDelegateByType() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const delegateByType = (
    tokenType: TokenType,
    delegatee: `0x${string}`,
    delegationType: DelegationType
  ) => {
    const token = TOKENS[tokenType];
    
    writeContract({
      address: token.address,
      abi: DELEGATION_ABI,
      functionName: 'delegateByType',
      args: [delegatee, delegationType],
    });
  };

  return {
    delegateByType,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  };
}

// Hook to delegate both voting and proposition at once
export function useDelegateAll() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const delegate = (tokenType: TokenType, delegatee: `0x${string}`) => {
    const token = TOKENS[tokenType];
    
    writeContract({
      address: token.address,
      abi: DELEGATION_ABI,
      functionName: 'delegate',
      args: [delegatee],
    });
  };

  return {
    delegate,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  };
}

// Combined hook for delegation status
export function useDelegationStatus(tokenType: TokenType) {
  const { address } = useAccount();
  const { balance, rawBalance, isLoading: isLoadingBalance, isError: isBalanceError } = useTokenBalance(tokenType);
  const { delegatee: votingDelegatee, isDelegated: isVotingDelegated, refetch: refetchVoting } = 
    useCurrentDelegatee(tokenType, DELEGATION_TYPE.VOTING);
  const { delegatee: propositionDelegatee, isDelegated: isPropositionDelegated, refetch: refetchProposition } = 
    useCurrentDelegatee(tokenType, DELEGATION_TYPE.PROPOSITION);

  const hasBalance = rawBalance > BigInt(0);
  const isFullyDelegated = isVotingDelegated && isPropositionDelegated;
  const isPartiallyDelegated = isVotingDelegated || isPropositionDelegated;

  const refetch = () => {
    refetchVoting();
    refetchProposition();
  };

  return {
    address,
    balance,
    rawBalance,
    hasBalance,
    isLoadingBalance,
    isBalanceError,
    votingDelegatee,
    propositionDelegatee,
    isVotingDelegated,
    isPropositionDelegated,
    isFullyDelegated,
    isPartiallyDelegated,
    refetch,
  };
}


