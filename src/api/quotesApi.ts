import axios from "axios";

const quotesApiUrl = 'https://api.kanye.rest/';
const defaultQuote = "First of all, awareness... Try to fetch quote again!";

export const fetchQuote = async (): Promise<string> => {
    try {
        return await axios.get<QuoteResponseType>(quotesApiUrl)
            .then(response => response.data.quote);
    } catch (error) {
        console.error("Could not fetch quote", error);
        return defaultQuote;
    }
}

type QuoteResponseType = { quote: string };
