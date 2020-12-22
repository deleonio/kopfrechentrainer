import { Layout, Menu } from 'antd';
import { h, JSX } from 'preact';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { FormularComponent } from '../formular/component.preact';
import { HomeComponent } from '../home/component.preact';
import { RechnenComponent } from '../rechnen/component.preact';
import { TableComponent } from '../table/component.preact';
import { AppController } from './controller';

const { Header, Content, Footer } = Layout;

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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" active={false}>
              <a href="#">Rechnen</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ backgroundColor: 'white', padding: '25px' }}>
          <Router>
            <Switch>
              <Route exact path="/">
                <RechnenComponent />
              </Route>
              <Route exact path="/uebersicht">
                <TableComponent />
              </Route>
              <Route exact path="/formular">
                <FormularComponent />
              </Route>
            </Switch>
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2020</Footer>
      </Layout>
    );
  }
}
