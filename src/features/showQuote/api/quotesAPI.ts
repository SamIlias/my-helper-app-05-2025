export const fetchRandomQuote = async () => {
  try {
    const response = await fetch('/.netlify/functions/fetchQuote');
    const data = await response.json();
    return data.quotes[0];
  } catch (error) {
    console.error('Fetching Quotes error:', error);
    return null;
  }
};

export type { QuoteType } from '../../../../netlify/functions/fetchQuote';

// Premium subscription
// export const fetchQuoteByCategory = async (category: string) => {
//   try {
//     const response = await fetch(`/.netlify/functions/fetchQuote?category=${category}`);
//     const data = await response.json();
//     return data.Quotes[0];
//   } catch (error) {
//     console.error('Fetching Quotes error:', error);
//     return null;
//   }
// };
//
// export const fetchMultipleQuotes = async (limit = 5, category = null) => {
//   try {
//     const url = `/.netlify/functions/fetchQuote?limit=${limit}${category ? `&category=${category}` : ''}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.Quotes;
//   } catch (error) {
//     console.error('Fetching Quotes error:', error);
//     return [];
//   }
// };
