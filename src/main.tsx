import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//Clerk
import { ClerkProvider } from '@clerk/react'
// MUI
import { ThemeProvider } from "@mui/material/styles"

import './index.css'
import App from './App.tsx'

// Themes
import { theme } from "./theme/theme"

// Fetch key from env vars
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>,
)
