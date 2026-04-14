import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../storage/service';

export abstract class RechenAufgabe {
  public readonly sign: string = '';
  public values: number[] = [];
  public result: number | null = null;
  public constructor(values: number[]) {
    this.values = values;
  }
  public abstract getErgebnis(): number;
}

class RechenAufgabeAddition extends RechenAufgabe {
  public readonly sign = '+';
  public getErgebnis(): number {
    let result = this.values[0];
    for (let i = 1; i < this.values.length; i++) {
      result += this.values[i];
    }
    return result;
  }
}

class RechenAufgabeSubtraktion extends RechenAufgabe {
  public readonly sign = '-';
  public getErgebnis(): number {
    let result = this.values[0];
    for (let i = 1; i < this.values.length; i++) {
      result -= this.values[i];
    }
    return result;
  }
}

class RechenAufgabeMultiplikation extends RechenAufgabe {
  public readonly sign = '•';
  public getErgebnis(): number {
    let result = this.values[0];
    for (let i = 1; i < this.values.length; i++) {
      result *= this.values[i];
    }
    return result;
  }
}

class RechenAufgabeDivision extends RechenAufgabe {
  public readonly sign = ':';
  public getErgebnis(): number {
    return this.values[0] / this.values[1];
  }
}

export class AufgabenService {
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
  public aufgabe: RechenAufgabe;

  constructor() {
    const storedAufgabe = this.storageService.getItem<{
      answer: number | null;
      sign: string;
      values: number[];
    }>('aufgabe');
    try {
      if (
        typeof storedAufgabe === 'object' &&
        storedAufgabe !== null &&
        storedAufgabe.answer === null &&
        typeof storedAufgabe.sign === 'string' &&
        Array.isArray(storedAufgabe.values)
      ) {
        switch (storedAufgabe.sign) {
          case '+':
            this.aufgabe = new RechenAufgabeAddition(storedAufgabe.values);
            break;
          case '-':
            this.aufgabe = new RechenAufgabeSubtraktion(storedAufgabe.values);
            break;
          case '*':
          case '•':
            this.aufgabe = new RechenAufgabeMultiplikation(storedAufgabe.values);
            break;
          case ':':
          case '/':
            this.aufgabe = new RechenAufgabeDivision(storedAufgabe.values);
            break;
          default:
            throw new Error(`Die Rechenart ist nicht definiert.`);
        }
      } else {
        throw new Error(`Keine Aufgabe zwischengespeichert.`);
      }
    } catch (error) {
      this.aufgabe = this.newAufgabe();
    }
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max + 1));
  }

  private getProfil(): {
    maxValue: number;
    minValue: number;
  } {
    return this.storageService.getItem<{
      maxValue: number;
      minValue: number;
    }>('profil');
  }

  private patchAufgabe(rechenAufgabe: any): RechenAufgabe {
    const profil = this.getProfil();
    let aufgabe: RechenAufgabe;
    do {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      aufgabe = new rechenAufgabe([this.getRandomInt(profil.maxValue), this.getRandomInt(profil.maxValue)]);
    } while (aufgabe.getErgebnis() < profil.minValue || aufgabe.getErgebnis() > profil.maxValue);
    return aufgabe;
  }

  private patchDivisionAufgabe(): RechenAufgabe {
    const profil = this.getProfil();
    let aufgabe: RechenAufgabe | null = null;
    do {
      const divisor = this.getRandomInt(profil.maxValue);
      if (divisor === 0) {
        continue;
      }
      const quotient = this.getRandomInt(profil.maxValue);
      const dividend = divisor * quotient;
      aufgabe = new RechenAufgabeDivision([dividend, divisor]);
    } while (
      !aufgabe ||
      !Number.isInteger(aufgabe.getErgebnis()) ||
      aufgabe.getErgebnis() < profil.minValue ||
      aufgabe.getErgebnis() > profil.maxValue ||
      aufgabe.values[0] > profil.maxValue
    );
    return aufgabe;
  }

  private newAufgabe(): RechenAufgabe {
    let aufgabe: RechenAufgabe;
    switch (this.getRandomInt(3)) {
      case 0:
        aufgabe = this.patchAufgabe(RechenAufgabeAddition);
        break;
      case 1:
        aufgabe = this.patchAufgabe(RechenAufgabeSubtraktion);
        break;
      case 2:
        aufgabe = this.patchAufgabe(RechenAufgabeMultiplikation);
        break;
      default:
        aufgabe = this.patchDivisionAufgabe();
    }
    this.storageService.setItem('aufgabe', {
      answer: null,
      sign: aufgabe.sign,
      values: aufgabe.values,
    });
    return aufgabe;
  }

  public createAufgabe(): RechenAufgabe {
    if (this.aufgabe.result !== null) {
      this.aufgabe = this.newAufgabe();
    }
    return this.aufgabe;
  }
}
