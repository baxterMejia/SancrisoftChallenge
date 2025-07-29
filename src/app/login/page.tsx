// src/pages/login.tsx (or src/app/login/page.tsx if using Next.js App Router)
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

const API_BASE_URL = "https://client-management-api-demo-ceaxgwadhbawc5dk.canadacentral-01.azurewebsites.net/api";
//const API_BASE_URL = "https://localhost:7172/api";

const Background = styled.div<StyledThemeProps>`
  min-height: 100vh;
  background: radial-gradient(
    circle at top left,
    ${({ theme }) => theme.bg},
    ${({ theme }) => theme.navBg},
    ${({ theme }) => theme.sidebarBg}
  );
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: ${({ theme }) => theme.text};
`;

const LoginCard = styled(motion.div)<StyledThemeProps>`
  background: rgba(10, 15, 28, 0.85);
  border-radius: 20px;
  box-shadow:
    0 0 20px ${({ theme }) => theme.accent},
    0 0 40px ${({ theme }) => theme.accent},
    0 0 60px ${({ theme }) => theme.accent},
    inset 0 0 10px ${({ theme }) => theme.accent};
  padding: 3rem 4rem;
  width: 420px;
  text-align: center;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;
`;

const Title = styled(motion.h1)<StyledThemeProps>`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow:
    0 0 5px ${({ theme }) => theme.accent},
    0 0 10px ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Input = styled.input<StyledThemeProps>`
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: none;
  background: rgba(0, 255, 255, 0.1);
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  box-shadow: 0 0 10px ${({ theme }) => theme.accent}55 inset;
  transition: 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.accentHover};
  }

  &:focus {
    outline: none;
    background: rgba(0, 255, 255, 0.25);
    box-shadow: 0 0 20px ${({ theme }) => theme.accent}dd inset;
  }
`;

const Button = styled(motion.button)<StyledThemeProps>` // Changed from styled.button to styled(motion.button)
  padding: 0.9rem 1rem;
  border-radius: 15px;
  border: none;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.sidebarText};
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow:
    0 0 10px ${({ theme }) => theme.accent},
    0 0 20px ${({ theme }) => theme.accent};
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    box-shadow:
      0 0 15px ${({ theme }) => theme.accent},
      0 0 30px ${({ theme }) => theme.accent};
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const PremiumButton = styled(Button)<StyledThemeProps>`
  background: ${({ theme }) => theme.accentHover};
  color: ${({ theme }) => theme.sidebarText};
  box-shadow:
    0 0 10px ${({ theme }) => theme.accent},
    0 0 20px ${({ theme }) => theme.accent};

  &:hover {
    background: #00e6b3;
    box-shadow:
      0 0 15px ${({ theme }) => theme.accent},
      0 0 30px ${({ theme }) => theme.accent};
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
  const { authenticateUser } = useUsers(); // Assuming useUsers is correctly typed

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      router.push('/dashboard');
    }
  }, [isClient, router]); // Add router to dependency array

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Type the event
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Authenticate user using the context function
      const user = authenticateUser(username, password);

      if (!user) {
        setLoginError('❌ Incorrect username or password.');
        return;
      }

      const loginTime = new Date().toISOString();
      const token = 'token-' + Math.random().toString(36).substring(2);
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('user', user.username); // Assuming user.username is a string
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('loginTime', loginTime);

      router.push('/dashboard');
    } catch (error) {
      // More specific error handling if needed
      console.error("Login error:", error);
      setLoginError('Hubo un error al iniciar sesión. Intenta de nuevo.');
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
            boxShadow: `0 0 20px ${theme.accent}`
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