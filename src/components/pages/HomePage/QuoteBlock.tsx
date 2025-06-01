import { useEffect, useState } from 'react';
import { fetchQuotes, QuoteType } from '../../../api/quotesApi.ts';
import * as React from 'react';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderBook.svg';

export const QuoteBlock: React.FC = () => {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadQuote = async () => {
    setIsLoading(true);
    const quotes: QuoteType[] = await fetchQuotes();
    setQuote(quotes[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);
    const startFetchingQuotes = async () => {
      const quotes: QuoteType[] = await fetchQuotes();
      if (!ignore) {
        setQuote(quotes[0]);
      }
    };

    startFetchingQuotes();
    setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex flex-col content-center text-center text-xl">
      <p className="italic text-amber-500">Quote for you:</p>
      {quote ? (
        <p className="text-center text-xl italic">{`"${quote.quote}" - ${quote.author}`}</p>
      ) : (
        <p className="text-center text-xl">{'loading...'}</p>
      )}

      <div className="flex between gap-2 h-1/2">
        <button
          className="border w-fit h-1/2 px-2 rounded-md hover:text-yellow-400 cursor-pointer mt-4"
          onClick={loadQuote}
        >
          Refresh
        </button>
        <span>{isLoading && <Preloader preloader={preloader} />}</span>
      </div>
    </div>
  );
};
