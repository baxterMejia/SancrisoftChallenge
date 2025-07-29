'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, Theme, ThemeCollection } from '../themes/themes';



interface ThemeContextType {
  theme: Theme; 
  switchTheme: (name: keyof ThemeCollection) => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

  const [themeName, setThemeName] = useState<keyof ThemeCollection>("dark"); 

  const switchTheme = (name: keyof ThemeCollection) => { 
    if (themes[name]) { 
      setThemeName(name);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], switchTheme }}>
      <StyledThemeProvider theme={themes[themeName]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};