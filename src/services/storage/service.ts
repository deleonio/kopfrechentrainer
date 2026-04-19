import mockData from './mock.json';

interface INameToValueMap {
	[key: string]: unknown;
}

interface IProfileEntry {
	name: string;
	data: INameToValueMap;
}

interface IProfileStore {
	activeProfileId: string | null;
	profiles: {
		[key: string]: IProfileEntry;
	};
}

export class StorageService {
	private memoryStorage: IProfileStore = {
		activeProfileId: null,
		profiles: {},
	};
	private namespace: string;

	public constructor(namespace = 'app-store-rechnen') {
		this.namespace = namespace;
		this.restore();
	}

	public setItem(key: string, value: unknown): void {
		const profileData = this.getActiveProfileData();
		if (!profileData) {
			return;
		}
		profileData[key] = value;
		this.store();
	}

	public getItem<T>(key: string): T {
		const profileData = this.getActiveProfileData();
		return <T>(profileData ? profileData[key] : undefined);
	}

	public removeItem(key: string): void {
		const profileData = this.getActiveProfileData();
		if (!profileData) {
			return;
		}
		delete profileData[key];
		this.store();
	}

	public getProfiles(): { id: string; name: string }[] {
		return Object.keys(this.memoryStorage.profiles).map((id) => ({
			id: id,
			name: this.memoryStorage.profiles[id].name,
		}));
	}

	public hasActiveProfile(): boolean {
		const activeProfileId = this.memoryStorage.activeProfileId;
		return typeof activeProfileId === 'string' && !!this.memoryStorage.profiles[activeProfileId];
	}

	public setActiveProfile(profileId: string | null): void {
		if (profileId === null) {
			this.memoryStorage.activeProfileId = null;
			this.store();
			return;
		}
		if (this.memoryStorage.profiles[profileId]) {
			this.memoryStorage.activeProfileId = profileId;
			this.store();
		}
	}

	public createProfile(name: string): string {
		const trimmedName = name.trim();
		const profileName = trimmedName.length > 0 ? trimmedName : `Profil ${this.getProfiles().length + 1}`;
		const profileId = `profile-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
		this.memoryStorage.profiles[profileId] = {
			name: profileName,
			data: this.createDefaultProfileData(),
		};
		this.memoryStorage.activeProfileId = profileId;
		this.store();
		return profileId;
	}

	public deleteActiveProfile(): void {
		const activeProfileId = this.memoryStorage.activeProfileId;
		if (typeof activeProfileId !== 'string') {
			return;
		}
		delete this.memoryStorage.profiles[activeProfileId];
		this.memoryStorage.activeProfileId = null;
		this.store();
	}

	public getActiveProfileName(): string | null {
		const activeProfileId = this.memoryStorage.activeProfileId;
		if (typeof activeProfileId !== 'string') {
			return null;
		}
		return this.memoryStorage.profiles[activeProfileId]?.name || null;
	}

	private getActiveProfileData(): INameToValueMap | null {
		const activeProfileId = this.memoryStorage.activeProfileId;
		if (typeof activeProfileId !== 'string') {
			return null;
		}
		return this.memoryStorage.profiles[activeProfileId]?.data || null;
	}

	private createDefaultProfileData(): INameToValueMap {
		return {
			profil: {
				minValue: 0,
				maxValue: 20,
				operators: ['+', '-', '•', ':'],
				difficultyMin: 1,
				difficultyMax: 1,
			},
			results: [],
			watermarks: {
				dayLimit: 10,
			},
		};
	}

	private migrateToProfileStore(legacyStore: INameToValueMap): IProfileStore {
		if ('profiles' in legacyStore && 'activeProfileId' in legacyStore) {
			const migratedStore = legacyStore as unknown as IProfileStore;
			return {
				activeProfileId: migratedStore.activeProfileId,
				profiles: migratedStore.profiles || {},
			};
		}
		const migratedProfileId = `profile-${Date.now()}`;
		return {
			activeProfileId: migratedProfileId,
			profiles: {
				[migratedProfileId]: {
					name: 'Profil 1',
					data: {
						...this.createDefaultProfileData(),
						...legacyStore,
					},
				},
			},
		};
	}

	private restore(): void {
		try {
			const localStorage = window.localStorage.getItem(this.namespace);
			if (localStorage === null) {
				throw new Error('Session store is empty.');
			}
			this.memoryStorage = this.migrateToProfileStore(<INameToValueMap>JSON.parse(localStorage));
		} catch {
			this.memoryStorage = this.migrateToProfileStore(mockData as INameToValueMap);
		}
	}

	private store(): void {
		window.localStorage.setItem(this.namespace, JSON.stringify(this.memoryStorage));
	}
}
