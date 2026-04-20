/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare const __COMMIT_SHA__: string;
declare const __APP_VERSION__: string;
declare const __APP_NAME__: string;
declare const __APP_AUTHOR__: string;
declare const __APP_HOMEPAGE__: string;

// Explicit ambient declaration for the PWA virtual module.
// vite-plugin-pwa/client imports its per-framework .d.ts files via ES-import
// syntax, which makes them module-scoped rather than globally ambient.
// Inlining the declaration here (in a script file) ensures tsc always sees it.
declare module 'virtual:pwa-register/preact' {
	import type { Dispatch, StateUpdater } from 'preact/hooks';

	export interface RegisterSWOptions {
		immediate?: boolean;
		onNeedRefresh?: () => void;
		onOfflineReady?: () => void;
		onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
		onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void;
		onRegisterError?: (error: unknown) => void;
	}

	export function useRegisterSW(options?: RegisterSWOptions): {
		needRefresh: [boolean, Dispatch<StateUpdater<boolean>>];
		offlineReady: [boolean, Dispatch<StateUpdater<boolean>>];
		updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
	};
}
