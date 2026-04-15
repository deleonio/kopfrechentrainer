import { h, render, Fragment, Component, ComponentChildren } from 'preact';

import { DI } from '@leanup/lib/helpers/injector';

import './style.less';
import { AppComponent } from './components/app/component.preact';
import { PwaUpdatePrompt } from './components/pwa-update/component.preact';
import './shares/constant';
import './shares/register';

const isDev = Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);
if (isDev) {
  import('preact/debug');
}

import preactPkg from 'preact/package.json';

const renderFatalError = (message: string): void => {
  const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
  if (htmlDivElement instanceof HTMLDivElement) {
    htmlDivElement.style.display = 'inline';
    render(
      <div style={{ padding: '1rem' }}>
        <h1>Startfehler</h1>
        <p>Die Anwendung konnte nicht initialisiert werden.</p>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{message}</pre>
      </div>,
      htmlDivElement
    );
  }
};

interface IErrorBoundaryState {
  error: Error | null;
}

class AppErrorBoundary extends Component<{ children: ComponentChildren }, IErrorBoundaryState> {
  public state: IErrorBoundaryState = {
    error: null,
  };

  public static getDerivedStateFromError(error: unknown): IErrorBoundaryState {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }

  public componentDidCatch(error: Error, errorInfo: unknown): void {
    console.error('Unbehandelter Laufzeitfehler in der App:', error, errorInfo);
  }

  public render({ children }: { children: ComponentChildren }, { error }: IErrorBoundaryState): ComponentChildren {
    if (error) {
      return (
        <div style={{ padding: '1rem' }}>
          <h1>Es ist ein Fehler aufgetreten</h1>
          <p>Bitte Seite neu laden. Falls das Problem bleibt, Browser-Konsole prüfen.</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
        </div>
      );
    }
    return children;
  }
}

try {
  DI.register('Framework', {
    ...preactPkg,
    name: 'Preact',
  });

  const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
  if (htmlDivElement instanceof HTMLDivElement) {
    htmlDivElement.style.display = 'inline';
    render(
      <AppErrorBoundary>
        <Fragment>
          <AppComponent />
          <PwaUpdatePrompt />
        </Fragment>
      </AppErrorBoundary>,
      htmlDivElement
    );
  }
} catch (error) {
  const message = error instanceof Error ? `${error.message}\n\n${error.stack || ''}` : String(error);
  console.error('App-Initialisierung fehlgeschlagen:', error);
  renderFatalError(message);
}
