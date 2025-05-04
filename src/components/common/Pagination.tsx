import { useState } from 'react';
import * as React from 'react';

type PropsType = {
  totalItemsCount: number;
  currentPage: number;
  onChangePageNumber: (pageNumber: number) => void;
  pageSize: number;
  portionSize?: number;
};

const Pagination: React.FC<PropsType> = ({
  totalItemsCount,
  currentPage,
  onChangePageNumber,
  pageSize = 5,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const currentPortionNumber = Math.ceil(currentPage / portionSize) || 1;

  const portionsCount = pagesCount / portionSize;
  const [portionNumber, setPortionNumber] = useState<number>(currentPortionNumber);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span
              key={p}
              className={currentPage === p ? 'text-amber-600' : 'text-blue-600'}
              onClick={() => {
                onChangePageNumber(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionNumber < portionsCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
