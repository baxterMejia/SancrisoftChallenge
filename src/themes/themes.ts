// src/themes/themes.ts

// 1. Define the interface for a single theme
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
  }
  
  // 2. Define the type for the collection of themes
  export type ThemeCollection = {
    [key: string]: Theme;
  };
  
  // 3. Apply the ThemeCollection type to your themes object
  export const themes: ThemeCollection = {
    dark: {
      bg: '#1A1A1A',
      text: '#FFFFFF',
      navBg: '#222222',
      selectBg: '#2A2A2A',
      sidebarBg: '#1E1E1E',
      sidebarText: '#CCCCCC',
      sidebarHoverBg: '#2F2F2F',
      sidebarHoverText: '#FFC300',
      accent: '#003465',
      accentHover: '#00408F'
    },
    light: {
      bg: '#FFFDF7',
      text: '#4A4A4A',
      navBg: '#FFF3CD',
      selectBg: '#FFE699',
      sidebarBg: '#FFF9E6',
      sidebarText: '#6C5B3E',
      sidebarHoverBg: '#FFE699',
      sidebarHoverText: '#000',
      accent: '#FFC300',
      accentHover: '#E0A800'
    },
    futuristic: {
      bg: '#F0F6FC',
      text: '#1A1A1A',
      navBg: '#DCEEFF',
      selectBg: '#C5E1FF',
      sidebarBg: '#E6F0FA',
      sidebarText: '#003F7F',
      sidebarHoverBg: '#B3D4FF',
      sidebarHoverText: '#000',
      accent: '#003465',
      accentHover: '#00408F'
    },
    neon: {
      bg: '#FFFFFF',
      text: '#1F1F1F',
      navBg: '#FAFAFA',
      selectBg: '#EDEDED',
      sidebarBg: '#F9F9F9',
      sidebarText: '#555555',
      sidebarHoverBg: '#E6E6E6',
      sidebarHoverText: '#003465',
      accent: '#FFC300',
      accentHover: '#E0A800'
    }
  };