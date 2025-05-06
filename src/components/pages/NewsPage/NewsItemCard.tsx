import * as React from 'react';
import { NewsItemType } from '../../../api/newsApi.ts';
import { useState } from 'react';

export const NewsItemCard: React.FC<NewsItemType> = ({ title, link, summary, published }) => {
  const [isShow, setIsShow] = useState(false);

  const onClick = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="border border-solid rounded-lg m-2 p-1 border-green-800">
      <p className="text-amber-900">{title}</p>
      {!isShow && (
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2"
          onClick={onClick}
        >
          Show more
        </button>
      )}
      {isShow && (
        <div>
          <button className="btn btn-primary" onClick={onClick}>
            Show less
          </button>
          <p className="text-justify text-cyan-950">{summary}</p>
          <a href={link} target={'_blank'} className="text-blue-600">
            {link}
          </a>
          <p className="text-xs  text-gray-700">{published}</p>
        </div>
      )}
    </div>
  );
};
