import { create } from 'zustand';

import type { Game } from '@/types';

interface IdleStore {
  idleGamesList: Game[];
  setIdleGamesList: (value: Game[] | ((prev: Game[]) => Game[])) => void;
}

export const useIdleStore = create<IdleStore>(set => ({
  idleGamesList: [],
  setIdleGamesList: value =>
    set(state => ({
      idleGamesList: typeof value === 'function' ? value(state.idleGamesList) : value,
    })),
}));
