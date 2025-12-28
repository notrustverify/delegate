import { config } from '../config/env';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Powered by <a href="https://notrustverify.ch/" target="_blank" rel="noopener noreferrer">{config.delegateName}</a> · <a href="https://x.com/notrustverif" target="_blank" rel="noopener noreferrer">𝕏</a> · <a href="https://dune.com/notrustverify/aave-governance" target="_blank" rel="noopener noreferrer">Delegation Stats</a>
      </p>
      <p className="footer-inspired">
        Inspired by <a href="https://apps.aavechan.com/delegate" target="_blank" rel="noopener noreferrer">AaveChan</a>
      </p>
    </footer>
  );
}
