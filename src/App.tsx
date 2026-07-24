import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// Components
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage';
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PubilcLayout';
import { Show } from '@clerk/react';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Show when={'signed-out'}>
                  <PublicLayout>
                    <LandingPage />
                  </PublicLayout>
                </Show>
                <Show when={'signed-in'}>
                  <Navigate to="/dashboard" replace />
                </Show>
              </>
            } />
          <Route
            path="/dashboard"
            element={
              <>
                <Show when={'signed-in'}>
                  <AppLayout>
                    <HomePage />
                  </AppLayout>
                </Show>
                <Show when={'signed-out'}>
                  <Navigate to="/" replace>
                  </Navigate>
                </Show>
              </>
            } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
