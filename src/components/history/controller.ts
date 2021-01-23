/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Chart, ChartDataSets } from 'chart.js';

import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../../services/storage/service';

interface AufgabeStore {
  values: number[];
  answer: number;
  result: number;
  date: number;
}

export interface DataSet {
  date: string;
  right: number;
  wrong: number;
  sum: number;
}

export class HistoryController extends AbstractController {
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');

  public drawChart(ref: HTMLCanvasElement): DataSet[] {
    const orderedResults = this.getOrderedResults();
    const labels: string[] = [];
    const dataSource: DataSet[] = [];
    const datasets: ChartDataSets[] = [
      {
        label: 'Richtig',
        data: [],
        borderColor: 'rgba(100,200,200,1)',
        backgroundColor: 'rgba(100,200,200,.25)',
        borderWidth: 1,
      },
      {
        label: 'Falsch',
        data: [],
        borderColor: 'rgba(255,125,150,1)',
        backgroundColor: 'rgba(255,125,150,.25)',
        borderWidth: 1,
      },
    ];
    orderedResults.forEach((yearResults: AufgabeStore[][][], year: number) => {
      yearResults.forEach((monthResults: AufgabeStore[][], month: number) => {
        monthResults.forEach((dayResults: AufgabeStore[], day: number) => {
          const result = this.getRightWrongSum(dayResults);
          labels.push(`${day}.${month + 1}.${year}`);
          datasets[0].data?.push(result.right);
          datasets[1].data?.push(result.wrong);
          // datasets[0].data?.push(result.right / result.sum);
          // datasets[1].data?.push(result.wrong / result.sum);
          dataSource.push({
            date: `${day}.${month + 1}.${year}`,
            right: result.right,
            wrong: result.wrong,
            sum: result.right + result.wrong,
          });
        });
      });
    });
    new Chart(ref, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    return dataSource;
  }
  public drawChartExt(ref: HTMLCanvasElement): DataSet[] {
    const orderedResults = this.getOrderedResults();
    const labels: string[] = [];
    const dataSource: DataSet[] = [];
    const datasets: ChartDataSets[] = [
      {
        label: 'Richtig',
        data: [],
        borderColor: 'rgba(100,200,200,1)',
        backgroundColor: 'rgba(100,200,200,.25)',
        borderWidth: 1,
      },
      {
        label: 'Falsch',
        data: [],
        borderColor: 'rgba(255,125,150,1)',
        backgroundColor: 'rgba(255,125,150,.25)',
        borderWidth: 1,
      },
    ];
    orderedResults.forEach((yearResults: AufgabeStore[][][], year: number) => {
      yearResults.forEach((monthResults: AufgabeStore[][], month: number) => {
        monthResults.forEach((dayResults: AufgabeStore[], day: number) => {
          let right = 0;
          let wrong = 0;
          dayResults.forEach((dayResult: AufgabeStore) => {
            if (dayResult.result === dayResult.answer) {
              const value = dayResult.values.reduce((a, b) => a + b, 0);
              right += value / 100;
            } else {
              const value = dayResult.values.reduce((a, b) => a + b, 0);
              wrong += value / 100;
            }
          });
          datasets[0].data?.push(Math.round(right * 100) / 100);
          datasets[1].data?.push(Math.round(wrong * 100) / 100);
          labels.push(`${day}.${month + 1}.${year}`);
        });
      });
    });
    new Chart(ref, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    return dataSource;
  }

  public getRightWrongSum(
    results: AufgabeStore[]
  ): {
    sum: number;
    right: number;
    wrong: number;
  } {
    let right = 0;
    let wrong = 0;
    results.forEach((result: AufgabeStore) => {
      if (result.answer === result.result) {
        right++;
      } else {
        wrong++;
      }
    });
    return {
      sum: right + wrong,
      right: right,
      wrong: wrong,
    };
  }

  public getStatistic(): {
    sum: number;
    right: number;
    wrong: number;
  } {
    return this.getRightWrongSum(this.storageService.getItem<AufgabeStore[]>('results') || []);
  }

  public getOrderedResults(): AufgabeStore[][][][] {
    const results = this.storageService.getItem<AufgabeStore[]>('results') || [];
    const orderedResults: AufgabeStore[][][][] = [];
    // results = results.filter((result: AufgabeStore) => {
    //   const date: Date = new Date(result.date);
    //   if (date.getFullYear() === 2021 && date.getMonth() === 0 && date.getDate() === 7) {
    //     return false;
    //   }
    //   return true;
    // });
    // this.storageService.setItem('results', results);
    results.forEach((result: AufgabeStore) => {
      const date: Date = new Date(result.date);
      orderedResults[date.getFullYear()] = orderedResults[date.getFullYear()] || [];
      orderedResults[date.getFullYear()][date.getMonth()] = orderedResults[date.getFullYear()][date.getMonth()] || [];
      orderedResults[date.getFullYear()][date.getMonth()][date.getDate()] =
        orderedResults[date.getFullYear()][date.getMonth()][date.getDate()] || [];
      orderedResults[date.getFullYear()][date.getMonth()][date.getDate()].push(result);
    });
    return orderedResults;
  }

  public getDayProgress(): {
    right: number;
    wrong: number;
    sum: number;
    limit: number;
  } {
    const watermarks = this.storageService.getItem<{
      dayLimit: number;
    }>('watermarks');
    const date = new Date();
    const orderedResults = this.getOrderedResults();
    orderedResults[date.getFullYear()] = orderedResults[date.getFullYear()] || [];
    orderedResults[date.getFullYear()][date.getMonth()] = orderedResults[date.getFullYear()][date.getMonth()] || [];
    const rightWrongSum = this.getRightWrongSum(
      orderedResults[date.getFullYear()][date.getMonth()][date.getDate()] || []
    );
    return {
      ...rightWrongSum,
      limit: watermarks.dayLimit,
    };
  }

  public incDayLimit(incLimit: number): void {
    const watermarks = this.storageService.getItem<{
      dayLimit: number;
    }>('watermarks');
    this.storageService.setItem('watermarks', { dayLimit: watermarks.dayLimit + incLimit });
  }
}
