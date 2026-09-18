import React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

if (!(React as any).useSyncExternalStore) {
  (React as any).useSyncExternalStore = useSyncExternalStore;
}
