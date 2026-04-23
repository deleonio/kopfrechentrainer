import { AbstractController } from '@leanup/lib/components/generic';
import { DI } from '@leanup/lib/helpers/injector';

import { StorageService } from '../../services/storage/service';

export interface VocabularyEntry {
	question: string;
	answer: string;
}

export class VokabelnController extends AbstractController {
	private readonly storageService: StorageService = DI.get<StorageService>('StorageService');
	public entries: VocabularyEntry[];
	public currentPosition = 0;
	private randomizedOrder: number[] = [];

	public constructor() {
		super();
		this.entries = this.getEntries();
		this.randomizedOrder = this.createRandomizedOrder();
	}

	private createRandomizedOrder(): number[] {
		const order = Array.from({ length: this.entries.length }, (_, index) => index);
		for (let i = order.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			const temp = order[i];
			order[i] = order[randomIndex];
			order[randomIndex] = temp;
		}
		return order;
	}

	private getEntries(): VocabularyEntry[] {
		const profil = this.storageService.getItem<{ vocabularyList?: VocabularyEntry[] }>('profil');
		const vocabularyList = Array.isArray(profil?.vocabularyList) ? profil.vocabularyList : [];
		return vocabularyList.filter((entry) => typeof entry?.question === 'string' && typeof entry?.answer === 'string');
	}

	public reloadEntries(): void {
		this.entries = this.getEntries();
		this.currentPosition = 0;
		this.randomizedOrder = this.createRandomizedOrder();
	}

	public getCurrentEntry(): VocabularyEntry | null {
		if (this.entries.length === 0) {
			return null;
		}
		const randomIndex = this.randomizedOrder[this.currentPosition] ?? 0;
		return this.entries[randomIndex];
	}

	public nextEntry(): void {
		if (this.entries.length === 0) {
			return;
		}
		this.currentPosition++;
		if (this.currentPosition >= this.randomizedOrder.length) {
			this.currentPosition = 0;
			this.randomizedOrder = this.createRandomizedOrder();
		}
	}
}
