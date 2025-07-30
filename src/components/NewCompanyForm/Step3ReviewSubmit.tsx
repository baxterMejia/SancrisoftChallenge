
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';
import { FormHeader, Button, ButtonGroup, LinkButton, SubmissionMessage } from './formStyles';
import { Theme } from '@/themes/themes'; 
import { motion, AnimatePresence } from 'framer-motion';

export interface StyledThemeProps {
    theme: Theme;
}

interface Step3ReviewSubmitProps {
    formData: any; 
    prevStep: () => void;
    goToStep: (step: number) => void;
    submitForm: () => void;
    submissionStatus: 'idle' | 'in_progress' | 'success' | 'error';
    apiMessage: string;
    startOver: () => void;
}

const ReviewSection = styled.div<StyledThemeProps>`
  background: transparent;
  border-radius: 0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
  position: relative;
  color: ${({ theme }) => theme.text}; /* Usa el color del tema actual */

  h3 {
    color: ${({ theme }) => theme.text};
    font-size: 1.3rem;
    margin-bottom: 1rem;
    border-bottom: none;
    padding-bottom: 0;
  }

  p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    span {
      font-weight: bold;
      color: ${({ theme }) => theme.text};
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;


const EditButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media (max-width: 480px) {
    position: static;
    margin-top: 0.5rem;
    text-align: right;
  }
`;



const Step3ReviewSubmit: React.FC<Step3ReviewSubmitProps> = ({
    formData,
    goToStep,
    submitForm,
    submissionStatus,
    apiMessage,
    startOver,
}) => {
    const { theme } = useTheme();

    return (
        <div>
            <ReviewSection theme={theme}>
                <EditButtonContainer>
                    <LinkButton theme={theme} onClick={() => goToStep(1)}>Edit</LinkButton>
                </EditButtonContainer>
                <h3>Business Structure</h3>
                <p><span>Business Name:</span> {formData.step1.businessName}</p>
                <p><span>Business Type:</span> {formData.step1.type.replace(/_/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                <p><span>Address:</span> {formData.step1.addressLine1}</p>
                {formData.step1.addressLine2 && <p>{formData.step1.addressLine2}</p>}
                <p><span>City, State Zip:</span> {formData.step1.city}, {formData.step1.state} {formData.step1.zip}</p>
            </ReviewSection>

            <ReviewSection theme={theme}>
                <EditButtonContainer>
                    <LinkButton
                        theme={theme}
                        onClick={() => goToStep(1)}
                        style={{
                            background: 'transparent',
                            color: '#000',
                            boxShadow: 'none',
                            fontWeight: 'normal',
                            fontSize: '0.9rem',
                        }}
                    >
                        Edit
                    </LinkButton>
                </EditButtonContainer>
                <h3>Contact Person</h3>
                <p><span>Name:</span> {formData.step2.contactFirstName} {formData.step2.contactLastName}</p>
                <p><span>Email:</span> {formData.step2.contactEmail}</p>
                <p><span>Phone:</span> {formData.step2.contactPhone}</p>
            </ReviewSection>

            {submissionStatus === 'in_progress' && (
                <ButtonGroup>
                    <Button
                        type="button"
                        onClick={submitForm}
                        theme={theme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Confirm & Submit →
                    </Button>
                </ButtonGroup>
            )}

            {(submissionStatus === 'success' || submissionStatus === 'error') && (
                <AnimatePresence>
                    <SubmissionMessage
                        key={submissionStatus}
                        theme={theme}
                        success={submissionStatus === 'success'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {apiMessage}
                    </SubmissionMessage>
                    <ButtonGroup style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                        {submissionStatus === 'success' ? (
                            <Button type="button" onClick={startOver} theme={theme}>
                                Start Over
                            </Button>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    onClick={() => goToStep(1)} // Or just go back to step 1 to edit
                                    theme={theme}
                                    style={{ background: theme.sidebarBg, color: theme.text, boxShadow: 'none' }}
                                >
                                    Edit
                                </Button>
                                <Button type="button" onClick={submitForm} theme={theme}>
                                    Retry Submit
                                </Button>
                            </>
                        )}
                    </ButtonGroup>
                </AnimatePresence>
            )}
        </div>
    );
};

export default Step3ReviewSubmit;