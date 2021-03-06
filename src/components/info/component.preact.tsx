import { Card, Form, message, Row } from 'antd';
import { h, JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { InfoController } from './controller';

export class InfoComponent extends ReactComponent<unknown, InfoController> implements GenericComponent {
  public ctrl: InfoController = new InfoController();

  public render(): JSX.Element {
    return (
      <div>
        <h1>Informationen zur Anwendung</h1>
        <Card>
          <h2>Datenschutz</h2>
          <p>
            Diese Anwendung wird als gesamtheitliches Anwendungsartefakt heruntergeladen und im Browser des Nutzers
            gestartet. Die Anwendung besitzt <strong>keine Kommunikationsschnittstellen</strong> zu externen Systemen,
            so dass{' '}
            <strong>
              alle erhobenen Daten (Spiel-Ergebnisse) im Browserspeicher auf dem Gerät des Nutzers verbleiben
            </strong>
            . Wird der Zwischenspeicher (Verlauf geleert) des Browsers gelöscht, so sind auch alle erhobenen Daten
            unwiderruflich gelöscht.
          </p>
        </Card>
        <br />
        <Card>
          <h2>OpenSource</h2>
          <p>
            Der Anwendungscode ist <strong>OpenSource</strong> und unterliegt der <strong>Apache 2.0 Lizenz</strong>.
          </p>
        </Card>
      </div>
    );
  }
}
