import * as React from 'react';

export const Preloader: React.FC<{ preloader: string }> = ({ preloader }) => {
  return (
    <div>
      <img src={preloader} alt="preloader" />
    </div>
  );
};
