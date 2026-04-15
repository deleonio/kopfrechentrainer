/// <reference types="vite/client" />

declare const __COMMIT_SHA__: string;
declare const __APP_VERSION__: string;
declare const __APP_NAME__: string;
declare const __APP_AUTHOR__: string;
declare const __APP_HOMEPAGE__: string;

// Inline declarations for vite-plugin-pwa virtual modules.
// These are needed because TypeScript 4.x with moduleResolution:"node"
// does not follow the vite-plugin-pwa/client import chain to reach the
// declare module blocks inside node_modules/vite-plugin-pwa/preact.d.ts.
declare module 'virtual:pwa-register/preact' {
  import type { StateUpdater } from 'preact/hooks';

  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: unknown) => void;
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, StateUpdater<boolean>];
    offlineReady: [boolean, StateUpdater<boolean>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}

declare module 'preact/debug';
