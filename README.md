Sancrisoft Multi-Step Form
==========================

This is a multi-step form built as a technical assessment for Sancrisoft. It demonstrates the implementation of a modern React-based user interface using best practices in accessibility, animations, validations, and UX consistency.

🔧 Tech Stack
-------------
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: styled-components
- Animations: Framer Motion
- Form Handling: Native React state and controlled components
- Icons: Lucide-react
- Context Management: React Context (ThemeContext)
- API Handling: Axios

✨ Features
----------
✅ Responsive multi-step form (desktop & mobile)
✅ Validations for required fields and correct formats
✅ Dynamic phone input with country selector and flag icons
✅ Stepper navigation with active/completed indicators
✅ Form data review before submission
✅ Submit to mock API with success and error handling
✅ Animated transitions for better UX
✅ Theme-aware components

📦 Installation
---------------
git clone https://github.com/baxterMejia/SancrisoftChallenge.git
cd sancrisoft-form
npm install
npm run dev

🚀 How to Use
-------------
1. Start the form at `/` and complete the 3 steps:
   - Business structure: Type, Name, Address (with US state selector)
   - Contact person: First name, last name, email, phone (international format)
   - Review & Submit: Confirm your data and send it to the API

2. The form POSTs to a test endpoint:
   - If the company name is not "Sancrisoft", a success message is shown.
   - If the name is "Sancrisoft", an error message is shown.
   - In rare cases, a 500 error is simulated.

🧪 Test Endpoint
----------------
POST https://ss-company.free.beeceptor.com/company

Body:
{
  name: "Sancrisoft, LLC",
  type: "Limited Liability Company",
  address: {
    line1: "123 Main street",
    line2: "Suite 123",
    city: "Tampa",
    state: "FL",
    zip: "33626"
  },
  contact: {
    firstName: "John",
    lastName: "Doe",
    email: "john@sancrisoft.com",
    phone: "+1 (234) 454-2345"
  }
}

📋 Pre-Submission Checklist
---------------------------
- [x] Validations work on all fields
- [x] Mobile and desktop responsive
- [x] Flags load properly in the country selector
- [x] Stepper highlights current and completed steps
- [x] Green check replaces number for completed steps
- [x] Error messages show correctly from API
- [x] Animation and transition effects are smooth
- [x] Codebase uses clean structure and typing
- [x] ThemeContext applies styling consistently

📁 Project Structure
--------------------
/app               → Next.js App Router (includes routes like /login and /dashboard)
/components        → Reusable UI components (form steps, navigation, layout)
/context           → React Contexts (Theme and User)
/services          → API and data service functions
/styles            → Global styles and font definitions
/themes            → Theme configuration (light/dark modes)

📞 Contact
----------
Made  by Johan Sebastian Mejia Carmona
LinkedIn: https://www.linkedin.com/in/johan-sebastian-mejia-carmona/
Portfolio: https://landing-page-sebatian.vercel.app/