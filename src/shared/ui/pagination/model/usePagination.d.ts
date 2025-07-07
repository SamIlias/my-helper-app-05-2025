export declare const usePagination: (currentPage: number, totalItemsCount: number, itemsOnOnePageCount: number, portionOfPagesSize?: number | undefined) => {
    currentPortionOfPages: number;
    pages: number[];
    portionsCount: number;
    onPrevClick: () => void;
    onNextClick: () => void;
};
