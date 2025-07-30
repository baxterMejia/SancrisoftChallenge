// src/components/NewCompanyForm/Step1CompanyInfo.tsx
import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FormHeader, FormGroup, Label, Input, Select, ErrorText, Button, ButtonGroup } from './formStyles'; // Import shared styles
import { Theme } from '@/themes/themes'; // Adjust path if necessary

interface Step1FormData {
    businessName: string;
    type: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
}

interface Step1ValidationErrors {
    businessName?: string;
    type?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
}

interface Step1CompanyInfoProps {
    formData: Step1FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: Step1ValidationErrors;
    nextStep: () => void;
    setErrors: (errors: Step1ValidationErrors) => void;
    focusOnFirstError: (errors: Step1ValidationErrors) => void;
}

const businessTypes = [
    { value: '', label: 'Type of business' },
    { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
    { value: 'general_partnership', label: 'General Partnership (GP)' },
    { value: 'limited_partnership', label: 'Limited Partnership (LP)' },
    { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
    { value: 'llc', label: 'Limited Liability Company (LLC)' },
    { value: 'c_corp', label: 'C Corporation (C Corp)' },
    { value: 's_corp', label: 'S Corporation (S Corp)' },
    { value: 'nonprofit', label: 'Nonprofit Organization' },
    { value: 'cooperative', label: 'Cooperative (Co-op)' },
    { value: 'pc', label: 'Professional Corporation (PC)' },
    { value: 'pllc', label: 'Professional Limited Liability Company (PLLC)' },
];


const usStates = [
    { value: '', label: 'State' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
];



const Step1CompanyInfo: React.FC<Step1CompanyInfoProps> = ({
    formData,
    handleChange,
    errors,
    nextStep,
    setErrors,
    focusOnFirstError,
}) => {
    const { theme } = useTheme();

    const inputRefs = {
        businessName: useRef<HTMLInputElement>(null),
        type: useRef<HTMLSelectElement>(null),
        addressLine1: useRef<HTMLInputElement>(null),
        addressLine2: useRef<HTMLInputElement>(null),
        city: useRef<HTMLInputElement>(null),
        state: useRef<HTMLSelectElement>(null),
        zip: useRef<HTMLInputElement>(null),
    };

    const validate = (): Step1ValidationErrors => {
        const newErrors: Step1ValidationErrors = {};
        if (!formData.businessName) newErrors.businessName = 'Business name is required.';
        if (!formData.type) newErrors.type = 'Business type is required.';
        if (!formData.addressLine1) newErrors.addressLine1 = 'Address line 1 is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!formData.state) newErrors.state = 'State is required.';
        if (!formData.zip) newErrors.zip = 'Zip code is required.';
        else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'Invalid Zip code format.';
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
                <Label htmlFor="businessName" theme={theme}>Business name</Label>
                <Input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Registered business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={errors.businessName ? 'error' : ''}
                    theme={theme}
                    ref={inputRefs.businessName}
                />
                {errors.businessName && <ErrorText theme={theme}>{errors.businessName}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label htmlFor="type" theme={theme}>Type</Label>
                <Select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={errors.type ? 'error' : ''}
                    theme={theme}
                    ref={inputRefs.type}
                >
                    {businessTypes.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                {errors.type && <ErrorText theme={theme}>{errors.type}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label htmlFor="addressLine1" theme={theme}>Address</Label>
                <Input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    placeholder="Address line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className={errors.addressLine1 ? 'error' : ''}
                    theme={theme}
                    ref={inputRefs.addressLine1}
                />
                {errors.addressLine1 && <ErrorText theme={theme}>{errors.addressLine1}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    placeholder="Address line 2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    theme={theme}
                    ref={inputRefs.addressLine2}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                    theme={theme}
                    ref={inputRefs.city}
                />
                {errors.city && <ErrorText theme={theme}>{errors.city}</ErrorText>}
            </FormGroup>

            <FormGroup style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 2 }}>
                    <Select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? 'error' : ''}
                        theme={theme}
                        ref={inputRefs.state}
                    >
                        {usStates.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.value === ''}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    {errors.state && <ErrorText theme={theme}>{errors.state}</ErrorText>}
                </div>
                <div style={{ flex: 1 }}>
                    <Input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="Zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={errors.zip ? 'error' : ''}
                        theme={theme}
                        ref={inputRefs.zip}
                    />
                    {errors.zip && <ErrorText theme={theme}>{errors.zip}</ErrorText>}
                </div>
            </FormGroup>

            <Button type="submit" theme={theme}>
                Continue →
            </Button>
        </form>
    );
};

export default Step1CompanyInfo;