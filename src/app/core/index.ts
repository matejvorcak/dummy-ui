import { LocalStorageService } from './services/local-storage/local-storage.service';
import { IConstants, APP_CONSTANTS } from './constants';
import { AuthService } from './services/auth/auth.service';
import * as models from './models';
import { CoreModule } from './core.module';

export {
  CoreModule,
  LocalStorageService,
  AuthService,
  APP_CONSTANTS,
  models,
  IConstants
};
