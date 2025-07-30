'use client';

import { useState, useEffect, FormEvent } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext'; 
import SingUpModal from './SingUpModal'; 
import { useRouter } from 'next/navigation';
import { useUsers } from '@/context/UserContext'; 
import Image from 'next/image';
import { Theme } from '@/themes/themes'; 

interface StyledThemeProps {
  theme: Theme;
}

const Background = styled.div<StyledThemeProps>`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg}; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
`;

const LoginCard = styled(motion.div)<StyledThemeProps>`
  background: ${({ theme }) => theme.navBg}; // blanco limpio
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06); // sombra sutil
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.inputBorder};
`;

const Title = styled(motion.h1)<StyledThemeProps>`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Input = styled.input<StyledThemeProps>`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.textFaded};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorder};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.inputFocusBorder}33;
  }
`;

const Button = styled(motion.button)<StyledThemeProps>`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PremiumButton = styled(Button)<StyledThemeProps>`
  background: ${({ theme }) => theme.accentHover};

  &:hover {
    background: #4338CA;
  }
`;

const ErrorMessage = styled(motion.p)`
  color: #ff6b6b;
  margin-top: 10px;
  font-size: 0.9rem;
  text-shadow: 0 0 5px #ff6b6b;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function LoginPage() {
  const { theme } = useTheme();

  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('admin123');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  const { authenticateUser } = useUsers(); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      router.push('/dashboard');
    }
  }, [isClient, router]); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
   
      await new Promise((resolve) => setTimeout(resolve, 1000));

      
      const user = authenticateUser(username, password);

      if (!user) {
        setLoginError('❌ Incorrect username or password.');
        return;
      }

      const loginTime = new Date().toISOString();
      const token = 'token-' + Math.random().toString(36).substring(2);
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('user', user.username); 
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('loginTime', loginTime);

      router.push('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      setLoginError('Login Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background theme={theme}>
      <LoginCard
        theme={theme}
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Image
          src="/images/logoSancrisoft.jpeg"
          alt="Sancrisoft Logo"
          width={100}
          height={100}
          style={{
            margin: '0 auto',
            marginBottom: '1rem',
            borderRadius: '12px',
            boxShadow: 'none'
          }}
        />

        <Form onSubmit={handleSubmit}>
          <Input
            theme={theme}
            type="text"
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            disabled={isLoading}
          />
          <Input
            theme={theme}
            type="password"
            placeholder="Pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isLoading}
          />
          <Button theme={theme} type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner /> Sign In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          <PremiumButton
            theme={theme}
            type="button"
            onClick={() => setShowPaymentModal(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            disabled={isLoading}
          >
            Sign Up
          </PremiumButton>
          <AnimatePresence>
            {loginError && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loginError}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </Form>
      </LoginCard>

      <AnimatePresence>
        {showPaymentModal && (
          <SingUpModal onClose={() => setShowPaymentModal(false)} />
        )}
      </AnimatePresence>
    </Background>
  );
}