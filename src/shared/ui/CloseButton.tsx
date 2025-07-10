import * as React from 'react';

type Props = {
  onClick: () => void;
  title: string;
};

export const CloseButton: React.FC<Props> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 w-fit text-sm  text-amber-400 bg-stone-600 dark:bg-stone-500 cursor-pointer rounded hover:bg-amber-700"
    >
      {title}
    </button>
  );
};
