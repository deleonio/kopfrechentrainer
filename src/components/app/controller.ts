import { AbstractController } from '@leanup/lib/components/generic';

export class AppController extends AbstractController {
  public constructor() {
    super();
    window.location.href = '#/start';
  }
}
