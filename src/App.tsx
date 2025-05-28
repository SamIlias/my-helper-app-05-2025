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
import AuthPage from './components/pages/AuthPage/AuthPage.tsx';

const mainBackground = {
  default: 'bg-linear-to-r from-green-700 to-yellow-300',
  lake: 'bg-[url(./assets/lake.jpg)] bg-cover',
  sunrise: 'bg-[url(./assets/sunrise.jpg)] bg-cover',
  morning: 'bg-[url(./assets/morning.jpg)] bg-cover',
};

function App() {
  const pages = {
    todo: 'todo',
    news: 'news',
    weather: 'weather',
    auth: 'auth',
  };

  const navList: string[] = [pages.news, pages.weather, pages.todo];

  return (
    <div
      className={`text-[3vw] sm:text-[1.5vw] md:text-[1.5vw] lg:text-[1vw] max-h-screen min-h-screen grid grid-cols-24 grid-rows-14 ${mainBackground.morning} `}
    >
      <div
        className={`lg:text-[1vw] col-start-3 row-start-1 h-fit w-fit mt-10 ${myStyles.bgGrayBlur}`}
      >
        <MainLinkButton path={'/'} title={'Home'} />
      </div>

      <div
        className={`lg:text-[1vw] col-start-22 row-start-1 h-fit w-fit mt-10 ${myStyles.bgGrayBlur}`}
      >
        <MainLinkButton path={'/login'} title={'Login'} />
      </div>

      <div className="col-span-5 col-start-18 row-span-5 row-start-9 z-10 ">
        <Character />
      </div>

      <div className={`col-span-10 col-start-8 row-span-1 row-start-2 w-full h-fit`}>
        <MainNav list={navList} />
      </div>

      <div className="col-span-18 col-start-4 row-span-8 row-start-3 bg-gray-700/50 border rounded-md border-gray-700  backdrop-blur-sm ">
        <Routes>
          <Route path={`/`} element={<HomePage />} />
          <Route path={`/${pages.auth}`} element={<AuthPage />} />
          <Route path={`/${pages.todo}`} element={<TodoPage />} />
          <Route path={`/${pages.news}`} element={<NewsPage />} />
          <Route path={`/${pages.weather}`} element={<WeatherPage />} />
        </Routes>
      </div>

      <div
        className={`rounded-md md:text-[2vw] lg:text-[2vw] text-yellow-600 font-bold col-start-11 col-span-3 row-span-1 row-start-12 text-center h-fit ${myStyles.bgGrayBlur}`}
      >
        <Clock />
      </div>
    </div>
  );
}

export default App;
