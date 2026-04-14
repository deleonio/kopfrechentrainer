import { Card, Form, message } from 'antd';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import List from 'antd/es/list';
import { h, JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';
import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../../services/storage/service';

export class StartComponent extends ReactComponent<unknown, unknown> implements GenericComponent {
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
  private profileName = '';

  public render(): JSX.Element {
    const profiles = this.storageService.getProfiles();
    return (
      <div>
        <h1>Profil auswählen</h1>
        <Card>
          <List
            dataSource={profiles}
            locale={{ emptyText: 'Noch kein Profil vorhanden.' }}
            renderItem={(profile) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => {
                      this.storageService.setActiveProfile(profile.id);
                      window.location.href = '#/';
                    }}
                  >
                    Auswählen
                  </Button>,
                ]}
              >
                {profile.name}
              </List.Item>
            )}
          />
        </Card>
        <br />
        <Card title="Neues Profil anlegen">
          <Form
            onFinish={() => {
              this.storageService.createProfile(this.profileName);
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              message.success('Profil wurde angelegt.');
              window.location.href = '#/';
            }}
          >
            <Form.Item>
              <Input
                placeholder="Profilname"
                maxLength={30}
                onChange={(event) => {
                  this.profileName = event.currentTarget.value;
                }}
              />
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Profil erstellen
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
