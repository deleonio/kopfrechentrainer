import Menu from 'antd/es/menu';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { h, JSX } from 'preact';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import { DI } from '@leanup/lib/helpers/injector';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { HistoryComponent } from '../history/component.preact';
import { InfoComponent } from '../info/component.preact';
import { ProfilComponent } from '../profil/component.preact';
import { RechnenComponent } from '../rechnen/component.preact';
import { StartComponent } from '../start/component.preact';
import { StorageService } from '../../services/storage/service';
import { AppController } from './controller';

const APP_METADATE = {
  author: __APP_AUTHOR__,
  homepage: __APP_HOMEPAGE__,
  name: __APP_NAME__,
  version: __APP_VERSION__,
};

export class AppComponent extends ReactComponent<unknown, AppController> implements GenericComponent {
  public ctrl: AppController = new AppController();
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');

  public constructor(props: unknown) {
    super(props);
  }

  public render(): JSX.Element {
    const hasActiveProfile = this.storageService.hasActiveProfile();
    return (
      <Layout>
        <Header className="header">
          <a href="/" style={{ float: 'left', marginRight: '1em' }}>
            {/* <img src={IMG as string} alt="DiPA-Logo" style={{ height: '40px' }} /> */}
          </a>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key="0">
              <a href="#/start">Start</a>
            </Menu.Item>
            {hasActiveProfile && (
              <Menu.Item key="1">
                <a href="#/">Rechnen</a>
              </Menu.Item>
            )}
            {hasActiveProfile && (
              <Menu.Item key="2">
                <a href="#/history">Verlauf</a>
              </Menu.Item>
            )}
            {hasActiveProfile && (
              <Menu.Item key="3">
                <a href="#/profil">Profil</a>
              </Menu.Item>
            )}
            <Menu.Item key="4">
              <a href="#/info">Info</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ backgroundColor: 'white', padding: '25px' }}>
          <Router>
            <Switch>
              <Route exact path="/start">
                <StartComponent />
              </Route>
              <Route exact path="/">
                {hasActiveProfile ? <RechnenComponent /> : <StartComponent />}
              </Route>
              <Route exact path="/history">
                {hasActiveProfile ? <HistoryComponent /> : <StartComponent />}
              </Route>
              <Route exact path="/profil">
                {hasActiveProfile ? <ProfilComponent /> : <StartComponent />}
              </Route>
              <Route exact path="/info">
                <InfoComponent />
              </Route>
            </Switch>
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          © {new Date(Date.now()).getFullYear()} - v{APP_METADATE.version} ({__COMMIT_SHA__.slice(0, 7)})
        </Footer>
      </Layout>
    );
  }
}
