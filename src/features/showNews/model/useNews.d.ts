import { NewsItemType } from '../api/newsAPI';
export declare const useNews: () => {
    newsItems: NewsItemType[];
    totalItemsCount: number;
    isFetching: boolean;
    errorMessage: string | null;
    currentPage: number;
    onChangePageNumber: (page: number) => void;
    NEWS_ON_ONE_PAGE_COUNT: number;
    onSearchFormSubmit: (term: string) => void;
};
