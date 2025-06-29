import * as React from 'react';
import { Preloader } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderBook.svg';
import { useTranslation } from 'react-i18next';
import { useQuote } from '../model/useQuote';
import { buttonStyles, textColors } from '@/shared/myStyles/myStyles';

export const QuoteBlock: React.FC = () => {
  const { t } = useTranslation('homepage');
  const { quote, loadQuote, isLoading } = useQuote();

  return (
    <main className="flex flex-col text-center h-30">
      <h2 className={` ${textColors.main} text-base`}>{t('quoteBlock.title')}</h2>
      {quote ? (
        <div
          className={`${textColors.secondary} font-display text-center text-sm italic overflow-y-auto`}
        >{`"${quote.quote}" - ${quote.author}`}</div>
      ) : (
        <p className="text-center text-base">{'loading...'}</p>
      )}

      <div className="flex gap-2 m-2">
        <button className={`${buttonStyles.main}`} onClick={loadQuote}>
          {t('quoteBlock.refreshButtonTitle')}
        </button>
        {isLoading && <Preloader preloader={preloader} />}
      </div>
    </main>
  );
};
