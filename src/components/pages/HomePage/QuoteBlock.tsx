import { useEffect, useState } from 'react';
import { fetchQuotes, QuoteType } from '../../../api/quotesApi.ts';
import * as React from 'react';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderBook.svg';
import { useTranslation } from 'react-i18next';

export const QuoteBlock: React.FC = () => {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation('homepage');

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
    <div className="flex flex-col text-center h-30">
      <h2 className="italic text-amber-500 text-base">{t('quoteBlock.title')}</h2>
      {quote ? (
        <div className="text-center text-sm italic overflow-y-auto ">{`"${quote.quote}" - ${quote.author}`}</div>
      ) : (
        <p className="text-center text-base">{'loading...'}</p>
      )}

      <div className="flex gap-2 m-2">
        <button
          className="border w-fit h-fit px-2 rounded-md hover:text-yellow-400 cursor-pointer"
          onClick={loadQuote}
        >
          {t('quoteBlock.refreshButtonTitle')}
        </button>
        {isLoading && <Preloader preloader={preloader} />}
      </div>
    </div>
  );
};
