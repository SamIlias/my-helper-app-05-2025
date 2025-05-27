import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
  title: string;
};

export const MainLinkButton: React.FC<Props> = ({ path, title }) => {
  return (
    <Link
      to={path}
      className="text-amber-400 border rounded-md p-1 border-solid border-amber-700  bg-gray-700/50 hover:bg-yellow-400 hover:text-amber-900 "
    >
      {title}
    </Link>
  );
};
