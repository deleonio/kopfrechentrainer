import { Table } from 'antd';
import { createRef, h, JSX, RefObject } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { DataSet, HistoryController } from './controller';

export class HistoryComponent extends ReactComponent<unknown, HistoryController> implements GenericComponent {
  public ctrl: HistoryController = new HistoryController();
  private chart: RefObject<HTMLCanvasElement> = createRef<HTMLCanvasElement>();
  private chartExt: RefObject<HTMLCanvasElement> = createRef<HTMLCanvasElement>();
  public dataSource: any[] = [];

  public componentDidMount(): void {
    this.dataSource = this.ctrl.drawChart(this.chart.current as HTMLCanvasElement);
    this.ctrl.drawChartExt(this.chartExt.current as HTMLCanvasElement);
    this.dataSource = this.dataSource.reverse();
    const dataSourceSum: DataSet = {
      date: 'Gesamt',
      right: 0,
      wrong: 0,
      sum: 0,
    };
    this.dataSource.forEach((data: DataSet) => {
      dataSourceSum.right += data.right;
      dataSourceSum.wrong += data.wrong;
      dataSourceSum.sum += data.sum;
    });
    this.dataSource.push(dataSourceSum);
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
        <h1>Verlauf anschauen</h1>
        <div style={{ height: '500px' }}>
          <canvas ref={this.chart} width="100%" height="100%"></canvas>
        </div>
        <div style={{ height: '500px' }}>
          <canvas ref={this.chartExt} width="100%" height="100%"></canvas>
        </div>
        <hr />
        <Table dataSource={this.dataSource} pagination={{ position: ['topCenter'] }} columns={columns} />
      </div>
    );
  }
}
