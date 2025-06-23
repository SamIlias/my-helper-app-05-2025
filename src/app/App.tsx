import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainNav from '../widgets/MainNavigation/MainNav.tsx';
import { HomePage } from '../pages/HomePage';
import { Clock } from '../shared/ui/Clock.tsx';
import { myStyles } from '../shared/myStyles/myStyles.ts';
import { AuthPage } from '../pages/AuthPage';
import type { User } from 'firebase/auth';
import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../shared/ui/ErrorFallback';
import { Header } from '../widgets/Header/Header';
import { LoadingFallback } from '../shared/ui/LoadingFallback';

// import TodoPage from './components/pages/TodoPage/TodoPage.tsx';
// import NewsPage from './components/pages/NewsPage/index.tsx';
// import WeatherPage from './components/pages/WeatherPage';
const WeatherPage = lazy(() => import('../pages/WeatherPage/WeatherPage'));
const NewsPage = lazy(() => import('../pages/NewsPage'));
const TodoPage = lazy(() => import('../pages/TodoPage/TodoPage'));

function App() {
  const { t } = useTranslation('common');
  const [user, setUser] = useState<User | null | undefined>(null);

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
      bg-stone-100 dark:bg-stone-800`}
    >
      <header className="col-span-24 row-span-2 grid grid-cols-[1fr_3fr] w-full content-center">
        <Header user={user} setUser={setUser} />
      </header>

      <div
        className={`col-span-24 col-start-1 row-span-1 row-start-3 place-self-center w-full h-fit text-sm md:text-xl lg:text-xl xl:text-xl`}
      >
        <MainNav list={navList} />
      </div>

      <div className="col-span-22 col-start-2 row-span-14 row-start-4  border rounded-md bg-stone-50/50 border-stone-700/50 backdrop-blur-sm ">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path={`/`} element={<HomePage user={user} />} />
              <Route path={`/auth`} element={<AuthPage setUser={setUser} />} />
              <Route path={`/todo`} element={<TodoPage user={user} />} />
              <Route path={`/news`} element={<NewsPage />} />
              <Route path={`/weather`} element={<WeatherPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div
        className={`rounded-md md:text-[2vw] lg:text-[2vw] ${myStyles.textColor.main} font-bold col-start-9 col-span-8 row-span-2 row-start-18 text-center place-self-center h-fit w-fit px-2 ${myStyles.bgGrayBlur}`}
      >
        <Clock />
      </div>
    </div>
  );
}

export default App;
