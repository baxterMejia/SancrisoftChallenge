'use client';

import { GlobalStyle } from '@/styles/globals';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactNode } from 'react';
import { inter } from '@/styles/fonts';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider>
      <div className={inter.className}>
        <GlobalStyle />
        {children}
      </div>
    </ThemeProvider>
  );
}
