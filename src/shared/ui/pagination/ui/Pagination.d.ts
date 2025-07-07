import * as React from 'react';
type PropsType = {
    totalItemsCount: number;
    currentPage: number;
    onChangePageNumber: (pageNumber: number) => void;
    itemsOnOnePageCount: number;
    portionOfPagesSize?: number;
};
export declare const Pagination: React.FC<PropsType>;
export {};
