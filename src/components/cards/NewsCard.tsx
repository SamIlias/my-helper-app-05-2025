import {useCallback, useEffect, useState} from 'react'
import {fetchQuote} from "../../api/quotesApi.ts";

const NewsCard = () => {
    const [quote, setQuote] = useState<string | null>(null);

    const loadQuote = useCallback(async () => {
        const quote: string = await fetchQuote();
        setQuote(quote);
    }, [])

    useEffect(() => {
        let ignore = false;

        const startFetchingQuote = async () => {
            const quote: string = await fetchQuote();
            if (!ignore) {
                console.log("Quote is setting")
                setQuote(quote);
            }
        }

        startFetchingQuote()

        return () => {
            ignore = true;
        }
    }, [])

    return (
        <div className="card">
            <div className="quote">
                {quote}
            </div>
            <div>
                <button className="button" onClick={loadQuote}>Refresh</button>
            </div>
        </div>
    )
}

export default NewsCard;