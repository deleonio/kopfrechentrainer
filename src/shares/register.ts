import { DI } from '@leanup/lib/helpers/injector';

import { AufgabenService } from '../services/aufgaben.service';
import { StorageService } from '../services/storage/service';

DI.register('AufgabenService', new AufgabenService());
DI.register('StorageService', new StorageService());
