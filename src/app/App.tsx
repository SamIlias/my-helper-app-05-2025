import './App.css';
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
const WeatherPage = lazy(() => import('../pages/WeatherPage'));
const NewsPage = lazy(() => import('../pages/NewsPage'));
const TodoPage = lazy(() => import('../pages/TodoPage'));

function App() {
  const { t } = useTranslation('common');

  const pages = {
    todo: {
      name: t('pageNames.todo'),
      pathName: 'todo',
    },
    news: {
      name: t('pageNames.news'),
      pathName: 'news',
    },
    weather: {
      name: t('pageNames.weather'),
      pathName: 'weather',
    },
    auth: {
      name: t('pageNames.auth'),
      pathName: 'auth',
    },
  } as const;
  type PageType = { name: string; pathName: (typeof pages)[keyof typeof pages]['pathName'] };

  const navList: PageType[] = [pages.news, pages.weather, pages.todo];

  return (
    <div
      className={`w-screen h-screen grid grid-cols-24 grid-rows-19 
      bg-radial from-white to-white dark:from-stone-800 dark:to-stone-600`}
    >
      <header className="col-span-24 row-span-2 grid grid-cols-[1fr_3fr] w-full content-center">
        <Header />
      </header>

      <div
        className={`col-span-24 col-start-1 row-span-1 row-start-3 place-self-center w-full h-fit text-sm md:text-xl lg:text-xl xl:text-xl`}
      >
        <MainNav list={navList} />
      </div>

      <div className="bg-stone-500/10 dark:bg-stone-100/10 col-span-22 col-start-2 row-span-14 row-start-4  border rounded-md shadow-lg border-stone-700/10 backdrop-blur-sm ">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path={`/auth`} element={<AuthPage />} />
              <Route path={`/news`} element={<NewsPage />} />
              <Route path={`/weather`} element={<WeatherPage />} />
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

      <div
        className={`rounded-md md:text-[2vw] lg:text-[2vw] ${textColors.main} font-bold col-start-9 col-span-8 row-span-2 row-start-18 text-center place-self-center h-fit w-fit px-2 bg-stone-900/10`}
      >
        <Clock />
      </div>
    </div>
  );
}

export default App;
