import { borderColors, pageTitleStyle } from '../myStyles/myStyles';
import * as React from 'react';
import { ReactElement } from 'react';

type Props = { title: string; children: ReactElement | null };

export const PageHeader: React.FC<Props> = ({ title, children = null }) => {
  return (
    <header
      className={`border-b ${borderColors.primary} pb-2 w-full h-fit flex justify-between items-center`}
    >
      <h1 className={`${pageTitleStyle}`}>{title}</h1>
      {children}
    </header>
  );
};
