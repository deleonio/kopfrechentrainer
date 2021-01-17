import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Form, { FormInstance } from 'antd/es/form';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import InputNumber from 'antd/es/input-number';
import Progress from 'antd/es/progress';
import Modal from 'antd/lib/modal/Modal';
import { createRef, h, JSX } from 'preact';
import { KeyboardEventHandler } from 'react';

import { TrophyTwoTone } from '@ant-design/icons';
import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { RechnenController } from './controller';

export class RechnenComponent extends ReactComponent<unknown, RechnenController> implements GenericComponent {
  public ctrl: RechnenController = new RechnenController();
  private toggle = true;
  private formRef = createRef<FormInstance>();
  private isModalVisible = false;
  private isSubmitted = false;
  private isEingabeDisabled = false;

  public componentDidMount(): void {
    setTimeout(() => {
      const input: HTMLInputElement = document.querySelector('#eingabe') as HTMLInputElement;
      if (input instanceof HTMLInputElement) {
        input.removeAttribute('disabled');
        input.focus();
      }
    }, 50);
  }

  private onKeyUp(event: unknown): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const button: HTMLButtonElement = document.querySelector('#pruefen') as HTMLButtonElement;
    if (button instanceof HTMLButtonElement) {
      if (target.value === '') {
        button.setAttribute('disabled', 'disabled');
      } else {
        button.removeAttribute('disabled');
      }
    }
  }

  private onReset() {
    this.isSubmitted = false;
    this.ctrl.createAufgabe();
    this.toggle = true;
    this.formRef?.current?.resetFields();
    this.isEingabeDisabled = false;

    setTimeout(() => {
      const input: HTMLInputElement = document.querySelector('#eingabe') as HTMLInputElement;
      if (input instanceof HTMLInputElement) {
        input.removeAttribute('disabled');
        input.focus();
      }
    }, 50);
  }

  public render(): JSX.Element {
    setTimeout(() => {
      const button: HTMLButtonElement = document.querySelector('#aufgaben-erweitern') as HTMLButtonElement;
      if (button instanceof HTMLButtonElement) {
        button.setAttribute('disabled', 'disabled');
        setTimeout(() => {
          if (button instanceof HTMLButtonElement) {
            button.removeAttribute('disabled');
          }
        }, 1500);
      }
    }, 50);
    const progressData = this.ctrl.getDayProgress();
    const percent = Math.round((progressData.right / progressData.limit) * 100);
    if (percent >= 100) {
      this.ctrl.ergebnisText = 'Glückwunsch';
      this.ctrl.ergebnisColor = '#eb2f96';
    }
    return (
      <div>
        <Modal
          title="Weitere Kopfrechenaufgaben"
          visible={this.isModalVisible}
          onOk={() => {
            this.isModalVisible = false;
            this.ctrl.incDayLimit(10);
            this.onReset();
            this.forceUpdate();
          }}
          onCancel={() => {
            this.isModalVisible = false;
            this.forceUpdate();
          }}
          okText="Ja"
          cancelText="Nein"
        >
          <p>Möchtest Du wirklich weitere 10 Aufgaben rechnen?</p>
        </Modal>
        <h1>Rechnen trainieren</h1>
        <Badge.Ribbon text={this.ctrl.ergebnisText} color={this.ctrl.ergebnisColor}>
          <Card>
            {percent < 100 && (
              <Form
                ref={this.formRef}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={(values: { ergebnis: number }) => {
                  if (this.isSubmitted) {
                    return;
                  }
                  this.isSubmitted = true;
                  this.ctrl.storeResult(values.ergebnis);
                  document.querySelector('#eingabe')?.setAttribute('disabled', 'disabled');
                  this.ctrl.aufgabe.result = values.ergebnis;
                  this.ctrl.ergebnisText = values.ergebnis === this.ctrl.aufgabe.getErgebnis() ? 'Richtig' : 'Falsch';
                  this.ctrl.ergebnisColor = values.ergebnis === this.ctrl.aufgabe.getErgebnis() ? '#52c41a' : '#e2313b';
                  this.toggle = this.toggle === false;
                  this.isEingabeDisabled = true;
                  setTimeout(() => {
                    const button: HTMLButtonElement = document.querySelector('#neue-aufgabe') as HTMLButtonElement;
                    if (button instanceof HTMLButtonElement) {
                      button.setAttribute('disabled', 'disabled');
                      setTimeout(() => {
                        if (button instanceof HTMLButtonElement) {
                          button.removeAttribute('disabled');
                          button.focus();
                          // button.click();
                        }
                      }, 1000);
                    }
                  }, 50);
                  setTimeout(() => {
                    const button: HTMLButtonElement = document.querySelector(
                      '#aufgaben-erweitern'
                    ) as HTMLButtonElement;
                    if (button instanceof HTMLButtonElement) {
                      button.setAttribute('disabled', 'disabled');
                      setTimeout(() => {
                        if (button instanceof HTMLButtonElement) {
                          button.removeAttribute('disabled');
                        }
                      }, 1500);
                    }
                  }, 50);
                  this.forceUpdate();
                }}
                onReset={() => {
                  if (this.isSubmitted === false) {
                    return;
                  }
                  this.onReset();
                  this.forceUpdate();
                }}
                style={{
                  fontSize: '200%',
                }}
              >
                <Row>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    {this.ctrl.aufgabe.values[0]} <b>{this.ctrl.aufgabe.sign}</b> {this.ctrl.aufgabe.values[1]}
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    =
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Form.Item name="ergebnis">
                      <InputNumber
                        disabled={this.isEingabeDisabled}
                        style={{ fontWeight: 'bold' }}
                        maxLength={4}
                        required
                        min={0}
                        onKeyUp={this.onKeyUp.bind(this)}
                        size="large"
                        id="eingabe"
                        type="number"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {this.toggle === true && (
                  <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                      <Button type="primary" id="pruefen" htmlType="submit" size="large">
                        Prüfen
                      </Button>
                    </Col>
                  </Row>
                )}
                {this.toggle === false && (
                  <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                      <Button type="primary" id="neue-aufgabe" disabled htmlType="reset" size="large">
                        Nächste Aufgabe
                      </Button>
                    </Col>
                    <Col span={24} style={{ textAlign: 'center' }}>
                      <hr />
                      Das Ergebnis ist <b>{this.ctrl.aufgabe.getErgebnis()}</b>.
                    </Col>
                  </Row>
                )}
              </Form>
            )}
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                {percent >= 100 && <TrophyTwoTone style={{ fontSize: '600%', margin: '20px' }} />}
                <br />
                <Progress percent={percent} success={{ percent: percent }} />
              </Col>
              {percent >= 100 && (
                <Col span={24} style={{ textAlign: 'center' }}>
                  <br />
                  <Button
                    type="primary"
                    disabled
                    id="aufgaben-erweitern"
                    onClick={() => {
                      this.isModalVisible = true;
                      this.forceUpdate();
                    }}
                  >
                    10 weitere Aufgabe angehen
                  </Button>
                </Col>
              )}
            </Row>
          </Card>
        </Badge.Ribbon>
      </div>
    );
  }
}
