import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../../services/storage/service';

export type Rechenart = 'addition' | 'subtraction' | 'multiplication';

interface ProfilSettings {
  maxValue: number;
  minValue: number;
  operations: Record<Rechenart, boolean>;
}

export class ProfilController extends AbstractController {
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
  public maxValue: number;
  public minValue: number;
  public dayLimit: number;
  public operations: Record<Rechenart, boolean>;

  public constructor() {
    super();
    const profil = this.getProfilSettings();
    this.maxValue = profil.maxValue;
    this.minValue = profil.minValue;
    this.operations = profil.operations;

    const watermarks = this.storageService.getItem<{
      dayLimit: number;
    }>('watermarks');
    this.dayLimit = watermarks.dayLimit;
  }

  private getProfilSettings(): ProfilSettings {
    const profil = this.storageService.getItem<{
      maxValue: number;
      minValue: number;
      operations?: Partial<Record<Rechenart, boolean>>;
    }>('profil');

    const operations: Record<Rechenart, boolean> = {
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

  private setProfilSettings(settings: Partial<ProfilSettings>): void {
    this.storageService.setItem('profil', {
      minValue: this.minValue,
      maxValue: this.maxValue,
      operations: this.operations,
      ...settings,
    });
  }

  public setRange(minValue: number, maxValue: number): void {
    minValue = Math.floor(minValue);
    maxValue = Math.floor(maxValue);
    if (minValue < maxValue && 0 <= minValue && 20 <= maxValue) {
      this.minValue = minValue;
      this.maxValue = maxValue;
      this.setProfilSettings({
        minValue: minValue,
        maxValue: maxValue,
      });
    }
  }

  public setOperation(operation: Rechenart, enabled: boolean): boolean {
    const nextOperations: Record<Rechenart, boolean> = {
      ...this.operations,
      [operation]: enabled,
    };

    if (!nextOperations.addition && !nextOperations.subtraction && !nextOperations.multiplication) {
      return false;
    }

    this.operations = nextOperations;
    this.setProfilSettings({ operations: { ...this.operations } });
    return true;
  }

  public setDayLimit(dayLimit: number): void {
    dayLimit = Math.floor(dayLimit);
    if (10 <= dayLimit) {
      this.storageService.setItem('watermarks', {
        dayLimit: dayLimit,
      });
    }
  }

  public clearStore(): void {
    this.storageService.removeItem('results');
    window.location.href = '#/';
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
