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
            gestartet. Die Anwendung besitzt keine Kommunikationsschnittstellen zu externen Systemen, so dass alle
            erhobenen Daten (Spiel-Ergebnisse) im Browserspeicher auf dem Gerät des Nutzers verbleiben. Wird der
            Zwischenspeicher (Verlauf leeren) des Browsers gelöscht, so sind auch alle erhobenen Daten unwiderruflich
            gelöscht.
          </p>
        </Card>
        <br />
        <Card>
          <h2>OpenSource</h2>
          <p>Der Anwendungscode ist OpenSource und unterliegt der Apache 2.0 Lizenz.</p>
        </Card>
      </div>
    );
  }
}
