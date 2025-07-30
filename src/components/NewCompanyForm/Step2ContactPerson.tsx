import React, { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FormHeader, FormGroup, Label, Input, ErrorText, Button, ButtonGroup } from './formStyles';
import { Theme } from '@/themes/themes';
import { styled } from 'styled-components';

export const countryPhoneCodes = [
    {
        value: '+1',
        label: 'United States (+1)',
        flag: '🇺🇸',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    },
    {
        value: '+1',
        label: 'Canada (+1)',
        flag: '🇨🇦',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg',
    },
    {
        value: '+44',
        label: 'United Kingdom (+44)',
        flag: '🇬🇧',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    },
    {
        value: '+61',
        label: 'Australia (+61)',
        flag: '🇦🇺',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg',
    },
    {
        value: '+49',
        label: 'Germany (+49)',
        flag: '🇩🇪',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    },
    {
        value: '+33',
        label: 'France (+33)',
        flag: '🇫🇷',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    },
    {
        value: '+81',
        label: 'Japan (+81)',
        flag: '🇯🇵',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    },
    {
        value: '+86',
        label: 'China (+86)',
        flag: '🇨🇳',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_China.svg',
    },
    {
        value: '+91',
        label: 'India (+91)',
        flag: '🇮🇳',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    },
    {
        value: '+55',
        label: 'Brazil (+55)',
        flag: '🇧🇷',
        flagUrl: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
    },
];

export const Select = styled.select<{ theme: Theme }>`
  padding: 13px 13px; 
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.accentHover};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  outline: none;
  width: 100%;
  appearance: none;

  @media (max-width: 768px) {
    padding: 10px 12px; // menos altura en móvil
    width: 35%;
  }

  &.error {
    border-color: red;
  }
`;




interface Step2FormData {
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactCountryCode?: string;
}

interface Step2ValidationErrors {
    contactFirstName?: string;
    contactLastName?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactCountryCode?: string;
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
        } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.contactPhone)) {
            newErrors.contactPhone = 'Invalid phone number. Expected format: (555) 123-4567';
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
                    type="text"
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={
                            countryPhoneCodes.find(
                                (c) => c.value === formData.contactCountryCode
                            )?.flagUrl
                        }
                        alt="flag"
                        style={{
                            width: '24px',
                            height: '16px',
                            marginRight: '8px',
                            borderRadius: '2px',
                            objectFit: 'cover',
                        }}
                    />
                    <Select
                        id="contactCountryCode"
                        name="contactCountryCode"
                        value={formData.contactCountryCode}
                        onChange={(e) =>
                            handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
                        }
                        className={errors.contactCountryCode ? 'error' : ''}
                        theme={theme}
                        style={{
                            borderRadius: '4px 0 0 4px',
                            borderRight: 'none',
                            maxWidth: '120px',
                        }}
                    >

                        {countryPhoneCodes.map((country) => (
                            <option key={country.value + country.label} value={country.value}>
                                {country.flag} {country.value}
                            </option>
                        ))}
                    </Select>

                    <Input
                        id="contactPhone"
                        name="contactPhone"
                        placeholder="(555) 123-4567"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className={errors.contactPhone ? 'error' : ''}
                        theme={theme}
                        maxLength={14}
                        style={{
                            borderLeft: 'none',
                            borderRadius: '0 4px 4px 0',
                            flex: 1,
                        }}
                        ref={inputRefs.contactPhone}
                    />
                </div>
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