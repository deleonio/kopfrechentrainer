import { Card, Form, message, Row } from 'antd';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';
import Col from 'antd/es/grid/col';
import InputNumber from 'antd/es/input-number';
import Slider from 'antd/es/slider';
import Modal from 'antd/lib/modal/Modal';
import { h } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { ProfilController } from './controller';

export class ProfilComponent extends ReactComponent<unknown, ProfilController> implements GenericComponent {
  public readonly ctrl: ProfilController = new ProfilController();
  private isModalVisible = false;
  private timeoutRange: NodeJS.Timeout | undefined;
  private timeoutLimit: NodeJS.Timeout | undefined;

  render(): JSX.Element {
    return (
      <div>
        <Modal
          title="Profil löschen"
          visible={this.isModalVisible}
          onOk={() => {
            this.isModalVisible = false;
            this.ctrl.deleteProfile();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            message.success('Profil wurde gelöscht.');
            this.forceUpdate();
          }}
          onCancel={() => {
            this.isModalVisible = false;
            this.forceUpdate();
          }}
          okText="Ja"
          cancelText="Nein"
        >
          <p>Möchtest Du wirklich dieses Profil löschen?</p>
        </Modal>
        <h1>Profil einstellen</h1>
        <Form
          initialValues={{
            minValue: this.ctrl.minValue,
            maxValue: this.ctrl.maxValue,
            dayLimit: this.ctrl.dayLimit,
            operators: this.ctrl.operators,
            difficulty: this.ctrl.difficultyMin,
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
            <h2>Rechenarten einstellen</h2>
            <p>Wähle aus, welche Rechenarten in den Aufgaben vorkommen sollen.</p>
            <Row>
              <Col>
                <Form.Item label="Rechenarten" name="operators">
                  <Checkbox.Group
                    options={[
                      { label: 'Addition (+)', value: '+' },
                      { label: 'Subtraktion (-)', value: '-' },
                      { label: 'Multiplikation (•)', value: '•' },
                      { label: 'Division (:)', value: ':' },
                    ]}
                    onChange={(operators) => {
                      const wasSaved = this.ctrl.setOperators(operators as string[]);
                      if (wasSaved) {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        message.success('Rechenarten wurden gespeichert.');
                      } else {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        message.error('Bitte mindestens eine Rechenart auswählen.');
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
            <h2>Schwierigkeitsstufe</h2>
            <p>Wähle eine Stufe von 1 (leicht) bis 5 (schwer).</p>
            <Row>
              <Col style={{ width: '100%' }}>
                <Form.Item name="difficulty">
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }}
                    onAfterChange={(difficulty) => {
                      this.ctrl.setDifficulty(difficulty as number);
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      message.success('Schwierigkeitsstufe wurde gespeichert.');
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
            <h2>Profil löschen</h2>
            <p>Hier kannst Du das aktuelle Profil mit allen Einstellungen und Ergebnissen löschen.</p>
            <Button
              type="dashed"
              size="large"
              onClick={() => {
                this.isModalVisible = true;
                this.forceUpdate();
              }}
            >
              Profil löschen
            </Button>
          </Card>
        </Form>
      </div>
    );
  }
}
