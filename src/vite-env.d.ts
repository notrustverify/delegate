/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DELEGATE_ADDRESS: string;
  readonly VITE_DELEGATE_NAME: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


