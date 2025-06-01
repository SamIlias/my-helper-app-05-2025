import '../../../index.css';
import * as React from 'react';
import { AiConversation } from './AiConversation.tsx';
import type { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { QuoteBlock } from './QuoteBlock.tsx';

type Props = {
  user: User | null | undefined;
};

export const HomePage: React.FC<Props> = ({ user }) => {
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

          <div className="col-span-12 col-start-2 row-start-13">
            <QuoteBlock />
          </div>
        </div>
      ) : (
        <Navigate to="/auth" replace={true} />
      )}
    </>
  );
};
