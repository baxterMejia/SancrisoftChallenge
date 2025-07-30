export interface CompanyData {
    name: string;
    type: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    };
    contact: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }
  
  export interface ApiResponse {
    status: 'ok' | 'error';
    message: string;
  }
  
  export const submitCompany = async (data: CompanyData): Promise<ApiResponse> => {
    try {
      const response = await fetch('https://ss-company.free.beeceptor.com/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      return result as ApiResponse;
    } catch (error) {
      console.error('Unexpected error:', error);
      return {
        status: 'error',
        message: 'Unexpected error occurred. Please try again later.',
      };
    }
  };
  