import './App.css'
import QuotesCard from "./components/cards/QutesCard.tsx";
import {Route, Routes} from "react-router-dom";
import NewsCard from "./components/cards/NewsCard.tsx";
import WeatherCard from "./components/cards/WeatherCard.tsx";
import MainNav from "./components/MainNav.tsx";

function App() {
    const cardNames = {
        quotes: "quotes",
        news: "news",
        weather: "weather",
    }

    const navList: string[] = [cardNames.quotes, cardNames.news, cardNames.weather];
    return (
        <>
            <div>
                <MainNav list={navList}/>
            </div>
            <div>
                <Routes>
                    <Route path={`/${cardNames.quotes}`} element={<QuotesCard/>}/>
                    <Route path={`/${cardNames.news}`} element={<NewsCard/>}/>
                    <Route path={`/${cardNames.weather}`} element={<WeatherCard/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App

