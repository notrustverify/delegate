import { config } from '../config/env';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Powered by {config.delegateName}
      </p>
      <p className="footer-inspired">
        Inspired by <a href="https://apps.aavechan.com/delegate" target="_blank" rel="noopener noreferrer">AaveChan</a>
      </p>
    </footer>
  );
}
