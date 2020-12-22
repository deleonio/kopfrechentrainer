import { AbstractController } from '@leanup/lib/components/generic';

export class AppController extends AbstractController {
  constructor() {
    super();
    window.location.href = '#';
  }
}
