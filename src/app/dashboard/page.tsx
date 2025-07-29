'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Icon as LucideIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Theme } from '@/themes/themes';

interface StyledThemeProps {
  theme: Theme;
}

const Background = styled.div<StyledThemeProps>`
  min-height: 100vh;
  padding: 2rem 4rem;
  background: radial-gradient(
    circle at top left,
    ${({ theme }) => theme.bg},
    ${({ theme }) => theme.navBg},
    ${({ theme }) => theme.sidebarBg}
  );
  color: ${({ theme }) => theme.text};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
  }
`;

const Header = styled(motion.h1)<StyledThemeProps>`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-shadow:
    0 0 10px ${({ theme }) => theme.accent},
    0 0 20px ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  text-align: center;

  .header-icon {
    width: 45px;
    height: 45px;
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.accent});
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    .header-icon {
      width: 35px;
      height: 35px;
    }
  }
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    .header-icon {
      width: 30px;
      height: 30px;
    }
  }
`;

const FooterText = styled(motion.p)<StyledThemeProps>`
  margin-top: 4rem;
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  width: 100%;

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    margin-top: 2rem;
    font-size: 0.9rem;
  }
`;


interface TaskData {
  dia: string;
  completed: number;
}

export default function DashboardPage() {
  const { theme } = useTheme();
  const router = useRouter();


  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedEmail = sessionStorage.getItem("userEmail") || storedUser;

    if (storedUser) setUserName(storedUser);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const sessionDurationMinutes = 30;
    const interval = setInterval(() => {
      const loginTime = sessionStorage.getItem("loginTime");
      if (loginTime) {
        const now = new Date();
        const loginDate = new Date(loginTime);
        const diffInMinutes = (now.getTime() - loginDate.getTime()) / (1000 * 60);

        if (diffInMinutes > sessionDurationMinutes) {
          sessionStorage.clear();
          router.push('/login');
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isClient, router]);  

  return (
    <Background theme={theme}>
      <Header
        theme={theme}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Calendar className="header-icon" />
        Welcome, {userName}
      </Header>
      <FooterText
        theme={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 + 1 * 0.2, duration: 1 }}
      >
        Built with ☕ and Johan Sebastian Mejia code by . All rights reserved.
      </FooterText>
    </Background>
  );
}