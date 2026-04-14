import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../../services/storage/service';

export class ProfilController extends AbstractController {
  private readonly availableOperators = ['+', '-', '•', ':'];
  private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
  public maxValue: number;
  public minValue: number;
  public dayLimit: number;
  public operators: string[];

  public constructor() {
    super();
    const profil = this.storageService.getItem<{
      maxValue: number;
      minValue: number;
      operators?: string[];
    }>('profil');
    this.maxValue = profil.maxValue;
    this.minValue = profil.minValue;
    this.operators =
      Array.isArray(profil.operators) && profil.operators.length > 0 ? profil.operators : ['+', '-', '•', ':'];

    const watermarks = this.storageService.getItem<{
      dayLimit: number;
    }>('watermarks');
    this.dayLimit = watermarks.dayLimit;
  }

  public setRange(minValue: number, maxValue: number): void {
    minValue = Math.floor(minValue);
    maxValue = Math.floor(maxValue);
    if (minValue < maxValue && 0 <= minValue && 20 <= maxValue) {
      this.minValue = minValue;
      this.maxValue = maxValue;
      this.storageService.setItem('profil', {
        minValue: minValue,
        maxValue: maxValue,
        operators: this.operators,
      });
    }
  }

  public setOperators(operators: string[]): boolean {
    const filteredOperators = operators.filter((operator) => this.availableOperators.includes(operator));
    if (filteredOperators.length === 0) {
      return false;
    }
    this.operators = filteredOperators;
    this.storageService.setItem('profil', {
      minValue: this.minValue,
      maxValue: this.maxValue,
      operators: this.operators,
    });
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

  public deleteProfile(): void {
    this.storageService.deleteActiveProfile();
    window.location.href = '#/start';
  }
}
