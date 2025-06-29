import { useEffect, useState } from 'react';
import { fetchQuotes, QuoteType } from '../api/quotesAPI';
import { getTranslation } from '@/shared/api';
import { useTranslation } from 'react-i18next';
import * as React from 'react';

export function useQuote() {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const setTranslatedQuote = async (quoteObj: QuoteType) => {
    const currentLanguage = i18n.language;
    if (currentLanguage === 'en') {
      setQuote(quoteObj);
    }

    const translatedQuote = await getTranslation<QuoteType>(quoteObj, currentLanguage);
    setQuote(translatedQuote);
  };

  const loadQuote = async () => {
    setIsLoading(true);
    const quotes: QuoteType[] = await fetchQuotes();

    await setTranslatedQuote(quotes[0]);
    setIsLoading(false);
  };

  const hasLoaded = React.useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;

    hasLoaded.current = true;
    loadQuote();
  }, []);

  return { quote, loadQuote, isLoading };
}
