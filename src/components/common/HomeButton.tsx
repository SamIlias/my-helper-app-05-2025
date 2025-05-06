import * as React from 'react';
import { Link } from 'react-router-dom';

export const HomeButton: React.FC = () => {
  return (
    <Link
      to="/"
      className="text-amber-400 border rounded-md p-1 border-solid border-amber-700 bg-gray-700/50"
    >
      Home
    </Link>
  );
};
