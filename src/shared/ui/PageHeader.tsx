import { borderColors, pageTitleStyle } from '../myStyles/myStyles';
import * as React from 'react';
import { ReactElement } from 'react';

export const PageHeader: React.FC<{ title: string; children: ReactElement | null }> = ({
  title,
  children = null,
}) => {
  return (
    <header
      className={`border-b ${borderColors.primary} pb-2 w-full flex justify-between items-center`}
    >
      <h1 className={`${pageTitleStyle}`}>{title}</h1>
      {children}
    </header>
  );
};
