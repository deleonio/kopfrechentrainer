import Menu from 'antd/es/menu';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { h, JSX } from 'preact';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { HistoryComponent } from '../history/component.preact';
import { ProfilComponent } from '../profil/component.preact';
import { RechnenComponent } from '../rechnen/component.preact';
import { AppController } from './controller';

const APP_METADATE = {
  author: '$$APP_AUTHOR$$',
  homepage: '$$APP_HOMEPAGE$$',
  name: '$$APP_NAME$$',
  version: '$$APP_VERSION$$',
};

export class AppComponent extends ReactComponent<unknown, AppController> implements GenericComponent {
  public ctrl: AppController = new AppController();

  public constructor(props: unknown) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Layout>
        <Header className="header">
          <a href="/" style={{ float: 'left', marginRight: '1em' }}>
            {/* <img src={IMG as string} alt="DiPA-Logo" style={{ height: '40px' }} /> */}
          </a>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key="0">
              <a href="#">Rechnen</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="#history">Verlauf</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="#profil">Profil</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ backgroundColor: 'white', padding: '25px' }}>
          <Router>
            <Switch>
              <Route exact path="/">
                <RechnenComponent />
              </Route>
              <Route exact path="/history">
                <HistoryComponent />
              </Route>
              <Route exact path="/profil">
                <ProfilComponent />
              </Route>
            </Switch>
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2020 - v{APP_METADATE.version}</Footer>
      </Layout>
    );
  }
}
