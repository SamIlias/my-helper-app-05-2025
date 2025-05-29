import { useCallback, useEffect, useState } from 'react';
import { fetchQuote } from '../../../api/quotesApi.ts';
import '../../../index.css';
import * as React from 'react';
import { AiConversation } from './AiConversation.tsx';
import type { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

type Props = {
  user: User | null | undefined;
};

export const HomePage: React.FC<Props> = ({ user }) => {
  const [quote, setQuote] = useState<string | null>(null);
  const loadQuote = useCallback(async () => {
    const quote: string = await fetchQuote();
    setQuote(quote);
  }, []);

  useEffect(() => {
    let ignore = false;

    const startFetchingQuote = async () => {
      const quote: string = await fetchQuote();
      if (!ignore) {
        setQuote(quote);
      }
    };

    startFetchingQuote();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {user ? (
        <div className="grid grid-cols-14 grid-rows-16 h-full">
          <h1 className="text-shadow-md text-[2vw] col-span-14 col-start-1 row-span-2 row-start-1 text-amber-400 p-1 content-center text-center">
            Home
          </h1>

          <div className="col-span-12 col-start-2 row-span-10 row-start-3 ">
            <AiConversation />
          </div>

          <div className="col-span-12 col-start-2 row-start-13 flex flex-col content-center text-center text-xl ">
            <p className="italic text-amber-500">Quote for you:</p>
            <p className="text-center text-xl">{quote || 'loading...'}</p>
            <button
              className="border w-fit px-2 rounded-md hover:text-yellow-400 cursor-pointer mt-4"
              onClick={loadQuote}
            >
              Refresh
            </button>
          </div>
        </div>
      ) : (
        <Navigate to="/auth" replace={true} />
      )}
    </>
  );
};
