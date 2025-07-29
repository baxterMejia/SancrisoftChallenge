'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useUsers } from '@/context/UserContext';
import { Theme } from '@/themes/themes';
import { inter } from '@/styles/fonts';

interface StyledThemeProps {
  theme: Theme;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 1rem;
`;


const ModalContent = styled(motion.div)<StyledThemeProps>`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 2.5rem 3rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  text-align: center;
  color: #171717;
  font-family: 'Inter', sans-serif;
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 2rem 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;


const CloseButton = styled.button<StyledThemeProps>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  cursor: pointer;
  z-index: 1001;

  svg {
    width: 28px;
    height: 28px;
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: rotate(90deg) scale(1.1);
    stroke: ${({ theme }) => theme.accentHover};
  }
`;

const ModalTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #171717;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;

  label {
    display: block;
    margin-bottom: 0.4rem;
    color: #444;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #fff;
    color: #171717;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #0070f3; /* azul tenue como foco */
    }
  }
`;


const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background 0.3s;

  &:hover {
    background: #005bb5;
  }
`;


const SuccessText = styled.p<StyledThemeProps>`
  margin-top: 1rem;
  color: ${({ theme }) => theme.accent};
  font-weight: bold;
  text-shadow: 0 0 8px ${({ theme }) => theme.accent};
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

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
      className={inter.className}
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
          <X />
        </CloseButton>

        <ModalTitle theme={theme}>¡Register!</ModalTitle>

        <form onSubmit={handleSignUp}>
          <InputGroup theme={theme}>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup theme={theme}>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup theme={theme}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <SubmitButton theme={theme}>Create Account</SubmitButton>

          {successMsg && <SuccessText theme={theme}>{successMsg}</SuccessText>}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
