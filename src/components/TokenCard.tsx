import aaveIcon from '../assets/tokens/aave.svg';
import stkAaveIcon from '../assets/tokens/stkaave.svg';
import { config, getDisplayAddress } from '../config/env';

interface TokenCardProps {
  variant: 'all' | 'aave' | 'stkaave';
  title: string;
  description: string;
  onClick?: () => void;
}

function TokenIcon({ type, size = 'normal' }: { type: 'aave' | 'stkaave' | 'aaave'; size?: 'normal' | 'large' }) {
  const sizeClass = size === 'large' ? 'large' : '';
  
  const icons = {
    aave: aaveIcon,
    stkaave: stkAaveIcon,
    aaave: aaveIcon, // Use AAVE icon for aAAVE as well
  };
  
  return (
    <div className={`token-icon ${type} ${sizeClass}`}>
      <img src={icons[type]} alt={type} className="token-img" />
    </div>
  );
}

export function TokenCard({ variant, title, description, onClick }: TokenCardProps) {
  const isPrimary = variant === 'all';
  
  // Replace placeholder with actual delegate name and truncated address
  const formattedDescription = description.replace(/{delegateName}/g, config.delegateName)
    .replace(/{delegateAddress}/g, getDisplayAddress());
  
  return (
    <div 
      className={`token-card ${isPrimary ? 'primary' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {variant === 'all' ? (
        <div className="token-icons stacked">
          <TokenIcon type="aave" />
          <TokenIcon type="stkaave" />
          <TokenIcon type="aaave" />
        </div>
      ) : (
        <div className="token-icons">
          <TokenIcon type={variant} size="large" />
        </div>
      )}
      
      <div className="token-card-info">
        <h3 className="token-card-title">{title}</h3>
        <p className="token-card-description">{formattedDescription}</p>
      </div>
    </div>
  );
}
