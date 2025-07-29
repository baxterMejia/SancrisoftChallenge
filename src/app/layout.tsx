'use client';

import { useState, ReactNode } from 'react'; 
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { GlobalStyle } from '@/styles/globals';
import { ThemeProvider } from '@/context/ThemeContext';
import styled from 'styled-components';
import ThemeSidebar from '@/components/ThemeSidebar';
import Footer from '@/components/Footer';
import { UserProvider } from '../context/UserContext';
import { Theme } from '@/themes/themes'; 
import { inter } from '@/styles/fonts';

interface StyledThemeProps {
  theme: Theme;
}

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;


const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
  padding-top: 60px;
  margin-left: 0;
`;


interface RootLayoutProps {
  children: ReactNode; 
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleThemeSidebar = () => setIsThemeSidebarOpen(prev => !prev);

  const isAuthRoute = pathname.startsWith('/login');

  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider>
          <UserProvider>
            <GlobalStyle />
            {!isAuthRoute && (
              <>
                <Navbar
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                  toggleThemeSidebar={toggleThemeSidebar}
                />
                <LayoutContainer>
                  <Sidebar isOpen={isSidebarOpen} />
                  <MainContent>
                    {children}
                  </MainContent>
                </LayoutContainer>
                <ThemeSidebar
                  isOpen={isThemeSidebarOpen}
                  onClose={() => setIsThemeSidebarOpen(false)}
                />
                <Footer />
              </>
            )}
            {isAuthRoute && <main>{children}</main>}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}