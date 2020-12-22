import { Layout, Menu, Table } from 'antd';
import { createRef, h, JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { PreactComponent } from '@leanup/lib/components/preact';

import { TableController } from './controller';

const { Header, Content, Footer } = Layout;

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Datum',
    dataIndex: '',
    key: 'name',
  },
  {
    title: 'Wasser',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Obst & Gemüse',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'hier',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'hier',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'hier',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'hier',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'hier',
    dataIndex: 'address',
    key: 'address',
  },
];

export class TableComponent extends PreactComponent<unknown, TableController> implements GenericComponent {
  public ctrl: TableController = new TableController();
  public ref = createRef();

  public constructor(props: unknown) {
    super(props, new TableController());
  }

  public render(): JSX.Element {
    return <Table dataSource={dataSource} columns={columns} />;
  }
}
