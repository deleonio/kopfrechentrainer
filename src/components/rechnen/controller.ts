import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { AufgabenService, RechenAufgabe } from '../../services/aufgaben.service';

export class RechnenController extends AbstractController {
  private readonly aufgabenService: AufgabenService = DI.get<AufgabenService>('AufgabenService');
  public aufgabe: RechenAufgabe;

  public constructor() {
    super();
    this.createAufgabe();
  }

  public createAufgabe(): void {
    let ergebnis = -1;
    while (ergebnis < 0 || ergebnis > 20) {
      this.aufgabe = this.aufgabenService.createAufgabe();
      ergebnis = this.aufgabe.getErgebnis();
    }
  }
}
