import { Button, DatePicker, Form, InputNumber } from 'antd';
import { h, JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { PreactComponent } from '@leanup/lib/components/preact';

import { FormularController } from './controller';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export class FormularComponent extends PreactComponent<unknown, unknown> implements GenericComponent {
  public readonly ctrl: FormularController = new FormularController();

  public render(): JSX.Element {
    return (
      <Form {...layout} name="nest-messages" onFinish={(messung) => this.ctrl.onFinish(messung)} validateMessages={validateMessages}>
        <Form.Item name={['datum']} label="Name" rules={[{ type: 'date' }]}>
          <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['wasser']} initialValue={0} label="Wasser" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['obst']} initialValue={0} label="Obst" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['gemuese']} initialValue={0} label="Gemüse" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['getreide']} initialValue={0} label="Getreide" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['milch']} initialValue={0} label="Milch" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['fett']} initialValue={0} label="Fett" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['zucker']} initialValue={0} label="Zucker" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['gewicht']} initialValue={0} label="Gewicht" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['schritte']} initialValue={0} label="Schritte" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={['sport']} initialValue={0} label="Sport" rules={[{ type: 'number' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
