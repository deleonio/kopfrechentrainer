import { Framework } from '../models/framework.interface';

export const APP_HTML_ELEMENT: HTMLElement = document.createElement('app');
export const STARTUP_TIMESTAMP: number = Date.now();
export const CLI_DETAILS: Framework = {
  name: 'Vite',
  version: '7',
};
