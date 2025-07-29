'use client';

import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';

const flyUp = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(0.2deg);
  }
  100% {
    transform: translateY(-12px) rotate(-0.2deg);
  }
`;

const flameFlicker = keyframes`
  0%, 100% {
    transform: scaleY(1);
    opacity: 0.8;
  }
  50% {
    transform: scaleY(1.3);
    opacity: 0.5;
  }
`;

const rotateAround = keyframes`
  0% {
    transform: rotate(0deg) translateX(200px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(200px) rotate(-360deg);
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: url('/images/Background.jpg') center center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  z-index: 1;
`;

const RocketWrapper = styled.div`
  animation: ${flyUp} 0.9s ease-in-out infinite alternate, ${rotateAround} 8s linear infinite;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tip = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 30px solid #0ff;
`;

const Body = styled.div`
  width: 40px;
  height: 90px;
  background: #ffffff;
  border-radius: 10px;
  position: relative;
`;

const WingLeft = styled.div`
  position: absolute;
  left: -12px;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-right: 12px solid #ccc;
`;

const WingRight = styled.div`
  position: absolute;
  right: -12px;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-left: 12px solid #ccc;
`;

const Flame = styled.div`
  width: 12px;
  height: 35px;
  background: linear-gradient(to bottom, #0ff, #f0f, #ff0);
  border-radius: 50% 50% 0 0;
  margin-top: 8px;
  animation: ${flameFlicker} 0.2s infinite;
`;

const LogoFrame = styled.div`
  width: 550px;
  height: 550px;
  border-radius: 50%;
  background-color: #001f3f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

export default function Home() {
  const router = useRouter();
    
  useEffect(() => {
    router.replace('/login');
  }, [router]); 

  return (
    <Container>
      <ContentWrapper>
        
      </ContentWrapper>
    </Container>
  );
}