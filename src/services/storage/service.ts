interface INameToValueMap {
  [key: string]: any;
}

export class StorageService {
  private memoryStorage: INameToValueMap = {};
  private namespace: string;

  public constructor(namespace = 'app-store-rechnen') {
    this.namespace = namespace;
    this.restore();
  }

  public setItem(key: string, value: unknown): void {
    this.memoryStorage[key] = value;
    this.store();
  }

  public getItem<T>(key: string): T {
    return <T>this.memoryStorage[key];
  }

  public removeItem(key: string): void {
    delete this.memoryStorage[key];
    this.store();
  }

  private restore(): void {
    try {
      const localStorage = window.localStorage.getItem(this.namespace);
      if (localStorage === null) {
        throw new Error('Session store is empty.');
      }
      this.memoryStorage = <Object>JSON.parse(localStorage);
    } catch (error) {
      this.memoryStorage = <Object>require('./mock.json');
    }
  }

  private store(): void {
    window.localStorage.setItem(this.namespace, JSON.stringify(this.memoryStorage));
  }
}
