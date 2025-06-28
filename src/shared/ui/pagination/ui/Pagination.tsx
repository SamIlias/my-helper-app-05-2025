import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { buttonStyles } from '@/shared/myStyles/myStyles';
import { usePagination } from '../model/usePagination';

type PropsType = {
  totalItemsCount: number;
  currentPage: number;
  onChangePageNumber: (pageNumber: number) => void;
  itemsOnOnePageCount: number;
  portionOfPagesSize?: number;
};

export const Pagination: React.FC<PropsType> = ({
  totalItemsCount,
  currentPage,
  onChangePageNumber,
  itemsOnOnePageCount,
  portionOfPagesSize,
}) => {
  const { t } = useTranslation('common');
  const { currentPortionOfPages, pages, portionsCount, onPrevClick, onNextClick } = usePagination(
    currentPage,
    totalItemsCount,
    itemsOnOnePageCount,
    portionOfPagesSize,
  );

  return (
    <div className="flex gap-1 text-sm md:text-base">
      {currentPortionOfPages > 1 && (
        <button className={`${buttonStyles.main}`} onClick={onPrevClick}>
          {t('pagination.prevBtnName')}
        </button>
      )}
      {pages.map((p) => {
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
      {currentPortionOfPages < portionsCount && (
        <button className={`${buttonStyles.main}`} onClick={onNextClick}>
          {t('pagination.nextBtnName')}
        </button>
      )}
    </div>
  );
};
