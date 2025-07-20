import './App.css';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AssistantPage } from '@/pages/HomePage';
import { ErrorFallback, LoadingFallback } from '@/shared/ui';
import { AuthPage } from '@/pages/AuthPage';
import { ErrorBoundary } from 'react-error-boundary';
import { RequireAuth } from '@/features/auth/ui/RequireAuth';

// import TodoPage from '@/pages/TodoPage';
const TodoPage = lazy(() => import('../pages/TodoPage'));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path={`/auth`} element={<AuthPage />} />
          <Route
            path={`/`}
            element={
              <RequireAuth>
                <AssistantPage />
              </RequireAuth>
            }
          />
          <Route
            path={`/todo`}
            element={
              <RequireAuth>
                <TodoPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
