
'use client';

import Link from 'next/link';
import { useState, ReactElement } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import {
  Home,
  User,
  Globe,
  Icon 
} from 'lucide-react';

import { Theme } from '@/themes/themes';

interface StyledThemeProps {
  theme: Theme;
}

const SIDEBAR_FULL_WIDTH = '250px';

const SidebarWrapper = styled(motion.aside)<StyledThemeProps>`
  width: ${SIDEBAR_FULL_WIDTH};
  height: 100vh;
  background: ${({ theme }) => theme.sidebarBg || '#111'};
  padding-top: 60px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
`;

const NavIconWrapper = styled.div<StyledThemeProps>`
  position: relative;
  margin: 1rem 0;
  cursor: pointer;
  color: ${({ theme }) => theme.sidebarText || '#ccc'};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1.5rem;
  width: 100%;

  &:hover {
    color: ${({ theme }) => theme.accent || '#0ff'};
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: drop-shadow(0 0 5px ${({ theme }) => theme.accent}80);
  }

  svg {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 0 5px ${({ theme }) => theme.accent}80);
  }
`;

const NavLabel = styled(motion.span)<StyledThemeProps>`
  margin-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.sidebarText || '#ccc'};
`;

const Tooltip = styled(motion.div)<StyledThemeProps>`
  position: absolute;
  left: ${SIDEBAR_FULL_WIDTH};
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.sidebarHoverBg || '#222'};
  color: ${({ theme }) => theme.sidebarHoverText || '#fff'};
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1001;
`;

interface NavItem {
  icon: ReactElement; 
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: <Home size={24} />,
    label: 'Dashboard',
    href: '/dashboard'
  },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <SidebarWrapper
      initial={{ x: -parseFloat(SIDEBAR_FULL_WIDTH) }}      
      animate={{ x: isOpen ? 0 : -parseFloat(SIDEBAR_FULL_WIDTH) }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {navItems.map((item, i) => ( 
        <Link key={i} href={item.href} passHref>
          <NavIconWrapper
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.icon}
            <AnimatePresence>
              {isOpen && (
                <NavLabel
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </NavLabel>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isOpen && hovered === i && (
                <Tooltip
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </Tooltip>
              )}
            </AnimatePresence>
          </NavIconWrapper>
        </Link>
      ))}
    </SidebarWrapper>
  );
}