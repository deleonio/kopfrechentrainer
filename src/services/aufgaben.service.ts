import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from './storage/service';

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

export class AufgabenService {
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');

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

  private newAufgabe(): RechenAufgabe {
    const profil = this.getProfil();
    switch (this.getRandomInt(1)) {
      case 0:
        return new RechenAufgabeAddition([this.getRandomInt(profil.maxValue), this.getRandomInt(profil.maxValue)]);
      default:
        return new RechenAufgabeSubtraktion([this.getRandomInt(profil.maxValue), this.getRandomInt(profil.maxValue)]);
    }
  }

  public createAufgabe(): RechenAufgabe {
    const profil = this.getProfil();
    let aufgabe: RechenAufgabe = this.newAufgabe();
    while (aufgabe.getErgebnis() < profil.minValue || aufgabe.getErgebnis() > profil.maxValue) {
      aufgabe = this.createAufgabe();
    }
    return aufgabe;
  }
}
