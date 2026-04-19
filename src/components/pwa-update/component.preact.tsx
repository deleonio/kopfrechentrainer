import { JSX } from 'preact';
import { useRegisterSW } from 'virtual:pwa-register/preact';

/**
 * Zeigt einen Hinweis an, wenn eine neue App-Version verfügbar ist.
 * Der Nutzer kann die Aktualisierung bestätigen oder ablehnen.
 */
export function PwaUpdatePrompt(): JSX.Element | null {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl: string, r: ServiceWorkerRegistration | undefined): void {
      if (r) {
        // Alle 60 Sekunden prüfen, ob ein Update verfügbar ist
        setInterval((): void => {
          void r.update();
        }, 60 * 1000);
      }
    },
    onRegisterError(error: unknown): void {
      console.error('Service-Worker-Registrierung fehlgeschlagen:', error);
    },
  });

  const close = (): void => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!needRefresh && !offlineReady) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999,
        background: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        padding: '12px 16px',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>
        {needRefresh ? 'Neue Version verfügbar!' : 'App bereit für Offline-Nutzung'}
      </p>
      {needRefresh && (
        <p style={{ margin: 0, fontSize: '13px', color: '#595959' }}>
          Jetzt aktualisieren, um die neueste Version zu laden.
        </p>
      )}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={close}
          style={{
            padding: '4px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          Schließen
        </button>
        {needRefresh && (
          <button
            onClick={(): void => {
              void updateServiceWorker(true);
            }}
            style={{
              padding: '4px 12px',
              border: 'none',
              borderRadius: '4px',
              background: '#e2313b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Aktualisieren
          </button>
        )}
      </div>
    </div>
  );
}
