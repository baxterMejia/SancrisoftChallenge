import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Theme } from '@/themes/themes';
import { useTheme } from '@/context/ThemeContext';
import { Check } from 'lucide-react';

interface StyledThemeProps {
  theme: Theme;
}

interface SideNavigationProps {
  currentStep: number;
  goToStep: (step: number) => void;
  isMobile: boolean;
  isFormDisabled?: boolean;
  submissionStatus: 'idle' | 'in_progress' | 'success' | 'error';
}

const NavContainer = styled(motion.nav)<StyledThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const StepItem = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['isActive', 'isComplete', 'isClickable'].includes(prop),
})<{
  isActive: boolean;
  isComplete: boolean;
  isClickable: boolean;
} & StyledThemeProps>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  opacity: ${({ isClickable }) => (isClickable ? 1 : 0.6)};
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StepNumber = styled.div<{
  isActive: boolean;
  isComplete: boolean;
} & StyledThemeProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ isActive, isComplete }) =>
    isActive ? '#4F46E5' : isComplete ? '#10B981' : '#F3F4F6'};
  color: ${({ isActive, isComplete }) =>
    isActive || isComplete ? '#fff' : '#6B7280'};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ isActive }) =>
    isActive ? '0 0 0 4px rgba(99, 102, 241, 0.3)' : 'none'};
  border: 1px solid
    ${({ isActive, isComplete }) =>
      isActive
        ? '#4F46E5'
        : isComplete
        ? '#10B981'
        : '#D1D5DB'};
  transition: all 0.2s ease;
`;

const StepLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111827;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StepsWrapper = styled.div`
  border-radius: 999px;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 768px) {
    padding: 1rem 0.6rem;
  }
`;

const SideNavigation: React.FC<SideNavigationProps> = ({
  currentStep,
  goToStep,
  isMobile,
  isFormDisabled,
  submissionStatus,
}) => {
  const { theme } = useTheme();

  const steps = [
    { number: 1, label: 'Business structure' },
    { number: 2, label: 'Contact person' },
    { number: 3, label: 'Review & submit' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <NavContainer
      theme={theme}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StepsWrapper>
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isComplete =
            step.number < currentStep ||
            (step.number === currentStep && submissionStatus === 'success');
          const isClickable = !isFormDisabled && step.number <= currentStep;

          return (
            <StepItem
              key={step.number}
              isActive={isActive}
              isComplete={isComplete}
              isClickable={isClickable}
              theme={theme}
              onClick={() => isClickable && goToStep(step.number)}
              whileHover={{ scale: isClickable ? 1.05 : 1 }}
              whileTap={{ scale: isClickable ? 0.95 : 1 }}
            >
              <StepNumber
                isActive={isActive}
                isComplete={isComplete}
                theme={theme}
              >
                {isComplete && !isActive ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  step.number
                )}
              </StepNumber>
              <StepLabel>{step.label}</StepLabel>
            </StepItem>
          );
        })}
      </StepsWrapper>
    </NavContainer>
  );
};

export default SideNavigation;
