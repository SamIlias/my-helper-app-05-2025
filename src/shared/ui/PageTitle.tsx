import * as React from 'react';
import { pageTitleStyle } from '../myStyles/myStyles';

export const PageTitle: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
  return <h1 className={pageTitleStyle}>{pageTitle}</h1>;
};
