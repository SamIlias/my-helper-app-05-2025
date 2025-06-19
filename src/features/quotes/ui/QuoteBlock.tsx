import { useEffect } from 'react';
import * as React from 'react';
import { Preloader } from '../../../components/common/Preloader.tsx';
import preloader from '../../../assets/preloaderBook.svg';
import { useTranslation } from 'react-i18next';
import { useQuote } from '../model/useQuote';

export const QuoteBlock: React.FC = () => {
  const { t } = useTranslation('homepage');
  const { quote, loadQuote, isLoading } = useQuote();
  const hasLoaded = React.useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadQuote();
  }, []);

  return (
    <main className="flex flex-col text-center h-30">
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
    </main>
  );
};
