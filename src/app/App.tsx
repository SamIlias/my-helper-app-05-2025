import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainNav from '@/widgets/MainNavigation/MainNav';
import { HomePage } from '@/pages/HomePage';
import { Clock, ErrorFallback, LoadingFallback } from '@/shared/ui';
import { textColors } from '@/shared/myStyles/myStyles';
import { AuthPage } from '@/pages/AuthPage';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { Header } from '@/widgets/Header/Header';
import { RequireAuth } from '../features/auth/ui/RequireAuth';

// import TodoPage from '@/pages/TodoPage';
// import NewsPage from '@/pages/NewsPage';
// import WeatherPage from '@/pages/WeatherPage';
// const WeatherPage = lazy(() => import('../pages/WeatherPage'));
// const NewsPage = lazy(() => import('../pages/NewsPage'));
const TodoPage = lazy(() => import('../pages/TodoPage'));

function App() {
  return (
    <div
      className={`w-screen h-screen grid grid-cols-24  
      bg-gradient-to-b from-white to-white dark:from-stone-950 dark:via-stone-800 dark:to-amber-950/50`}
    >
      <header className="col-span-24 w-full h-24 content-center bg-gradient-to-r from-stone-500 from-5% via-stone-600 via-20% to-stone-700 to-90% ">
        <Header />
      </header>

      <div className="bg-stone-500/10 dark:bg-stone-100/10 col-span-22 col-start-2 row-span-14 row-start-4  border rounded-md shadow-lg border-stone-700/10 backdrop-blur-sm ">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path={`/auth`} element={<AuthPage />} />
              {/*<Route path={`/news`} element={<NewsPage />} />*/}
              {/*<Route path={`/weather`} element={<WeatherPage />} />*/}
              <Route
                path={`/`}
                element={
                  <RequireAuth>
                    <HomePage />
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
      </div>
    </div>
  );
}

export default App;
