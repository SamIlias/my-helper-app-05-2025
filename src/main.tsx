import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import './shared/i18n/i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './app/ThemeProvider';
import { ErrorFallback } from './shared/ui';
import { Provider } from 'react-redux';
import { store } from './app/store';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
