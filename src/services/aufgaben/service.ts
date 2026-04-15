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

  public constructor() {
    if (!this.storageService.hasActiveProfile()) {
      this.aufgabe = new RechenAufgabeAddition([0, 0]);
      return;
    }
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

  private getRandomIntBetween(min: number, max: number): number {
    return min + this.getRandomInt(Math.max(0, max - min));
  }

  private getProfil(): {
    maxValue: number;
    minValue: number;
    operators?: string[];
    difficultyLevel?: number;
    difficultyMin?: number;
    difficultyMax?: number;
  } {
    return (
      this.storageService.getItem<{
        maxValue: number;
        minValue: number;
        operators?: string[];
        difficultyLevel?: number;
        difficultyMin?: number;
        difficultyMax?: number;
      }>('profil') || {
        minValue: 0,
        maxValue: 20,
        operators: ['+', '-', '•', ':'],
        difficultyLevel: 1,
        difficultyMin: 1,
        difficultyMax: 1,
      }
    );
  }

  private getDifficultySettings(): {
    level: number;
    valueMax: number;
    minOperand: number;
    minFactor: number;
    minDivisor: number;
    minQuotient: number;
  } {
    const profil = this.getProfil();
    const legacyLevel = Math.min(5, Math.max(1, Math.floor(profil.difficultyLevel || 1)));
    const minLevel = Math.min(5, Math.max(1, Math.floor(profil.difficultyMin || legacyLevel)));
    const maxLevel = Math.min(5, Math.max(minLevel, Math.floor(profil.difficultyMax || legacyLevel)));
    const level = this.getRandomIntBetween(minLevel, maxLevel);
    const levelFactors = [0.35, 0.5, 0.7, 0.85, 1];
    const valueMax = Math.max(10, Math.floor(profil.maxValue * levelFactors[level - 1]));
    return {
      level: level,
      valueMax: valueMax,
      minOperand: level <= 2 ? 0 : 1,
      minFactor: level <= 2 ? 2 : level,
      minDivisor: Math.max(2, level),
      minQuotient: Math.max(2, level + 1),
    };
  }

  private getEnabledOperators(): string[] {
    const profil = this.getProfil();
    const allowedOperators = ['+', '-', '•', ':'];
    const selectedOperators =
      Array.isArray(profil.operators) && profil.operators.length > 0
        ? profil.operators.filter((operator) => allowedOperators.includes(operator))
        : allowedOperators;
    return selectedOperators.length > 0 ? selectedOperators : ['+'];
  }

  private patchAufgabe(rechenAufgabe: any, operator: '+' | '-' | '•'): RechenAufgabe {
    const profil = this.getProfil();
    const difficulty = this.getDifficultySettings();
    let aufgabe: RechenAufgabe;
    do {
      let left = this.getRandomIntBetween(difficulty.minOperand, difficulty.valueMax);
      let right = this.getRandomIntBetween(difficulty.minOperand, difficulty.valueMax);
      if (operator === '•') {
        left = this.getRandomIntBetween(difficulty.minFactor, difficulty.valueMax);
        right = this.getRandomIntBetween(difficulty.minFactor, difficulty.valueMax);
      }
      if ((operator === '+' || operator === '-') && right === 0) {
        right = Math.max(1, difficulty.minOperand);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      aufgabe = new rechenAufgabe([left, right]);
    } while (aufgabe.getErgebnis() < profil.minValue || aufgabe.getErgebnis() > profil.maxValue);
    return aufgabe;
  }

  private patchDivisionAufgabe(): RechenAufgabe {
    const profil = this.getProfil();
    const difficulty = this.getDifficultySettings();
    let aufgabe: RechenAufgabe | null = null;
    do {
      const divisor = this.getRandomIntBetween(difficulty.minDivisor, difficulty.valueMax);
      const quotient = this.getRandomIntBetween(difficulty.minQuotient, difficulty.valueMax);
      const dividend = divisor * quotient;
      aufgabe = new RechenAufgabeDivision([dividend, divisor]);
    } while (
      !aufgabe ||
      !Number.isInteger(aufgabe.getErgebnis()) ||
      aufgabe.getErgebnis() < profil.minValue ||
      aufgabe.getErgebnis() > profil.maxValue ||
      aufgabe.values[0] > difficulty.valueMax
    );
    return aufgabe;
  }

  private newAufgabe(): RechenAufgabe {
    let aufgabe: RechenAufgabe;
    const enabledOperators = this.getEnabledOperators();
    const selectedOperator = enabledOperators[this.getRandomInt(enabledOperators.length - 1)];
    switch (selectedOperator) {
      case '+':
        aufgabe = this.patchAufgabe(RechenAufgabeAddition, '+');
        break;
      case '-':
        aufgabe = this.patchAufgabe(RechenAufgabeSubtraktion, '-');
        break;
      case '•':
        aufgabe = this.patchAufgabe(RechenAufgabeMultiplikation, '•');
        break;
      case ':':
        aufgabe = this.patchDivisionAufgabe();
        break;
      default:
        aufgabe = this.patchAufgabe(RechenAufgabeAddition, '+');
    }
    this.storageService.setItem('aufgabe', {
      answer: null,
      sign: aufgabe.sign,
      values: aufgabe.values,
    });
    return aufgabe;
  }

  public createAufgabe(): RechenAufgabe {
    if (!this.storageService.hasActiveProfile()) {
      return this.aufgabe;
    }
    if (this.aufgabe.result !== null) {
      this.aufgabe = this.newAufgabe();
    }
    return this.aufgabe;
  }
}
