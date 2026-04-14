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
  public difficultyMin: number;
  public difficultyMax: number;

  public constructor() {
    super();
    const profil = this.storageService.getItem<{
      maxValue: number;
      minValue: number;
      operators?: string[];
      difficultyLevel?: number;
      difficultyMin?: number;
      difficultyMax?: number;
    }>('profil');
    this.maxValue = profil.maxValue;
    this.minValue = profil.minValue;
    this.operators =
      Array.isArray(profil.operators) && profil.operators.length > 0 ? profil.operators : ['+', '-', '•', ':'];
    const legacyDifficultyLevel =
      typeof profil.difficultyLevel === 'number' && 1 <= profil.difficultyLevel && profil.difficultyLevel <= 5
        ? Math.floor(profil.difficultyLevel)
        : 1;
    this.difficultyMin =
      typeof profil.difficultyMin === 'number' && 1 <= profil.difficultyMin && profil.difficultyMin <= 5
        ? Math.floor(profil.difficultyMin)
        : legacyDifficultyLevel;
    this.difficultyMax =
      typeof profil.difficultyMax === 'number' && 1 <= profil.difficultyMax && profil.difficultyMax <= 5
        ? Math.floor(profil.difficultyMax)
        : legacyDifficultyLevel;
    if (this.difficultyMin > this.difficultyMax) {
      this.difficultyMax = this.difficultyMin;
    }

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
        difficultyMin: this.difficultyMin,
        difficultyMax: this.difficultyMax,
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
      difficultyMin: this.difficultyMin,
      difficultyMax: this.difficultyMax,
    });
    return true;
  }

  public setDifficultyRange(difficultyMin: number, difficultyMax: number): void {
    difficultyMin = Math.floor(difficultyMin);
    difficultyMax = Math.floor(difficultyMax);
    if (
      difficultyMin < 1 ||
      difficultyMin > 5 ||
      difficultyMax < 1 ||
      difficultyMax > 5 ||
      difficultyMin > difficultyMax
    ) {
      return;
    }
    this.difficultyMin = difficultyMin;
    this.difficultyMax = difficultyMax;
    this.storageService.setItem('profil', {
      minValue: this.minValue,
      maxValue: this.maxValue,
      operators: this.operators,
      difficultyMin: this.difficultyMin,
      difficultyMax: this.difficultyMax,
    });
  }

  public setDifficulty(difficulty: number): void {
    this.setDifficultyRange(difficulty, difficulty);
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
