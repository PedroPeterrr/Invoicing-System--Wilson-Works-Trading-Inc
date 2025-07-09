# Invoicing System — Wilson Works Trading Inc.
  This is an assessment project named Invoicing-System for Wilson Works Trading Inc.
It is a lightweight web application that allows users to register, log in, create invoices, edit them, and view a list of all existing invoices.

  The system uses local storage to simulate a backend and includes basic UI components and state management using Zustand.

# Tech Stack
- React
- Zustand (state management)
- Tailwind CSS
- Local Storage (for data persistence)
- pnpm (package manager)

# Naming Conventions
 - `camelCase` - for folders, functions, variables, non-component files
 - `PascalCase` - for component files
 - `_camelCase` - for internal utility functions
 - `UPPER_CASE` - constants 
 - `lowercase or kebab-case` - CSS files
   
# Clone the repository

```bash
https://github.com/PedroPeterrr/Invoicing-System--Wilson-Works-Trading-Inc.git
cd Invoicing-System--Wilson-Works-Trading-Inc.git
```

# Install dependencies

```bash
pnpm install i
```

# Start the development server

```bash
pnpm dev
```

Open http://localhost:5173 in your browser to view the app.

Make sure pnpm is installed globally. You can install it via:

```bash
npm install -g pnpm
```

# Features
```text
  User Authentication:
    - Login
    - Register
    - Logout
  Invoice Management:
    - Create Invoice
    - Edit Invoice
    - View Invoice List
  UI Components:
    - Reusable buttons
    - Popup modal for confirmations/actions
```

# Folder Structure Overview
```
src/
├── api/                # Simulated service logic (localStorage)
├── components/         # Reusable UI components
├── pages/              # Route-based page components
├── store/              # Zustand stores
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

# Notes
- This is a frontend-only project with no backend/API.
- All data is stored in the browser's local storage.
