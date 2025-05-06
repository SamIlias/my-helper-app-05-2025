import './App.css';
import TodoPage from './components/pages/TodoPage.tsx';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './components/pages/NewsPage/NewsPage.tsx';
import WeatherPage from './components/pages/WeatherPage.tsx';
import MainNav from './components/MainNav.tsx';
import { HomePage } from './components/pages/HomePage.tsx';
import { HomeButton } from './components/common/HomeButton.tsx';
import { Clock } from './components/common/Clock.tsx';
import { Character } from './components/common/Character.tsx';

function App() {
  const pages = {
    todo: 'todo',
    news: 'news',
    weather: 'weather',
  };

  const navList: string[] = [pages.todo, pages.news, pages.weather];

  return (
    <div className="max-h-screen grid grid-cols-24 grid-rows-14 content-start bg-orange-950">
      <div className="col-span-2 col-start-3 row-span-1 row-start-1 content-end">
        <HomeButton />
      </div>

      <div className="col-span-5 col-start-17 row-span-5 row-start-9 z-10 ">
        <Character />
      </div>

      <div className="col-span-10 col-start-8 row-span-1 row-start-2">
        <MainNav list={navList} />
      </div>
      <div className="col-span-14 col-start-6 row-span-7 row-start-4 bg-gray-700/50 border rounded-xs border-gray-700">
        <Routes>
          <Route path={`/`} element={<HomePage />} />
          <Route path={`/${pages.todo}`} element={<TodoPage />} />
          <Route path={`/${pages.news}`} element={<NewsPage />} />
          <Route path={`/${pages.weather}`} element={<WeatherPage />} />
        </Routes>
      </div>

      <div className="text-amber-500 col-span-4 col-start-11 row-span-1 row-start-12 bg-gray-700/50">
        <Clock />
      </div>
    </div>
  );
}

export default App;
