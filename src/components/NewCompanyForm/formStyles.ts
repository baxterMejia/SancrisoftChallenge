import styled from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "@/themes/themes";

interface StyledThemeProps {
  theme: Theme;
}

export const FormContainer = styled(motion.div)<{ theme: Theme }>`
  flex: 1;
  background-color: ${({ theme }) => theme.card};
  padding: 1rem 2rem 2rem 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 700px;

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 100%;
  }
`;

export const FormHeader = styled.h2<StyledThemeProps>`
  font-size: 18px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label<StyledThemeProps>`
  display: block;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 18px;
`;

const baseInput = `
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid;
  font-size: 1rem;
  transition: border-color 0.2s ease;
`;

export const Input = styled.input<StyledThemeProps>`
  ${baseInput}
  border-color: ${({ theme }) => theme.inputBorder};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorder};
  }

  &.error {
    border-color: ${({ theme }) => theme.error};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textFaded};
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 0.6rem 0.8rem;
  }
`;

export const Select = styled.select<StyledThemeProps>`
  ${baseInput}
  border-color: ${({ theme }) => theme.inputBorder};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23${({
    theme,
  }) =>
    theme.text.substring(
      1
    )}' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1em;

  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorder};
    outline: none;
  }

  &.error {
    border-color: ${({ theme }) => theme.error};
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 0.6rem 0.8rem;
  }
`;

export const ErrorText = styled.p<StyledThemeProps>`
  color: ${({ theme }) => theme.error};
  font-size: 0.85rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const Button = styled(motion.button)<StyledThemeProps>`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;
  margin-top: 2rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;

    ${Button} {
      width: 100%;
    }
  }
`;

export const LinkButton = styled(motion.button)<StyledThemeProps>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-left: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.accentHover};
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

interface SubmissionMessageProps extends StyledThemeProps {
  success: boolean;
}

export const SubmissionMessage = styled(motion.p)<SubmissionMessageProps>`
  font-size: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme, success }) =>
    success ? theme.success + "10" : theme.error + "10"};
  color: ${({ theme, success }) => (success ? theme.success : theme.error)};
  border: 1px solid
    ${({ theme, success }) => (success ? theme.success : theme.error)};

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 0.8rem;
  }
`;
