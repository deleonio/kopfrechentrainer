import { h, JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { HomeController } from './controller';

export class HomeComponent extends ReactComponent<unknown, HomeController> implements GenericComponent {
  public ctrl: HomeController = new HomeController();

  public render(): JSX.Element {
    return <div>Home</div>;
  }
}
