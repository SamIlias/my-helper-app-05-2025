import axios from 'axios';

const quotesApiUrl = 'https://api.api-ninjas.com/v1/quotes';

export const fetchQuotes = async (): Promise<QuoteType[]> => {
  try {
    return await axios
      .get<QuoteType[]>(quotesApiUrl, {
        headers: { 'X-Api-Key': import.meta.env.VITE_QUOTES_API_KEY },
      })
      .then((response) => response.data);
  } catch (error) {
    console.error('Could not fetch quote', error);
    throw error;
  }
};

export type QuoteType = { quote: string; author: string; category: string };

// const quotesApiUrl = 'https://api.kanye.rest/';
// const defaultQuote = "First of all, awareness... Try to fetch quote again!";
//
// export const fetchQuote = async (): Promise<string> => {
//   try {
//     return await axios.get<QuoteResponseType>(quotesApiUrl)
//       .then(response => response.data.quote);
//   } catch (error) {
//     console.error("Could not fetch quote", error);
//     return defaultQuote;
//   }
// }
//
// type QuoteResponseType = { quote: string };
