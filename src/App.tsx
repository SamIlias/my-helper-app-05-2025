import './App.css';
import QuotesCard from './components/pages/QuotesPage.tsx';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './components/pages/NewsPage/NewsPage.tsx';
import WeatherPage from './components/pages/WeatherPage.tsx';
import MainNav from './components/MainNav.tsx';

function App() {
  const cardNames = {
    quotes: 'quotes',
    news: 'news',
    weather: 'weather',
  };

  const navList: string[] = [cardNames.quotes, cardNames.news, cardNames.weather];
  return (
    <>
      <div>
        <MainNav list={navList} />
      </div>
      <div>
        <Routes>
          <Route path={`/${cardNames.quotes}`} element={<QuotesCard />} />
          <Route path={`/${cardNames.news}`} element={<NewsPage />} />
          <Route path={`/${cardNames.weather}`} element={<WeatherPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
