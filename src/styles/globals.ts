import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Theme } from '../themes/themes'; 
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyle = createGlobalStyle`
  /* Normal global styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    // Access theme properties directly, TypeScript now understands their types
    background: ${({ theme }) => theme.bg || '#0f0f0f'};
    color: ${({ theme }) => theme.text || '#fff'};
    font-family: 'Segoe UI', sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
  }

  /* ------------------------------
    PRINT STYLES
  ------------------------------ */
  @media print {
    /* 1) Hide everything */
    body * {
      visibility: hidden !important;
    }
    /* 2) Show only the area with class invoice-print-area */
    .invoice-print-area,
    .invoice-print-area * {
      visibility: visible !important;
    }
    /* 3) Adjust the invoice box for the whole page */
    .invoice-print-area {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff !important;
      color: #000 !important;
      box-shadow: none !important;
    }
    /* 4) Readable tables */
    .invoice-print-area table {
      width: 100%;
      border-collapse: collapse;
    }
    .invoice-print-area th,
    .invoice-print-area td {
      border: 1px solid #333;
      padding: 0.5rem;
      color: #000 !important;
    }
    /* 5) Hide buttons, inputs, etc. if they appear for some reason */
    button,
    input,
    select {
      display: none !important;
    }
  }
`;