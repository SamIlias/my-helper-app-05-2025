import * as React from 'react';
import { NewsItemType } from '../../../api/newsApi.ts';
import { useState } from 'react';

export const NewsItemCard: React.FC<NewsItemType> = ({
  title,
  description,
  content,
  source,
  image,
  url,
  publishedAt,
}) => {
  const [isShow, setIsShow] = useState(false);

  const onClick = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="border border-solid rounded-lg m-2 p-1 border-green-800">
      <p className="text-white">{title}</p>
      <p className="text-gray-200">{description}</p>
      <img className="rounded-lg h-1/3 w-1/3" src={image} alt={title} />
      {!isShow && (
        <button className="text-yellow-400 hover:text-amber-700 cursor-pointer" onClick={onClick}>
          Show more
        </button>
      )}
      {isShow && (
        <div className="absolute top-0 right-0 h-full w-full bg-lime-700/80 backdrop-blur-xl z-10 content-center overflow-auto">
          <button
            className="absolute top-1 right-3 border rounded-sm px-1 text-yellow-400 hover:bg-orange-800 cursor-pointer"
            onClick={onClick}
          >
            Close
          </button>
          <p className="p-10 text-xl text-green-100">{content}</p>
          <p className="text-gray-200">{source.name}</p>
          <a href={url} target={'_blank'} className="text-amber-950">
            {url}
          </a>
          <p className="text-xs  text-yellow-300">{publishedAt}</p>
        </div>
      )}
    </div>
  );
};
