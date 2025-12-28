import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Header } from './components/Header';
import { TokenCard } from './components/TokenCard';
import { Footer } from './components/Footer';
import { DelegationModal } from './components/DelegationModal';
import { config, getDisplayAddress } from './config/env';
import { type TokenType } from './config/contracts';
import './App.css';

function App() {
  const { isConnected } = useAccount();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [delegationModal, setDelegationModal] = useState<{
    isOpen: boolean;
    tokenType: TokenType | 'all';
  }>({
    isOpen: false,
    tokenType: 'all',
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleCardClick = (tokenType: TokenType | 'all') => {
    if (!isConnected) {
      // Could show a toast/message to connect wallet first
      alert('Please connect your wallet first');
      return;
    }
    setDelegationModal({ isOpen: true, tokenType });
  };

  const closeModal = () => {
    setDelegationModal({ ...delegationModal, isOpen: false });
  };

  return (
    <div className="app">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      
      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Delegation Hub</h1>
          <p className="hero-subtitle">
            The platform for delegating your tokens to {config.delegateName} ({getDisplayAddress()})
          </p>
        </section>

        <div className="cards-container">
          <TokenCard
            variant="all"
            title="All tokens"
            description={`Delegate your AAVE, stkAAVE & aAAVE to {delegateAddress}`}
            onClick={() => handleCardClick('all')}
          />
          
          <div className="cards-row">
            <TokenCard
              variant="aave"
              title="AAVE"
              description={`Delegate your AAVE tokens to {delegateAddress}`}
              onClick={() => handleCardClick('aave')}
            />
            <TokenCard
              variant="stkaave"
              title="stkAAVE"
              description={`Delegate your stkAAVE tokens to {delegateAddress}`}
              onClick={() => handleCardClick('stkaave')}
            />
          </div>
        </div>
      </main>

      <Footer />

      <DelegationModal
        isOpen={delegationModal.isOpen}
        onClose={closeModal}
        tokenType={delegationModal.tokenType}
      />
    </div>
  );
}

export default App;
