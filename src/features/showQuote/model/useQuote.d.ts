import { QuoteType } from '../api/quotesAPI';
export declare function useQuote(): {
    quote: QuoteType | null;
    loadQuote: () => Promise<void>;
    isLoading: boolean;
};
