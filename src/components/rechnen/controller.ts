import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { AufgabenService, RechenAufgabe } from '../../services/aufgaben/service';
import { StorageService } from '../../services/storage/service';

interface AufgabeStore {
  values: number[];
  answer: number;
  result: number;
  date: number;
}

export class RechnenController extends AbstractController {
  private readonly aufgabenService: AufgabenService = DI.get<AufgabenService>('AufgabenService');
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
  public aufgabe: RechenAufgabe;
  public ergebnisText = '';
  public ergebnisColor = '';

  public constructor() {
    super();
    this.aufgabe = this.aufgabenService.createAufgabe();
    this.updateTextAndColor();
  }

  public createAufgabe(): void {
    this.aufgabe = this.aufgabenService.createAufgabe();
    this.updateTextAndColor();
  }

  private updateTextAndColor(): void {
    this.ergebnisText = this.aufgabe.sign === '+' ? 'Addition' : 'Substraktion';
    this.ergebnisColor = this.aufgabe.sign === '+' ? '#009' : '#f80';
  }

  public storeResult(answer: number): void {
    const results = this.storageService.getItem<AufgabeStore[]>('results') || [];
    results.push({
      values: this.aufgabe.values,
      answer: answer,
      result: this.aufgabe.getErgebnis(),
      date: Date.now(),
    });
    this.storageService.setItem('aufgabe', {
      values: this.aufgabe.values,
      answer: answer,
      result: this.aufgabe.getErgebnis(),
    });
    this.storageService.setItem('results', results);
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
    // if (rightWrongSum.sum === 0) {
    //   this.storageService.setItem('watermarks', {
    //     dayLimit: 10,
    //   });
    // }
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
