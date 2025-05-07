// store/useThemeStore.js
import { create } from 'zustand';
import { DAISYUI_THEMES } from '../constants/themes';

const useThemeStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'light',
  setTheme: (theme) => {
    if (DAISYUI_THEMES.includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      set({ theme });
    }
  }
}));

export default useThemeStore;