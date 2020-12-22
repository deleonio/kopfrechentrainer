export abstract class RechenAufgabe {
  public readonly sign: string = '';
  public value: number[] = [];
  public constructor(value: number[]) {
    this.value = value;
  }
}

class RechenAufgabeAddition extends RechenAufgabe {
  public readonly sign = '+';
  public getErgebnis(): number {
    let result = this.value[0];
    for (let i = 1; i < this.value.length; i++) {
      result += this.value[i];
    }
    return result;
  }
}

class RechenAufgabeSubtraktion extends RechenAufgabe {
  public readonly sign = '-';
  public getErgebnis(): number {
    let result = this.value[0];
    for (let i = 1; i < this.value.length; i++) {
      result -= this.value[i];
    }
    return result;
  }
}

export class AufgabenService {
  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max + 1));
  }

  public createAufgabe(): RechenAufgabe {
    switch (this.getRandomInt(1)) {
      case 0:
        return new RechenAufgabeAddition([this.getRandomInt(20), this.getRandomInt(20)]);
      default:
        return new RechenAufgabeSubtraktion([this.getRandomInt(20), this.getRandomInt(20)]);
    }
  }
}
