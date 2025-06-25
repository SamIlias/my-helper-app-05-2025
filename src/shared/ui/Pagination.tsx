import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buttonStyles } from '../myStyles/myStyles';

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
  const { t } = useTranslation('common');

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
    <div className="flex gap-1 text-sm md:text-base">
      {portionNumber > 1 && (
        <button
          className={`${buttonStyles.main}`}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          {t('pagination.prevBtnName')}
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <button
              key={p}
              className={
                (currentPage === p
                  ? `${buttonStyles.paginationActive}`
                  : `${buttonStyles.paginationPassive}`) + ' px-1'
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
          className={`${buttonStyles.main}`}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          {t('pagination.nextBtnName')}
        </button>
      )}
    </div>
  );
};

export default Pagination;
