import { h, render, Fragment } from 'preact';

import { DI } from '@leanup/lib/helpers/injector';

import './style.less';
import { AppComponent } from './components/app/component.preact';
import { PwaUpdatePrompt } from './components/pwa-update/component.preact';
import './shares/constant';
import './shares/register';

if (import.meta.env.DEV) {
  import('preact/debug');
}

import preactPkg from 'preact/package.json';
DI.register('Framework', {
  ...preactPkg,
  name: 'Preact',
});

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
  htmlDivElement.style.display = 'inline';
  render(
    <Fragment>
      <AppComponent />
      <PwaUpdatePrompt />
    </Fragment>,
    htmlDivElement
  );
}
