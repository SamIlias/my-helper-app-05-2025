import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchForm } from '../model/useSearchForm';

type PropsType = {
  onSubmit: (value: string) => void;
  placeholder: string;
};

export const SearchForm: React.FC<PropsType> = ({ onSubmit, placeholder }) => {
  const { t } = useTranslation('common');
  const { handleSubmit, setQuery } = useSearchForm(onSubmit);

  return (
    <form
      className="sm:max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-[3vw] h-[3vw] md:w-[2vw] md:h-[2vw] lg:w-[1vw] lg:h-[1vw] text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
        <button
          type="submit"
          className="text-amber-400 dark:text-white absolute end-2.5 bottom-2.5 bg-stone-600 dark:bg-stone-500 hover:bg-amber-500 hover:text-amber-900 rounded-lg text-sm px-4 py-2 "
        >
          {t('searchForm.buttonName')}
        </button>
      </div>
    </form>
  );
};
