import { useEffect } from 'react';
import { emit } from '@tauri-apps/api/event';

export const useAppInit = () => {
  useEffect(() => {
    emit('ready');
  }, []);
};
