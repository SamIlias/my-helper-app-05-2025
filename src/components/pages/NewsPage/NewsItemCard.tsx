import * as React from 'react';
import { NewsItemType } from '../../../api/newsApi.ts';
import { useState } from 'react';

export const NewsItemCard: React.FC<NewsItemType> = ({ title, link, summary, published }) => {
  const [isShow, setIsShow] = useState(false);

  const onClick = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="text-md border border-solid rounded-lg m-2 p-1 border-green-800">
      <p className="text-white">{title}</p>
      {!isShow && (
        <button className="text-yellow-400 hover:text-amber-700" onClick={onClick}>
          Show more
        </button>
      )}
      {isShow && (
        <div className="absolute top-0 right-0 h-full w-full bg-lime-700/80 backdrop-blur-xl z-10 content-center overflow-auto">
          <button
            className="absolute top-1 right-3 border rounded-sm px-1 text-yellow-400 hover:bg-orange-800"
            onClick={onClick}
          >
            Close
          </button>
          <p className="p-10 text-xl text-green-100">{summary}</p>
          <a href={link} target={'_blank'} className="text-amber-950">
            {link}
          </a>
          <p className="text-xs  text-yellow-300">{published}</p>
        </div>
      )}
    </div>
  );
};
