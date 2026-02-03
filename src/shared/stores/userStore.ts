import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import { getSteamUsers } from '@/features/auth/lib/getSteamUsers';
import type { UserSummary } from '../types';

interface UserState {
  userSummary: UserSummary | null;
  steamUsers: UserSummary[];
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUserSummary: (
    value: UserSummary | null | ((prevState: UserSummary | null) => UserSummary | null),
  ) => void;
  fetchUsers: () => Promise<void>;
  signOut: () => void;
}

const initialState: UserState = {
  userSummary: null,
  steamUsers: [],
  isLoading: false,
  error: null,
};

const userSlice: StateCreator<
  UserState & UserActions,
  [['zustand/persist', unknown]],
  [],
  UserState & UserActions
> = (set, get) => ({
  ...initialState,

  setUserSummary: userSummary =>
    set(state => ({
      userSummary: typeof userSummary === 'function' ? userSummary(state.userSummary) : userSummary,
    })),

  fetchUsers: async () => {
    if (get().isLoading) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const steamUsers = await getSteamUsers();
      if (Math.random() > 0.5) {
        steamUsers.push({
          steamId: '11',
          avatar: '2',
          personaName: 'zz',
          mostRecent: 1,
          lastUpdated: 11,
        });
      }

      await new Promise(res => setTimeout(res, 3000));

      set({ steamUsers, isLoading: false });
    } catch {
      set({ error: 'Ошибка загрузки пользователей', isLoading: false });
    }
  },

  signOut: () => {
    set({
      userSummary: null,
    });
  },
});

export const useUserStore = create<UserState & UserActions>()(
  persist(userSlice, {
    name: 'user-storage',
    partialize: state => ({ userSummary: state.userSummary }),
  }),
);
