import { Card, Form, Row } from 'antd';
import Button from 'antd/es/button';
import Col from 'antd/es/grid/col';
import InputNumber from 'antd/es/input-number';
import Modal from 'antd/lib/modal/Modal';
import { h } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { ProfilController } from './controller';

export class ProfilComponent extends ReactComponent<unknown, ProfilController> implements GenericComponent {
  public readonly ctrl: ProfilController = new ProfilController();
  private isModalVisible = false;

  render(): JSX.Element {
    return (
      <div>
        <Modal
          title="Speicher bereinigen"
          visible={this.isModalVisible}
          onOk={() => {
            this.isModalVisible = false;
            this.ctrl.clearStore();
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
            <p>
              Gebe hier die kleinste und größte Zahl ein, innerhalb derer die Rechenaufgaben generiert werden sollen.
            </p>
            <Row>
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
            </Row>
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
                        this.ctrl.setRange(this.ctrl.minValue, maxValue);
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
