// src/components/NewCompanyForm/NewCompanyForm.tsx
'use client';

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SideNavigation from './SideNavigation';
import Step1CompanyInfo from './Step1CompanyInfo';
import Step2ContactPerson from './Step2ContactPerson';
import Step3ReviewSubmit from './Step3ReviewSubmit';
import { FormContainer } from './formStyles';
import { Theme } from '@/themes/themes';
import { submitCompany } from '@/services/companyService'; // o '../services/...' según la ubicación

// Styled Components
const TitleBar = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 1.5rem;
  }
`;

const StatusIndicator = styled(motion.span) <{ status: string; theme: Theme }>`
  font-size: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  margin-left: 1rem;
  text-transform: capitalize;
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    margin-left: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr;
    padding: 1rem;
  }
`;


// Types
interface FormData {
    step1: {
        businessName: string;
        type: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip: string;
    };
    step2: {
        contactFirstName: string;
        contactLastName: string;
        contactEmail: string;
        contactPhone: string;
        contactCountryCode : string;
    };
}

interface ValidationErrors {
    step1: Partial<FormData['step1']>;
    step2: Partial<FormData['step2']>;
}

// Initial State
const initialFormData: FormData = {
    step1: {
        businessName: '',
        type: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
    },
    step2: {
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactPhone: '',
        contactCountryCode: "+1",
    },
};

const initialErrors: ValidationErrors = {
    step1: {},
    step2: {},
};

const NewCompanyForm = () => {
    const { theme } = useTheme();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [status, setStatus] = useState<'idle' | 'in_progress' | 'success' | 'error'>('idle');
    const [apiMessage, setApiMessage] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('newCompanyForm');
        if (saved) setFormData(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('newCompanyForm', JSON.stringify(formData));
        if (status === 'idle' && (formData.step1.businessName || formData.step2.contactFirstName)) {
            setStatus('in_progress');
        }
    }, [formData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const step = name in formData.step1 ? 'step1' : 'step2';

        setFormData(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [name]: value
            }
        }));

        setErrors(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [name]: undefined
            }
        }));
    };

    const validateStep = (step: number) => {
        let stepErrors: any = {};
        if (step === 1) {
            const { businessName, type, addressLine1, city, state, zip } = formData.step1;
            if (!businessName) stepErrors.businessName = 'Required';
            if (!type) stepErrors.type = 'Required';
            if (!addressLine1) stepErrors.addressLine1 = 'Required';
            if (!city) stepErrors.city = 'Required';
            if (!state) stepErrors.state = 'Required';
            if (!zip || !/^\d{5}(-\d{4})?$/.test(zip)) stepErrors.zip = 'Invalid zip';
        } else if (step === 2) {
            const { contactFirstName, contactLastName, contactEmail, contactPhone } = formData.step2;
            if (!contactFirstName) stepErrors.contactFirstName = 'Required';
            if (!contactLastName) stepErrors.contactLastName = 'Required';
            if (!/\S+@\S+\.\S+/.test(contactEmail)) stepErrors.contactEmail = 'Invalid email';
            if (!/^\+?\d{10,15}$/.test(contactPhone)) stepErrors.contactPhone = 'Invalid phone';
        }
        setErrors(prev => ({ ...prev, [`step${step}`]: stepErrors }));
        return Object.keys(stepErrors).length === 0;
    };

    const nextStep = () => validateStep(currentStep) && setCurrentStep(s => s + 1);
    const prevStep = () => setCurrentStep(s => Math.max(1, s - 1));
    const goToStep = (step: number) => step <= currentStep && setCurrentStep(step);

    const submitForm = async () => {
        setStatus('in_progress');
        setApiMessage('');       
        const formPayload = {
            name: formData.step1.businessName,
            type: formData.step1.type,
            address: {
                line1: formData.step1.addressLine1,
                line2: formData.step1.addressLine2,
                city: formData.step1.city,
                state: formData.step1.state,
                zip: formData.step1.zip,
            },
            contact: {
                firstName: formData.step2.contactFirstName,
                lastName: formData.step2.contactLastName,
                email: formData.step2.contactEmail,
                phone: formData.step2.contactPhone,
            },
        };  

        const response = await submitCompany(formPayload);         
      
        if (response.status === 'ok') {
            setStatus('success');
            setApiMessage(response.message);
        } else {
            setStatus('error');
            setApiMessage(response.message);
        }      
    };

    const startOver = () => {
        setFormData(initialFormData);
        setErrors(initialErrors);
        setCurrentStep(1);
        setStatus('idle');
        setApiMessage('');
        localStorage.removeItem('newCompanyForm');
    };

    return (
        <>
            <TitleBar theme={theme}>
                New Company
                <StatusIndicator theme={theme} status={status}>{status.replace('_', ' ')}</StatusIndicator>
            </TitleBar>
            <hr></hr>
            <Container>


                <SideNavigation currentStep={currentStep} goToStep={goToStep} isMobile={false} submissionStatus={status} isFormDisabled={status === 'success'} />

                <AnimatePresence mode="wait">
                    <FormContainer
                        key={currentStep}
                        theme={theme}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && (
                            <Step1CompanyInfo
                                formData={formData.step1}
                                handleChange={handleChange}
                                errors={errors.step1}
                                nextStep={nextStep}
                                setErrors={newErrors => setErrors(prev => ({ ...prev, step1: newErrors }))}
                                focusOnFirstError={e => { }}
                            />
                        )}
                        {currentStep === 2 && (
                            <Step2ContactPerson
                                formData={formData.step2}
                                handleChange={handleChange}
                                errors={errors.step2}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                setErrors={newErrors => setErrors(prev => ({ ...prev, step2: newErrors }))}
                                focusOnFirstError={e => { }}
                            />
                        )}
                        {currentStep === 3 && (
                            <Step3ReviewSubmit
                                formData={formData}
                                goToStep={goToStep}
                                submitForm={submitForm}
                                submissionStatus={status}
                                apiMessage={apiMessage}
                                startOver={startOver}
                                prevStep={prevStep}
                            />
                        )}
                    </FormContainer>
                </AnimatePresence>
            </Container>
        </>

    );
};

export default NewCompanyForm;