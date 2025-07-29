'use client';

import { GlobalStyle } from '@/styles/globals';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactNode } from 'react'; // Import ReactNode

interface AuthLayoutProps {
  children: ReactNode; // Type the children prop
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
}