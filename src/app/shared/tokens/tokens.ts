import { InjectionToken } from '@angular/core';
import { default as PocketBaseClient } from 'pocketbase';

export const POCKETBASE_CLIENT = new InjectionToken<PocketBaseClient>(
  'POCKETBASE_CLIENT'
);
