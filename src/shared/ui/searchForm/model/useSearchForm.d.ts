import * as React from 'react';
export declare const useSearchForm: (onSubmit: (value: string) => void) => {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};
