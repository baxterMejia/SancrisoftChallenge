'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';
import { X, QrCode, Smartphone } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useUsers } from '@/context/UserContext';
import { Theme } from '@/themes/themes';

interface StyledThemeProps {
  theme: Theme;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 1rem;
`;

const ModalContent = styled(motion.div)<StyledThemeProps>`
  background: rgba(10, 15, 28, 0.95);
  border-radius: 25px;
  box-shadow:
    0 0 30px ${({ theme }) => theme.accent},
    0 0 60px ${({ theme }) => theme.accent},
    0 0 90px ${({ theme }) => theme.accent},
    inset 0 0 15px ${({ theme }) => theme.accent};
  padding: 2.5rem 3rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  text-align: center;
  color: ${({ theme }) => theme.text};
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.5rem;
    border-radius: 15px;
  }
`;

const CloseButton = styled.button<StyledThemeProps>`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: rotate(90deg);
    color: ${({ theme }) => theme.accentHover};
  }

  svg {
    width: 30px;
    height: 30px;
    stroke-width: 2.5;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const ModalTitle = styled(motion.h1)<StyledThemeProps>`
  font-size: 2.4rem;
  margin-bottom: 1.8rem;
  text-shadow:
    0 0 5px ${({ theme }) => theme.accent},
    0 0 10px ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

interface NewUserData {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

interface SingUpModalProps {
  onClose: () => void;
}

export default function SingUpModal({ onClose }: SingUpModalProps) {
  const { theme } = useTheme();
  const { addUser } = useUsers();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: NewUserData = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    addUser(userData);

    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('isAuthenticated', 'true');

    setSuccessMsg('✅ Account created successfully');

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <ModalContent
        theme={theme}
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton theme={theme} onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <ModalTitle theme={theme}>
          ¡Register!
        </ModalTitle>

        <form style={{ marginTop: '2rem' }} onSubmit={handleSignUp}>
          <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.text }}>
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: (theme as any).selectBg,
                color: theme.text,
                fontSize: '1rem',
                outline: 'none',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.text }}>
              Email
            </label>
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: (theme as any).selectBg,
                color: theme.text,
                fontSize: '1rem',
                outline: 'none',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.text }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: (theme as any).selectBg,
                color: theme.text,
                fontSize: '1rem',
                outline: 'none',
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.9rem 1.5rem',
              borderRadius: '12px',
              background: theme.accent,
              color: theme.sidebarText,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: `0 0 15px ${theme.accent}, 0 0 30px ${theme.accent}`,
              transition: '0.3s ease',
            }}
          >
            Create Account
          </button>

          {successMsg && (
            <p style={{ marginTop: '1rem', color: theme.accent }}>{successMsg}</p>
          )}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}