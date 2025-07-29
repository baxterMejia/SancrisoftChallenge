// src/components/NewCompanyForm/Step2ContactPerson.tsx
import React, { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FormHeader, FormGroup, Label, Input, ErrorText, Button, ButtonGroup } from './formStyles'; // Import shared styles
import { Theme } from '@/themes/themes'; // Adjust path if necessary

interface Step2FormData {
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
}

interface Step2ValidationErrors {
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

interface Step2ContactPersonProps {
  formData: Step2FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Step2ValidationErrors;
  nextStep: () => void;
  prevStep: () => void;
  setErrors: (errors: Step2ValidationErrors) => void;
  focusOnFirstError: (errors: Step2ValidationErrors) => void;
}

const Step2ContactPerson: React.FC<Step2ContactPersonProps> = ({
  formData,
  handleChange,
  errors,
  nextStep,
  prevStep,
  setErrors,
  focusOnFirstError,
}) => {
  const { theme } = useTheme();

  const inputRefs = {
    contactFirstName: useRef<HTMLInputElement>(null),
    contactLastName: useRef<HTMLInputElement>(null),
    contactEmail: useRef<HTMLInputElement>(null),
    contactPhone: useRef<HTMLInputElement>(null),
  };

  const validate = (): Step2ValidationErrors => {
    const newErrors: Step2ValidationErrors = {};
    if (!formData.contactFirstName) newErrors.contactFirstName = 'First name is required.';
    if (!formData.contactLastName) newErrors.contactLastName = 'Last name is required.';
    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format.';
    }
    if (!formData.contactPhone) {
      newErrors.contactPhone = 'Phone number is required.';
    } else if (!/^\+?\d{10,15}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Invalid phone number. Use 10-15 digits (optional leading +).';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      nextStep();
    } else {
      focusOnFirstError(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="contactFirstName" theme={theme}>First Name</Label>
        <Input
          type="text"
          id="contactFirstName"
          name="contactFirstName"
          placeholder="Contact's first name"
          value={formData.contactFirstName}
          onChange={handleChange}
          className={errors.contactFirstName ? 'error' : ''}
          theme={theme}
          ref={inputRefs.contactFirstName}
        />
        {errors.contactFirstName && <ErrorText theme={theme}>{errors.contactFirstName}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="contactLastName" theme={theme}>Last Name</Label>
        <Input
          type="text"
          id="contactLastName"
          name="contactLastName"
          placeholder="Contact's last name"
          value={formData.contactLastName}
          onChange={handleChange}
          className={errors.contactLastName ? 'error' : ''}
          theme={theme}
          ref={inputRefs.contactLastName}
        />
        {errors.contactLastName && <ErrorText theme={theme}>{errors.contactLastName}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="contactEmail" theme={theme}>Email</Label>
        <Input
          type="email"
          id="contactEmail"
          name="contactEmail"
          placeholder="contact@example.com"
          value={formData.contactEmail}
          onChange={handleChange}
          className={errors.contactEmail ? 'error' : ''}
          theme={theme}
          ref={inputRefs.contactEmail}
        />
        {errors.contactEmail && <ErrorText theme={theme}>{errors.contactEmail}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="contactPhone" theme={theme}>Phone Number</Label>
        <Input
          type="tel"
          id="contactPhone"
          name="contactPhone"
          placeholder="+1 (555) 123-4567"
          value={formData.contactPhone}
          onChange={handleChange}
          className={errors.contactPhone ? 'error' : ''}
          theme={theme}
          ref={inputRefs.contactPhone}
        />
        {errors.contactPhone && <ErrorText theme={theme}>{errors.contactPhone}</ErrorText>}
      </FormGroup>

      <ButtonGroup>
        <Button type="button" onClick={prevStep} theme={theme} style={{ background: theme.sidebarBg, color: theme.text, boxShadow: 'none' }}>
          ← Back
        </Button>
        <Button type="submit" theme={theme}>
          Continue →
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default Step2ContactPerson;