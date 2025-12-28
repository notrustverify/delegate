import { SunIcon, MoonIcon } from './Icons';
import { ConnectWallet } from './ConnectWallet';
import { config } from '../config/env';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">{config.delegateName}</span>
      </div>
      
      <div className="header-actions">
        <button 
          className="theme-toggle" 
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        
        <ConnectWallet />
      </div>
    </header>
  );
}
