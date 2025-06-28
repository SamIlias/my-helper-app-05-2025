import { useState } from 'react';
import * as React from 'react';

export const useSearchForm = (onSubmit: (value: string) => void) => {
  const [query, setQuery] = useState('');
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      onSubmit(query.trim());
    }
  };

  return { handleSubmit, setQuery };
};
