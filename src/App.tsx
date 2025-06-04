import './App.css';
import TodoPage from './components/pages/TodoPage/TodoPage.tsx';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './components/pages/NewsPage/NewsPage.tsx';
import WeatherPage from './components/pages/WeatherPage.tsx';
import MainNav from './components/MainNav.tsx';
import { HomePage } from './components/pages/HomePage/HomePage.tsx';
import { MainLinkButton } from './components/common/MainLinkButton.tsx';
import { Clock } from './components/common/Clock.tsx';
import { Character } from './components/common/Character.tsx';
import { myStyles } from './myStyles/myStyles.ts';
import { AuthPage } from './components/pages/AuthPage/AuthPage.tsx';
import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { LoginWidget } from './components/LoginWidget.tsx';

const mainBackground = {
  default: 'bg-linear-to-r from-green-700 to-yellow-300',
  brown: 'bg-linear-to-r from-amber-700 to-yellow-900',
  lake: 'bg-[url(./assets/lake.jpg)] bg-cover',
  sunrise: 'bg-[url(./assets/sunrise.jpg)] bg-cover',
  morning: 'bg-[url(./assets/morning.jpg)] bg-cover',
};

function App() {
  const [user, setUser] = useState<User | null | undefined>(null);

  const pages = {
    todo: 'todo',
    news: 'news',
    weather: 'weather',
    auth: 'auth',
  };

  //todo delete ------------------
  useEffect(() => {
    console.log(user);
  }, [user]);

  const navList: string[] = [pages.news, pages.weather, pages.todo];

  return (
    <div className={`w-screen h-screen grid grid-cols-24 grid-rows-18 ${mainBackground.default} `}>
      <div className="col-span-24 row-span-1 grid grid-cols-[1fr_3fr] content-end">
        <div className={`w-fit h-fit text-base justify-self-start ml-[3vw] ${myStyles.bgGrayBlur}`}>
          <MainLinkButton path={'/'} title={'Home'} />
        </div>

        <div className="justify-self-end mr-[3vw]">
          <LoginWidget user={user} setUser={setUser} />
        </div>
      </div>

      {/*<div className="col-span-5 col-start-18 row-span-5 row-start-9 z-10 ">*/}
      {/*  <Character />*/}
      {/*</div>*/}

      <div
        className={`col-span-24 col-start-1 row-span-1 row-start-2 place-self-center w-full h-fit text-sm md:text-xl lg:text-xl xl:text-xl`}
      >
        <MainNav list={navList} />
      </div>

      <div className="col-span-22 col-start-2 row-span-14 row-start-3 bg-gray-700/50 border rounded-md border-gray-700 backdrop-blur-sm ">
        <Routes>
          <Route path={`/`} element={<HomePage user={user} />} />
          <Route path={`/${pages.auth}`} element={<AuthPage setUser={setUser} />} />
          <Route path={`/${pages.todo}`} element={<TodoPage user={user} />} />
          <Route path={`/${pages.news}`} element={<NewsPage />} />
          <Route path={`/${pages.weather}`} element={<WeatherPage />} />
        </Routes>
      </div>

      <div
        className={`rounded-md md:text-[2vw] lg:text-[2vw] text-yellow-600 font-bold col-start-9 col-span-8 row-span-2 row-start-17 text-center place-self-center h-fit w-fit px-2 ${myStyles.bgGrayBlur}`}
      >
        <Clock />
      </div>
    </div>
  );
}

export default App;
