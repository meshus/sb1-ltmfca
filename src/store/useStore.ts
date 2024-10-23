import { create } from 'zustand';
import { User, UserSettings } from '../types';

interface State {
  user: User | null;
  isAuthenticated: boolean;
  settings: UserSettings;
  setUser: (user: User | null) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  logout: () => void;
}

const defaultSettings: UserSettings = {
  darkMode: false,
  notifications: true,
  privacy: 'public',
};

export const useStore = create<State>((set) => ({
  user: null,
  isAuthenticated: false,
  settings: defaultSettings,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  logout: () => set({ user: null, isAuthenticated: false }),
}));