import * as React from 'react';
import { Link } from 'react-router-dom';
import { buttonStyles } from '../myStyles/myStyles';

type Props = {
  path: string;
  title: string;
};

export const MainLinkButton: React.FC<Props> = ({ path, title }) => {
  return (
    <Link to={path} className={`${buttonStyles.main} py-1`}>
      {title}
    </Link>
  );
};
