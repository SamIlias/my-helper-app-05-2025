import './App.css';
import TodoPage from './components/pages/TodoPage/TodoPage.tsx';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './components/pages/NewsPage/NewsPage.tsx';
import WeatherPage from './components/pages/WeatherPage.tsx';
import MainNav from './components/MainNav.tsx';
import { HomePage } from './components/pages/HomePage/HomePage.tsx';
import { MainLinkButton } from './components/common/MainLinkButton.tsx';
import { Clock } from './components/common/Clock.tsx';
// import { Character } from './components/common/Character.tsx';
import { myStyles } from './myStyles/myStyles.ts';
import { AuthPage } from './components/pages/AuthPage/AuthPage.tsx';
import type { User } from 'firebase/auth';
import { useState } from 'react';
import { LoginWidget } from './components/LoginWidget.tsx';
import { useTranslation } from 'react-i18next';
import * as React from 'react';

const mainBackground = {
  default: 'bg-linear-to-r from-green-700 to-yellow-300',
  brown: 'bg-linear-to-r from-amber-700 to-yellow-900',
  lake: 'bg-[url(./assets/lake.jpg)] bg-cover',
  sunrise: 'bg-[url(./assets/sunrise.jpg)] bg-cover',
  morning: 'bg-[url(./assets/morning.jpg)] bg-cover',
};

function App() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('common');
  const [user, setUser] = useState<User | null | undefined>(null);

  const pages = {
    todo: {
      //todo
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

  //todo typify
  type PageType = { name: string; pathName: string };

  const navList: PageType[] = [pages.news, pages.weather, pages.todo];

  const handleSelectLng = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={`w-screen h-screen grid grid-cols-24 grid-rows-19 ${mainBackground.default} `}>
      <div className="col-span-24 row-span-2 grid grid-cols-[1fr_3fr] w-full content-center">
        <div className={`w-fit h-fit text-base justify-self-start ml-[3vw] ${myStyles.bgGrayBlur}`}>
          <MainLinkButton path={'/'} title={t('homeButtonTitle')} />
        </div>

        <div className="justify-self-end mr-[3vw]">
          <LoginWidget user={user} setUser={setUser} />

          <div className="relative flex gap-2 mt-1 justify-self-end">
            <select value={i18n.language} onChange={handleSelectLng} className="text-amber-900">
              <option className="text-amber-900" value="en">
                English
              </option>
              <option className="text-amber-900" value="ru">
                Русский
              </option>
            </select>
            <div className="pointer-events-none absolute right-0 top-0 text-gray-500">▼</div>
          </div>
        </div>
      </div>

      {/*<div className="col-span-5 col-start-18 row-span-5 row-start-9 z-10 ">*/}
      {/*  <Character />*/}
      {/*</div>*/}

      <div
        className={`col-span-24 col-start-1 row-span-1 row-start-3 place-self-center w-full h-fit text-sm md:text-xl lg:text-xl xl:text-xl`}
      >
        <MainNav list={navList} />
      </div>

      <div className="col-span-22 col-start-2 row-span-14 row-start-4 bg-gray-700/50 border rounded-md border-gray-700 backdrop-blur-sm ">
        <Routes>
          <Route path={`/`} element={<HomePage user={user} />} />
          <Route path={`/auth`} element={<AuthPage setUser={setUser} />} />
          <Route path={`/todo`} element={<TodoPage user={user} />} />
          <Route path={`/news`} element={<NewsPage />} />
          <Route path={`/weather`} element={<WeatherPage />} />
        </Routes>
      </div>

      <div
        className={`rounded-md md:text-[2vw] lg:text-[2vw] text-yellow-600 font-bold col-start-9 col-span-8 row-span-2 row-start-18 text-center place-self-center h-fit w-fit px-2 ${myStyles.bgGrayBlur}`}
      >
        <Clock />
      </div>
    </div>
  );
}

export default App;
