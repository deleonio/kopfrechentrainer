import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { Messung, MessungApi } from '../../../generated/typescript-rxjs';

export class FormularController extends AbstractController {
  private messungApi: MessungApi = DI.get<MessungApi>('MessungApi');

  onFinish(messung: Messung) {
    this.messungApi.messungPut().subscribe(
      (...args) => {
        console.log(args);
      },
      (...args) => {
        console.warn(args);
      },
      (...args) => {
        console.log(args);
      }
    );
  }
}
