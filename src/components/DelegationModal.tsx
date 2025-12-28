import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { isAddress } from 'viem';
import { useDelegationStatus, useDelegateByType, useDelegateAll } from '../hooks/useDelegation';
import { DELEGATION_TYPE, type TokenType, TOKENS } from '../config/contracts';
import { config } from '../config/env';
import aaveIcon from '../assets/tokens/aave.svg';
import stkAaveIcon from '../assets/tokens/stkaave.svg';

interface DelegationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenType: TokenType | 'all';
}

type DelegationOption = 'voting' | 'proposition' | 'both';

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function TokenIcon({ type }: { type: TokenType }) {
  const icons = {
    aave: aaveIcon,
    stkaave: stkAaveIcon,
  };
  
  return <img src={icons[type]} alt={type} className="delegation-token-icon" />;
}

function SingleTokenDelegation({ 
  tokenType, 
  delegatee,
  onSuccess 
}: { 
  tokenType: TokenType;
  delegatee: string;
  onSuccess: () => void;
}) {
  const { isConnected, address: userAddress } = useAccount();
  const status = useDelegationStatus(tokenType);
  const { delegateByType, isPending, isConfirming, isSuccess, error } = useDelegateByType();
  const { delegate, isPending: isPendingAll, isConfirming: isConfirmingAll, isSuccess: isSuccessAll, error: errorAll } = useDelegateAll();
  
  const [selectedOption, setSelectedOption] = useState<DelegationOption>('both');
  
  const token = TOKENS[tokenType];
  const isLoading = isPending || isConfirming || isPendingAll || isConfirmingAll;
  const success = isSuccess || isSuccessAll;
  const txError = error || errorAll;

  useEffect(() => {
    if (success) {
      status.refetch();
      onSuccess();
    }
  }, [success]);

  const handleDelegate = () => {
    if (!isAddress(delegatee as `0x${string}`)) {
      alert('Invalid delegate address');
      return;
    }

    if (selectedOption === 'both') {
      delegate(tokenType, delegatee as `0x${string}`);
    } else {
      const delegationType = selectedOption === 'voting' ? DELEGATION_TYPE.VOTING : DELEGATION_TYPE.PROPOSITION;
      delegateByType(tokenType, delegatee as `0x${string}`, delegationType);
    }
  };

  const handleUndelegate = () => {
    if (!userAddress) return;
    
    if (selectedOption === 'both') {
      delegate(tokenType, userAddress);
    } else {
      const delegationType = selectedOption === 'voting' ? DELEGATION_TYPE.VOTING : DELEGATION_TYPE.PROPOSITION;
      delegateByType(tokenType, userAddress, delegationType);
    }
  };

  if (!isConnected) {
    return (
      <div className="delegation-section">
        <div className="delegation-token-header">
          <TokenIcon type={tokenType} />
          <span>{token.symbol}</span>
        </div>
        <p className="delegation-message">Connect wallet to delegate</p>
      </div>
    );
  }

  if (status.isLoadingBalance) {
    return (
      <div className="delegation-section">
        <div className="delegation-token-header">
          <TokenIcon type={tokenType} />
          <span>{token.symbol}</span>
        </div>
        <p className="delegation-message">Loading balance...</p>
      </div>
    );
  }

  if (status.isBalanceError) {
    return (
      <div className="delegation-section">
        <div className="delegation-token-header">
          <TokenIcon type={tokenType} />
          <span>{token.symbol}</span>
        </div>
        <p className="delegation-message delegation-error">Failed to load balance. Please check your connection.</p>
      </div>
    );
  }

  if (!status.hasBalance) {
    return (
      <div className="delegation-section">
        <div className="delegation-token-header">
          <TokenIcon type={tokenType} />
          <span>{token.symbol}</span>
        </div>
        <p className="delegation-message">No {token.symbol} balance to delegate</p>
      </div>
    );
  }

  return (
    <div className="delegation-section">
      <div className="delegation-token-header">
        <TokenIcon type={tokenType} />
        <div className="delegation-token-info">
          <span className="delegation-token-name">{token.symbol}</span>
          <span className="delegation-token-balance">
            Balance: {parseFloat(status.balance).toFixed(4)} {token.symbol}
          </span>
        </div>
      </div>

      <div className="delegation-status">
        <div className="delegation-status-row">
          <span className="delegation-status-label">Voting Power:</span>
          <span className={`delegation-status-value ${status.isVotingDelegated ? 'delegated' : ''}`}>
            {status.isVotingDelegated 
              ? `Delegated to ${formatAddress(status.votingDelegatee!)}` 
              : 'Not delegated'}
          </span>
        </div>
        <div className="delegation-status-row">
          <span className="delegation-status-label">Proposition Power:</span>
          <span className={`delegation-status-value ${status.isPropositionDelegated ? 'delegated' : ''}`}>
            {status.isPropositionDelegated 
              ? `Delegated to ${formatAddress(status.propositionDelegatee!)}` 
              : 'Not delegated'}
          </span>
        </div>
      </div>

      <div className="delegation-options">
        <label className="delegation-option">
          <input
            type="radio"
            name={`delegation-${tokenType}`}
            value="both"
            checked={selectedOption === 'both'}
            onChange={() => setSelectedOption('both')}
          />
          <span>Both (Voting + Proposition)</span>
        </label>
        <label className="delegation-option">
          <input
            type="radio"
            name={`delegation-${tokenType}`}
            value="voting"
            checked={selectedOption === 'voting'}
            onChange={() => setSelectedOption('voting')}
          />
          <span>Voting Power Only</span>
        </label>
        <label className="delegation-option">
          <input
            type="radio"
            name={`delegation-${tokenType}`}
            value="proposition"
            checked={selectedOption === 'proposition'}
            onChange={() => setSelectedOption('proposition')}
          />
          <span>Proposition Power Only</span>
        </label>
      </div>

      {txError && (
        <div className="delegation-error">
          {(txError as Error).message?.includes('User rejected') 
            ? 'Transaction rejected by user' 
            : 'Transaction failed. Please try again.'}
        </div>
      )}

      {success && (
        <div className="delegation-success">
          Delegation successful! ✓
        </div>
      )}

      <div className="delegation-actions">
        <button
          className="delegation-btn primary"
          onClick={handleDelegate}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : `Delegate to ${config.delegateName}`}
        </button>
        
        {status.isPartiallyDelegated && (
          <button
            className="delegation-btn secondary"
            onClick={handleUndelegate}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Remove Delegation'}
          </button>
        )}
      </div>
    </div>
  );
}

export function DelegationModal({ isOpen, onClose, tokenType }: DelegationModalProps) {
  const delegateAddress = config.delegateAddress;

  if (!isOpen) return null;

  const tokensToShow: TokenType[] = tokenType === 'all' 
    ? ['aave', 'stkaave'] 
    : [tokenType];

  const handleSuccess = () => {
    // Success callback - can be used for notifications
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="delegation-modal">
        <div className="modal-header">
          <h3>Delegate Your Tokens</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="delegation-content">
          <div className="delegation-target">
            <label className="delegation-target-label">Delegate to:</label>
            <div className="delegation-target-info">
              <span className="delegation-target-name">{config.delegateName}</span>
              <span className="delegation-target-address">{formatAddress(delegateAddress)}</span>
            </div>
          </div>

          <div className="delegation-tokens">
            {tokensToShow.map(token => (
              <SingleTokenDelegation
                key={token}
                tokenType={token}
                delegatee={delegateAddress}
                onSuccess={handleSuccess}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

