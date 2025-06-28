import { useState } from 'react';
const DEFAULT_PAGES_PORTION_SIZE = 3;

export const usePagination = (
  currentPage: number,
  totalItemsCount: number,
  itemsOnOnePageCount: number,
  portionOfPagesSize: number | undefined = DEFAULT_PAGES_PORTION_SIZE,
) => {
  const pagesCount = Math.ceil(totalItemsCount / itemsOnOnePageCount);
  const rawPages = [];
  for (let i = 1; i <= pagesCount; i += 1) {
    rawPages.push(i);
  }

  const [currentPortionOfPages, setPortionNumber] = useState<number>(
    Math.ceil(currentPage / portionOfPagesSize),
  );

  const portionsCount = pagesCount / portionOfPagesSize;
  const leftPortionPageNumber = (currentPortionOfPages - 1) * portionOfPagesSize + 1;
  const rightPortionPageNumber = currentPortionOfPages * portionOfPagesSize;

  const pages = rawPages.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber);
  const onPrevClick = () => setPortionNumber(currentPortionOfPages - 1);
  const onNextClick = () => setPortionNumber(currentPortionOfPages + 1);

  return {
    currentPortionOfPages,
    pages,
    portionsCount,
    onPrevClick,
    onNextClick,
  };
};
