import { InjectionToken } from '@angular/core';

export interface IConstants {
  tokenStorageKey: string;
  darkModeStoragKey: string;
}

export const CONSTANTS: IConstants = {
  tokenStorageKey: 'access_token',
  darkModeStoragKey: 'prefer_dark_mode'
};

export const APP_CONSTANTS = new InjectionToken<IConstants>(
  'Injection token for app constants.'
);
