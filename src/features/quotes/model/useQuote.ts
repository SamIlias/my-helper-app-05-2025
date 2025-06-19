import { useState } from 'react';
import { fetchQuotes, QuoteType } from '../api/quotesAPI';
import { getTranslation } from '../../../shared/api/translator/translatorAPI';
import { useTranslation } from 'react-i18next';

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

  return { quote, loadQuote, isLoading };
}
