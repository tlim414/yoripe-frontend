import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Components
import LandingPage from './pages/LandingPage';
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PubilcLayout';
import { Show } from '@clerk/react';
import { ROUTES } from './constants/routes';
import MyRecipesPage from './pages/MyRecipesPage';
import ExplorePage from './pages/ExplorePage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route
            path={ROUTES.LANDING}
            element={
              <>
                <Show when={'signed-out'}>
                  <PublicLayout>
                    <LandingPage />
                  </PublicLayout>
                </Show>
                <Show when={'signed-in'}>
                  <Navigate to={ROUTES.MY} replace />
                </Show>
              </>
            }
          />
          {/* My Recipes */}
          <Route
            path={ROUTES.MY}
            element={
              <>
                <Show when={'signed-in'}>
                  <AppLayout>
                    <MyRecipesPage />
                  </AppLayout>
                </Show>
                <Show when={'signed-out'}>
                  <Navigate to={ROUTES.LANDING} replace />
                </Show>
              </>
            }
          />
          {/* Explore */}
          <Route
            path={ROUTES.EXPLORE}
            element={
              <>
                <Show when={'signed-in'}>
                  <AppLayout>
                    <ExplorePage />
                  </AppLayout>
                </Show>
                <Show when={'signed-out'}>
                  <Navigate to={ROUTES.LANDING} replace />
                </Show>
              </>
            }
          />
          {/* Settings */}
          <Route
            path={ROUTES.SETTINGS}
            element={
              <>
                <Show when={'signed-in'}>
                  <AppLayout>
                    <SettingsPage />
                  </AppLayout>
                </Show>
                <Show when={'signed-out'}>
                  <Navigate to={ROUTES.MY} replace />
                </Show>
              </>
            }
          />
          {/* Invalid Route Redirect */}
          <Route
            path="*"
            element={
              <>
                <Show when={'signed-in'}>
                  <Navigate to={ROUTES.MY} replace />
                </Show>
                <Show when={'signed-out'}>
                  <Navigate to={ROUTES.LANDING} replace />
                </Show>
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
