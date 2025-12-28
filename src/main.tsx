import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WalletProvider } from './components/WalletProvider'
import App from './App'
import { config } from './config/env'
import './index.css'

// Set the main color from environment variable for light theme
document.documentElement.style.setProperty('--bg-primary', config.mainColor);

// Create a style element to set dark theme color
// The inline style in App.tsx will override this when theme changes
const darkThemeStyle = document.createElement('style');
darkThemeStyle.id = 'custom-dark-theme-color';
darkThemeStyle.textContent = `
  [data-theme="dark"] {
    --bg-primary: ${config.mainColorDark};
  }
`;
document.head.appendChild(darkThemeStyle);

// Update theme-color meta tag (will be updated dynamically when theme changes)
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
if (themeColorMeta) {
  // Set initial theme color based on current theme
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.getAttribute('data-theme') && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  themeColorMeta.setAttribute('content', isDark ? config.mainColorDark : config.mainColor);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>,
)
