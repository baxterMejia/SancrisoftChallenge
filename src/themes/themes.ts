// src/themes/themes.ts

export interface Theme {
  bg: string;
  text: string;
  navBg: string;
  selectBg: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarHoverBg: string;
  sidebarHoverText: string;
  accent: string;
  accentHover: string;
  primary: string;
  secondary: string;
  textFaded: string;
  inputBorder: string;
  inputBg: string;
  inputFocusBorder: string;
  error: string;
  success: string;
}

export type ThemeCollection = {
  [key: string]: Theme;
};

export const themes: ThemeCollection = {
  dark: {
    bg: '#F9FAFB', // fondo general
    text: '#111827', // texto principal
    textFaded: '#6B7280', // texto secundario
    navBg: '#FFFFFF',
    selectBg: '#FFFFFF',
    sidebarBg: '#FFFFFF',
    sidebarText: '#374151',
    sidebarHoverBg: '#E0E7FF',
    sidebarHoverText: '#1E40AF',
    accent: '#4F46E5', // botones y elementos clave
    accentHover: '#4338CA',
    primary: '#4F46E5',
    secondary: '#E5E7EB',
    inputBorder: '#D1D5DB',
    inputBg: '#FFFFFF',
    inputFocusBorder: '#4F46E5',
    error: '#EF4444',
    success: '#10B981',
  },
  light: {
    bg: '#FFFDF7',
    text: '#4A4A4A',
    textFaded: '#6C5B3E',
    navBg: '#FFF3CD',
    selectBg: '#FFE699',
    sidebarBg: '#FFF9E6',
    sidebarText: '#6C5B3E',
    sidebarHoverBg: '#FFE699',
    sidebarHoverText: '#000',
    accent: '#FFC300',
    accentHover: '#E0A800',
    primary: '#FFC300',
    secondary: '#AAAAAA',
    inputBorder: '#E0E0E0',
    inputBg: '#FFFFFF',
    inputFocusBorder: '#FFD700',
    error: '#DC3545',
    success: '#28A745',
  },
  futuristic: {
    bg: '#F0F6FC',
    text: '#1A1A1A',
    textFaded: '#555555',
    navBg: '#DCEEFF',
    selectBg: '#C5E1FF',
    sidebarBg: '#E6F0FA',
    sidebarText: '#ffffff',
    sidebarHoverBg: '#B3D4FF',
    sidebarHoverText: '#000',
    accent: '#003465',
    accentHover: '#00408F',
    primary: '#003465',
    secondary: '#888888',
    inputBorder: '#AACCFF',
    inputBg: '#FFFFFF',
    inputFocusBorder: '#00408F',
    error: '#FF6B6B',
    success: '#28A745',
  },
  neon: {
    bg: '#FFFFFF',
    text: '#1F1F1F',
    textFaded: '#555555',
    navBg: '#FAFAFA',
    selectBg: '#EDEDED',
    sidebarBg: '#F9F9F9',
    sidebarText: '#555555',
    sidebarHoverBg: '#E6E6E6',
    sidebarHoverText: '#003465',
    accent: '#FFC300',
    accentHover: '#E0A800',
    primary: '#FFC300',
    secondary: '#999999',
    inputBorder: '#CCCCCC',
    inputBg: '#FFFFFF',
    inputFocusBorder: '#FFC300',
    error: '#DC3545',
    success: '#28A745',
  }
};