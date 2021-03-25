import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CoreModule } from '@core';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>
  ) {}

  /** Checks if is safe to get item from local storage, otherwise returns empy string*/
  get(key: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    } else {
      return '';
    }
  }

  /** Checks if is safe to get item from local storage, check if value for key is set*/
  check(key: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(key);
    } else {
      return false;
    }
  }

  /** Checks if is safe to set item to local storage and sets the key value*/
  set(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.setItem(key, value);
    }
  }

  /** removes value from local storage */
  remove(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.removeItem(key);
    }
  }
}
