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
  public readonly sign = '×';
  public getErgebnis(): number {
    let result = this.values[0];
    for (let i = 1; i < this.values.length; i++) {
      result *= this.values[i];
    }
    return result;
  }
}

type RechenAufgabeKonstruktor = new (values: number[]) => RechenAufgabe;
type OperationKey = 'addition' | 'subtraction' | 'multiplication';

interface ProfilSettings {
  maxValue: number;
  minValue: number;
  operations: Record<OperationKey, boolean>;
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
          case '×':
          case '•':
            this.aufgabe = new RechenAufgabeMultiplikation(storedAufgabe.values);
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

  private getProfil(): ProfilSettings {
    const profil = this.storageService.getItem<{
      maxValue: number;
      minValue: number;
      operations?: Partial<Record<OperationKey, boolean>>;
    }>('profil');

    const operations: Record<OperationKey, boolean> = {
      addition: profil.operations?.addition !== false,
      subtraction: profil.operations?.subtraction !== false,
      multiplication: profil.operations?.multiplication !== false,
    };

    if (!operations.addition && !operations.subtraction && !operations.multiplication) {
      operations.addition = true;
    }

    return {
      maxValue: profil.maxValue,
      minValue: profil.minValue,
      operations,
    };
  }

  private patchAufgabe(
    RechenAufgabeClass: RechenAufgabeKonstruktor,
    profil: ProfilSettings
  ): RechenAufgabe {
    let aufgabe: RechenAufgabe;
    do {
      aufgabe = new RechenAufgabeClass([
        this.getRandomInt(profil.maxValue),
        this.getRandomInt(profil.maxValue),
      ]);
    } while (aufgabe.getErgebnis() < profil.minValue || aufgabe.getErgebnis() > profil.maxValue);
    return aufgabe;
  }

  private newAufgabe(): RechenAufgabe {
    const profil = this.getProfil();
    const constructors: Record<OperationKey, RechenAufgabeKonstruktor> = {
      addition: RechenAufgabeAddition,
      subtraction: RechenAufgabeSubtraktion,
      multiplication: RechenAufgabeMultiplikation,
    };
    const enabledConstructors = (Object.keys(profil.operations) as OperationKey[])
      .filter((key) => profil.operations[key])
      .map((key) => constructors[key]);

    const randomIndex = this.getRandomInt(enabledConstructors.length - 1);
    const SelectedConstructor = enabledConstructors[randomIndex];
    const aufgabe = this.patchAufgabe(SelectedConstructor, profil);
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
