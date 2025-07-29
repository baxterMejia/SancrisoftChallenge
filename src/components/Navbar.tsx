'use client';

import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext'; 
import { Menu, X, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Theme } from '@/themes/themes'; 

interface StyledThemeProps {
  theme: Theme;
}

const NavbarWrapper = styled.nav<StyledThemeProps>`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.navBg || '#222'};
  color: ${({ theme }) => theme.text || '#fff'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  position: fixed;
  top: 0;
  z-index: 1100;
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;


const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ToggleButton = styled.button<StyledThemeProps>`
  background: ${({ theme }) => theme.accent || '#0ff'};
  color: ${({ theme }) => theme.sidebarBg || '#111'}; // Assuming sidebarBg is a good default text color for the button
  border: none;
  padding: 0.4rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.accentHover || '#0cc'};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LogoutButton = styled(ToggleButton)<StyledThemeProps>`
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  // Fallback values for buttonBg/buttonText/buttonHover, assuming they might exist in your Theme interface
  background: ${({ theme }) => (theme as any).buttonBg || '#ff6666'};
  color: ${({ theme }) => (theme as any).buttonText || '#ffffff'};
  box-shadow: 0 0 5px rgba(255, 102, 102, 0.7);

  &:hover {
    background: ${({ theme }) => (theme as any).buttonHover || '#ff3333'};
    box-shadow: 0 0 8px rgba(255, 102, 102, 0.9);
  }
`;


interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  toggleThemeSidebar: () => void;
}


export default function Navbar({ toggleSidebar, isSidebarOpen, toggleThemeSidebar }: NavbarProps) {
  
  const { theme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {    
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <NavbarWrapper theme={theme}>
      <Logo>
        <ToggleButton onClick={toggleSidebar} theme={theme}>
          {isSidebarOpen ? <X /> : <Menu />}
        </ToggleButton>
      </Logo>
      <ThemeSelector>    
        <ToggleButton onClick={toggleThemeSidebar} theme={theme}>
          <Palette />
        </ToggleButton>
      </ThemeSelector>

      <LogoutButton onClick={handleLogout} theme={theme}>
        Log Out
      </LogoutButton>
    </NavbarWrapper>
  );
}