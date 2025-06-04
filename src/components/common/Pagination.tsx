import { useState } from 'react';
import * as React from 'react';

type PropsType = {
  totalItemsCount: number;
  currentPage: number;
  onChangePageNumber: (pageNumber: number) => void;
  pageSize: number;
  portionOfPagesSize?: number;
};

const Pagination: React.FC<PropsType> = ({
  totalItemsCount,
  currentPage,
  onChangePageNumber,
  pageSize = 5,
  portionOfPagesSize = 3,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const currentPortionNumber = Math.ceil(currentPage / portionOfPagesSize) || 1;

  const portionsCount = pagesCount / portionOfPagesSize;
  const [portionNumber, setPortionNumber] = useState<number>(currentPortionNumber);
  const leftPortionPageNumber = (portionNumber - 1) * portionOfPagesSize + 1;
  const rightPortionPageNumber = portionNumber * portionOfPagesSize;

  return (
    <div className="text-sm md:text-base">
      {portionNumber > 1 && (
        <button
          className="px-1 font-bold text-yellow-300 hover:bg-yellow-600 cursor-pointer mx-1 border rounded-md"
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          Prev
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <button
              key={p}
              className={
                (currentPage === p ? 'text-yellow-400 border rounded-md font-bold' : 'text-white') +
                ' px-1 hover:text-yellow-400 cursor-pointer'
              }
              onClick={() => {
                onChangePageNumber(p);
              }}
            >
              {p}
            </button>
          );
        })}
      {portionNumber < portionsCount && (
        <button
          className="px-1 font-bold text-yellow-300 hover:bg-yellow-600 cursor-pointer mx-1 border rounded-md"
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
