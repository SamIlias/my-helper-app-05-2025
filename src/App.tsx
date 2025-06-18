import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainNav from './components/MainNav.tsx';
import { HomePage } from './components/pages/HomePage/HomePage.tsx';
import { MainLinkButton } from './components/common/MainLinkButton.tsx';
import { Clock } from './components/common/Clock.tsx';
import { myStyles } from './myStyles/myStyles.ts';
import { AuthPage } from './components/pages/AuthPage/AuthPage.tsx';
import type { User } from 'firebase/auth';
import { lazy, Suspense, useState } from 'react';
import { LoginWidget } from './components/LoginWidget.tsx';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from './ThemeContext';
import { LanguageSelector } from './components/common/LanguageSelector';
import { ThemeToggleButton } from './components/common/ThemeToggleButton.tsx';
import { ErrorFallback } from './components/common/ErrorFallback';

// import TodoPage from './components/pages/TodoPage/TodoPage.tsx';
// import NewsPage from './components/pages/NewsPage/NewsPage.tsx';
// import WeatherPage from './components/pages/WeatherPage';
const WeatherPage = lazy(() => import('./components/pages/WeatherPage'));
const NewsPage = lazy(() => import('./components/pages/NewsPage/NewsPage'));
const TodoPage = lazy(() => import('./components/pages/TodoPage/TodoPage'));

function App() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('common');
  const [user, setUser] = useState<User | null | undefined>(null);

  const { theme, toggleTheme } = useTheme();

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
  };

  type PageType = { name: string; pathName: string };
  const navList: PageType[] = [pages.news, pages.weather, pages.todo];

  const handleSelectLng = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      className={`w-screen h-screen grid grid-cols-24 grid-rows-19 bg-gradient-to-r from-green-700 to-yellow-300 dark:from-green-900 dark:to-yellow-600`}
    >
      <div className="col-span-24 row-span-2 grid grid-cols-[1fr_3fr] w-full content-center">
        <div className={`w-fit h-fit text-base justify-self-start ml-[3vw] ${myStyles.bgGrayBlur}`}>
          <MainLinkButton path={'/'} title={t('homeButtonTitle')} />
        </div>

        <div className="justify-self-end mr-[3vw]">
          <LoginWidget user={user} setUser={setUser} />

          <div className="relative flex gap-2 mt-1 justify-self-end">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <LanguageSelector currentLang={i18n.language} handleSelectLng={handleSelectLng} />
          </div>
        </div>
      </div>

      <div
        className={`col-span-24 col-start-1 row-span-1 row-start-3 place-self-center w-full h-fit text-sm md:text-xl lg:text-xl xl:text-xl`}
      >
        <MainNav list={navList} />
      </div>

      <div className="col-span-22 col-start-2 row-span-14 row-start-4 bg-gray-700/50 border rounded-md border-gray-700 backdrop-blur-sm ">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
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

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
}

export default App;
