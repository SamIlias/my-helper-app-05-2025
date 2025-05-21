import { useCallback, useEffect, useState } from 'react';
import { fetchQuote } from '../../api/quotesApi.ts';
import '../../index.css';
import * as React from 'react';

export const HomePage: React.FC = () => {
  const [quote, setQuote] = useState<string | null>(null);

  const loadQuote = useCallback(async () => {
    const quote: string = await fetchQuote();
    setQuote(quote);
  }, []);

  useEffect(() => {
    let ignore = false;

    const startFetchingQuote = async () => {
      const quote: string = await fetchQuote();
      if (!ignore) {
        console.log('Quote is setting');
        setQuote(quote);
      }
    };

    startFetchingQuote();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="grid grid-cols-14 grid-rows-7 h-full">
      <h1 className="text-shadow-md text-[2vw] col-span-14 col-start-1 row-span-2 row-start-1 text-amber-400 p-1 content-center text-center">
        Hello, my friend! how can I help you?
      </h1>

      <div className="col-span-12 col-start-2 row-span-3 row-start-3 content-center">
        <p className="text-center text-xl italic">{quote || 'loading...'}</p>
      </div>

      <button
        className="col-span-2 col-start-7 row-span-1 row-start-6 hover:text-yellow-400 m-2 cursor-pointer"
        onClick={loadQuote}
      >
        Refresh
      </button>
    </div>
  );
};
