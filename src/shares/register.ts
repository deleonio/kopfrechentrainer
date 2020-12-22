import { DI } from '@leanup/lib/helpers/injector';

import { AufgabenService } from '../services/aufgaben.service';
import { StorageService } from '../services/storage/service';

DI.register('StorageService', new StorageService('kopfrechentrainer'));
DI.register('AufgabenService', new AufgabenService());
