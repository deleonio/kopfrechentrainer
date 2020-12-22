import { Badge, Button, Card, Col, Form, InputNumber, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { createRef, h, JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { RechnenController } from './controller';

export class RechnenComponent extends ReactComponent<unknown, RechnenController> implements GenericComponent {
  public ctrl: RechnenController = new RechnenController();
  private toggle = true;
  public ergebnis: number = 0;
  public ergebnisText: string = 'Richtig';
  public ergebnisColor = '#0f0';
  private formRef = createRef<FormInstance>();

  public render(): JSX.Element {
    return (
      <Form
        ref={this.formRef}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values: any) => {
          console.log('Success:', values);
          this.ergebnis = values.ergebnis;
          document.querySelector('#eingabe')?.setAttribute('disabled', 'disabled');
          this.ergebnisText = this.ergebnis === this.ctrl.aufgabe.getErgebnis() ? 'Richtig' : 'Falsch';
          this.ergebnisColor = this.ergebnis === this.ctrl.aufgabe.getErgebnis() ? '#0f0' : '#f00';
          this.toggle = this.toggle === false;
          this.forceUpdate();
        }}
        style={{
          fontSize: '200%',
        }}
      >
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            {this.ctrl.aufgabe.value[0]} <b>{this.ctrl.aufgabe.sign}</b> {this.ctrl.aufgabe.value[1]}
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            =
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {this.toggle === true && (
              <Form.Item name="ergebnis">
                <InputNumber size="large" id="eingabe" type="number" />
              </Form.Item>
            )}
            {this.toggle === false && <span>{this.ergebnis}</span>}
          </Col>
          {this.toggle === false && (
            <Col span={24}>
              <Badge.Ribbon text={this.ergebnisText} color={this.ergebnisColor}>
                <Card>
                  Das Ergebnis ist <b>{this.ctrl.aufgabe.getErgebnis()}</b>.
                </Card>
              </Badge.Ribbon>
            </Col>
          )}
          <Col span={24} style={{ textAlign: 'center' }}>
            {this.toggle === true && (
              <Button type="primary" htmlType="submit" size="large">
                Prüfen
              </Button>
            )}
            {this.toggle === false && (
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  this.ctrl.createAufgabe();
                  this.toggle = this.toggle === false;
                  this.formRef.current.resetFields();
                  setTimeout(() => {
                    document.querySelector('#eingabe')?.removeAttribute('disabled');
                    console.log(document.querySelector('#eingabe'));
                    document.querySelector('#eingabe')?.focus();
                  }, 50);
                  this.forceUpdate();
                }}
              >
                Nächste Aufgabe
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}
