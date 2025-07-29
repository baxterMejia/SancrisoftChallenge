// src/components/ThemeSidebar.tsx
'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { themes, Theme, ThemeCollection } from '@/themes/themes';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react';

interface StyledThemeProps {
  theme: Theme;
}

interface ColorCircleProps extends StyledThemeProps {
  color: string;
}

const SidebarContainer = styled(motion.div)<StyledThemeProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 260px;
  height: 100vh;
  background-color: ${({ theme }) => theme.sidebarBg || '#111'};
  color: ${({ theme }) => theme.text || '#fff'};
  padding: 1.5rem;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CloseButton = styled.button<StyledThemeProps>`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text || '#fff'};
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h3`
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ColorCircle = styled.div<ColorCircleProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ theme }) => theme.text};
  cursor: pointer;
`;

interface ThemeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSidebar({ isOpen, onClose }: ThemeSidebarProps) {
  const { switchTheme } = useTheme();

  const handleThemeChange = (themeName: keyof ThemeCollection) => {
    switchTheme(themeName);
    onClose();
  };

  return (
    <SidebarContainer
      initial={{ x: 260 }}
      animate={{ x: isOpen ? 0 : 260 }}
      transition={{ duration: 0.4 }}
    >
      <CloseButton onClick={onClose}>
        <X />
      </CloseButton>

      <Title>Select a Theme</Title>

      <ColorGrid>
        <ColorCircle theme={themes.dark} color={themes.dark.navBg} onClick={() => handleThemeChange('dark')} />
        <ColorCircle theme={themes.light} color={themes.light.navBg} onClick={() => handleThemeChange('light')} />
        <ColorCircle theme={themes.futuristic} color={themes.futuristic.accent} onClick={() => handleThemeChange('futuristic')} />
        <ColorCircle theme={themes.neon} color={themes.neon.accent} onClick={() => handleThemeChange('neon')} />
      </ColorGrid>
    </SidebarContainer>
  );
}