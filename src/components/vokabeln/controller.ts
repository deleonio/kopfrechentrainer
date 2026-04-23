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
	public currentIndex = 0;

	public constructor() {
		super();
		this.entries = this.getEntries();
	}

	private getEntries(): VocabularyEntry[] {
		const profil = this.storageService.getItem<{ vocabularyList?: VocabularyEntry[] }>('profil');
		const vocabularyList = Array.isArray(profil?.vocabularyList) ? profil.vocabularyList : [];
		return vocabularyList.filter((entry) => typeof entry?.question === 'string' && typeof entry?.answer === 'string');
	}

	public reloadEntries(): void {
		this.entries = this.getEntries();
		if (this.currentIndex >= this.entries.length) {
			this.currentIndex = 0;
		}
	}

	public getCurrentEntry(): VocabularyEntry | null {
		if (this.entries.length === 0) {
			return null;
		}
		return this.entries[this.currentIndex];
	}

	public nextEntry(): void {
		if (this.entries.length === 0) {
			return;
		}
		this.currentIndex = (this.currentIndex + 1) % this.entries.length;
	}
}
