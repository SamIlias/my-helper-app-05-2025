import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './ThemeContext';

function ErrorFallback({ error }: { error: Error }) {
  return <div>Something went wrong: {error.message}</div>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
