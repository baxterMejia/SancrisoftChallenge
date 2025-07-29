'use client';

import styled from 'styled-components';
import { Theme } from '@/themes/themes';

interface StyledThemeProps {
  theme: Theme;
}

const FooterWrapper = styled.footer<StyledThemeProps>`
  width: 100%;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => (theme as any).footerBg || theme.navBg || '#111'};
  color: ${({ theme }) => theme.text || '#fff'};
  text-align: center;
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => (theme as any).border || '#333'};
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterLeft = styled.div`
  font-weight: 500;
`;

const FooterRight = styled.div<StyledThemeProps>`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  opacity: 0.8;

  a {
    color: ${({ theme }) => theme.text || '#fff'};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterLeft>
          © {new Date().getFullYear()} Johan Sebastian Mejia Carmona
        </FooterLeft>
        <FooterRight>
          <a href="https://landing-page-sebatian-391mf3nyq.vercel.app/" target="_blank" rel="noopener noreferrer">Web Site</a>
          <a href="mailto:johanmejiac@hotmail.com">Contact</a>
        </FooterRight>
      </FooterContent>
    </FooterWrapper>
  );
}