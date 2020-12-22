import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../../services/storage/service';

export class ProfilController extends AbstractController {
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
  public maxValue: number;
  public minValue: number;
  public dayLimit: number;

  public constructor() {
    super();
    const profil = this.storageService.getItem<{
      maxValue: number;
      minValue: number;
    }>('profil');
    this.maxValue = profil.maxValue;
    this.minValue = profil.minValue;

    const watermarks = this.storageService.getItem<{
      dayLimit: number;
    }>('watermarks');
    this.dayLimit = watermarks.dayLimit;
  }

  public setRange(minValue: number, maxValue: number): void {
    minValue = Math.floor(minValue);
    maxValue = Math.floor(maxValue);
    if (minValue < maxValue) {
      this.storageService.setItem('profil', {
        minValue: minValue,
        maxValue: maxValue,
      });
    }
  }

  public setDayLimit(dayLimit: number): void {
    dayLimit = Math.floor(dayLimit);
    this.storageService.setItem('watermarks', {
      dayLimit: dayLimit,
    });
  }

  public clearStore(): void {
    this.storageService.removeItem('results');
    window.location.href = '#/';
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
