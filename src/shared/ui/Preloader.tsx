import * as React from 'react';

export const Preloader: React.FC<{ preloader: string }> = ({ preloader }) => {
  return (
    <div className="flex h-2/3 items-center justify-center w-full p-2">
      <img src={preloader} alt="preloader" className="h-full object-contain" />
    </div>
  );
};
