import * as React from 'react';

export const Preloader: React.FC<{ preloader: string }> = ({ preloader }) => {
  return (
    <div className="max-h-[26px]">
      <img src={preloader} alt="preloader" className="h-full object-contain" />
    </div>
  );
};
