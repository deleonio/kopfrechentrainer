import { h, render } from 'preact';

import { DI } from '@leanup/lib/helpers/injector';

import { AppComponent } from './components/app/component.preact';

// https://github.com/preactjs/preact/blob/master/README.md#debug-mode
const ENVs = {
  NODE_ENV: '$$NODE_ENV$$',
};
if (ENVs.NODE_ENV === 'development') {
  require('preact/debug');
}

require('./shares/constant');
DI.register('Framework', {
  ...require('preact/package.json'),
  name: 'Preact',
});
require('./shares/register');

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
  htmlDivElement.style.display = 'inline';
  render(<AppComponent />, htmlDivElement);
}
