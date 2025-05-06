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
    <div className="grid grid-cols-14 grid-rows-7 border h-full">
      <h1 className="col-span-14 col-start-1 row-span-2 row-start-1 content-center text-orange-600 p-1 text-center">
        Hello, my friend! How can I help you?
      </h1>

      <div className="col-span-12 col-start-2 row-span-3 row-start-3 border border-gray-300">
        <p className="text-center">{quote || 'loading...'}</p>
      </div>

      <button className="col-span-4 col-start-2 row-span-2 row-start-6" onClick={loadQuote}>
        Refresh
      </button>
    </div>
  );
};
