import { Table } from 'antd';
import { createRef, h, JSX, RefObject } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { HistoryController } from './controller';

export class HistoryComponent extends ReactComponent<unknown, HistoryController> implements GenericComponent {
  public ctrl: HistoryController = new HistoryController();
  private chart: RefObject<HTMLCanvasElement> = createRef<HTMLCanvasElement>();
  public dataSource: any[] = [];

  public componentDidMount(): void {
    this.dataSource = this.ctrl.drawChart(this.chart.current as HTMLCanvasElement);
    this.dataSource = this.dataSource.reverse();
    this.forceUpdate();
  }

  public render(): JSX.Element {
    const columns = [
      {
        title: 'Datum',
        dataIndex: 'date',
        key: 'date',
        align: 'center' as const,
      },
      {
        title: 'Richtig',
        dataIndex: 'right',
        key: 'right',
        align: 'right' as const,
      },
      {
        title: 'Falsch',
        dataIndex: 'wrong',
        key: 'wrong',
        align: 'right' as const,
      },
      {
        title: 'Gesamt',
        dataIndex: 'sum',
        key: 'sum',
        align: 'right' as const,
      },
    ];

    return (
      <div>
        <div style={{ height: '500px' }}>
          <canvas ref={this.chart} width="100%" height="100%"></canvas>
        </div>
        <hr />
        <Table dataSource={this.dataSource} pagination={{ position: ['topCenter'] }} columns={columns} />
      </div>
    );
  }
}
