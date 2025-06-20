import { myStyles } from '../myStyles/myStyles';
import * as React from 'react';

export const PageTitle: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
  return <h1 className={myStyles.pageTitle}>{pageTitle}</h1>;
};
