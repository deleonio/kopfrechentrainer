import { Card, Form, message, Row } from 'antd';
import Button from 'antd/es/button';
import Col from 'antd/es/grid/col';
import InputNumber from 'antd/es/input-number';
import Modal from 'antd/lib/modal/Modal';
import Checkbox from 'antd/es/checkbox';
import { h } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { ProfilController, Rechenart } from './controller';

export class ProfilComponent extends ReactComponent<unknown, ProfilController> implements GenericComponent {
  public readonly ctrl: ProfilController = new ProfilController();
  private isModalVisible = false;
  private timeoutRange: NodeJS.Timeout | undefined;
  private timeoutLimit: NodeJS.Timeout | undefined;

  private getOperationLabel(operation: Rechenart): string {
    switch (operation) {
      case 'addition':
        return 'Addition ( + )';
      case 'subtraction':
        return 'Subtraktion ( - )';
      case 'multiplication':
        return 'Multiplikation ( × )';
      default:
        return operation;
    }
  }

  render(): JSX.Element {
    const enabledCount = Object.values(this.ctrl.operations).filter(Boolean).length;
    return (
      <div>
        <Modal
          title="Speicher bereinigen"
          visible={this.isModalVisible}
          onOk={() => {
            this.isModalVisible = false;
            this.ctrl.clearStore();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            message.success('Speicher wurden bereinigt.');
            this.forceUpdate();
          }}
          onCancel={() => {
            this.isModalVisible = false;
            this.forceUpdate();
          }}
          okText="Ja"
          cancelText="Nein"
        >
          <p>Möchtest Du wirklich den gesamten Speicherstand löschen?</p>
        </Modal>
        <h1>Profil einstellen</h1>
        <Form
          initialValues={{
            minValue: this.ctrl.minValue,
            maxValue: this.ctrl.maxValue,
            dayLimit: this.ctrl.dayLimit,
          }}
          noValidate={true}
        >
          <Card>
            <h2>Zahlenbereich einstellen</h2>
            <p>Gebe hier eine Zahl größer gleich 20 ein, bis welcher die Rechenaufgaben generiert werden sollen.</p>
            {/* <Row>
              <Col>
                <Form.Item label="Kleinste Zahl" name="minValue">
                  <InputNumber
                    type="number"
                    required={true}
                    maxLength={4}
                    min={-999}
                    max={999}
                    onChange={(minValue) => {
                      if (typeof minValue === 'number') {
                        this.ctrl.setRange(minValue, this.ctrl.maxValue);
                      }
                      this.forceUpdate();
                    }}
                  />
                </Form.Item>
              </Col>
            </Row> */}
            <Row>
              <Col>
                <Form.Item label="Größte Zahl" name="maxValue">
                  <InputNumber
                    type="number"
                    required={true}
                    maxLength={4}
                    min={-999}
                    max={999}
                    onChange={(maxValue) => {
                      if (typeof maxValue === 'number') {
                        this.ctrl.setRange(0, maxValue);
                        // this.ctrl.setRange(this.ctrl.minValue, maxValue);
                        clearTimeout(this.timeoutRange as NodeJS.Timeout);
                        this.timeoutRange = setTimeout(() => {
                          // eslint-disable-next-line @typescript-eslint/no-floating-promises
                          message.success('Größte Zahl wurden gespeichert.');
                        }, 1000);
                      }
                      this.forceUpdate();
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <br />
          <Card>
            <h2>Rechenarten auswählen</h2>
            <p>Wähle aus, welche Rechenarten verwendet werden sollen.</p>
            <Row gutter={[0, 16]}>
              {Object.entries(this.ctrl.operations).map(([operation, isEnabled]) => {
                const key = operation as Rechenart;
                return (
                  <Col key={operation} span={24}>
                    <Checkbox
                      checked={isEnabled}
                      disabled={enabledCount === 1 && isEnabled}
                      onChange={(event) => {
                        const saved = this.ctrl.setOperation(key, event.target.checked);
                        this.forceUpdate();
                        if (saved) {
                          // eslint-disable-next-line @typescript-eslint/no-floating-promises
                          message.success('Rechenarten wurden gespeichert.');
                        } else {
                          // eslint-disable-next-line @typescript-eslint/no-floating-promises
                          message.warning('Mindestens eine Rechenart muss aktiv bleiben.');
                        }
                      }}
                    >
                      {this.getOperationLabel(key)}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Card>
          <br />
          <Card>
            <h2>Ziele einstellen</h2>
            <p>Stelle hier die Lernziele ein.</p>
            <Row>
              <Col>
                <Form.Item label="Aufgaben pro Tag" name="dayLimit">
                  <InputNumber
                    type="number"
                    required={true}
                    onChange={(dayLimit) => {
                      if (typeof dayLimit === 'number') {
                        this.ctrl.setDayLimit(dayLimit);
                        clearTimeout(this.timeoutLimit as NodeJS.Timeout);
                        this.timeoutLimit = setTimeout(() => {
                          // eslint-disable-next-line @typescript-eslint/no-floating-promises
                          message.success('Aufgaben pro Tag wurden gespeichert.');
                        }, 1000);
                      }
                      this.forceUpdate();
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <br />
          <Card>
            <h2>Speicher bereinigen</h2>
            <p>Sollen alle Einstellungen und Ergebnisse gelöscht werden, dann klicke auf Zurücksetzen.</p>
            <Button
              type="dashed"
              size="large"
              onClick={() => {
                this.isModalVisible = true;
                this.forceUpdate();
              }}
            >
              Zurücksetzen
            </Button>
          </Card>
        </Form>
      </div>
    );
  }
}
