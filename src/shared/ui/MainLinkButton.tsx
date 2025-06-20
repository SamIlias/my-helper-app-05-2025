import * as React from 'react';
import { Link } from 'react-router-dom';
import { myStyles } from '../myStyles/myStyles.ts';

type Props = {
  path: string;
  title: string;
};

export const MainLinkButton: React.FC<Props> = ({ path, title }) => {
  return (
    <Link to={path} className={`${myStyles.button.main}`}>
      {title}
    </Link>
  );
};
