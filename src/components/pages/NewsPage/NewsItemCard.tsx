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
    <div className="grid gap-2 grid-rows-[auto_1fr] md:grid-cols-2 border border-solid rounded-lg m-2 p-1 border-green-800">
      <div className="place-self-center">
        <img className="rounded-lg" src={image} alt={title} />
      </div>
      <div className="md:text-md lg:text-md xl:text-xl">
        <p className="font-bold text-amber-950">{title}</p>
        <p className="text-justify text-gray-200">{description}</p>
        {!isShow && (
          <button className="text-yellow-400 hover:text-amber-700 cursor-pointer" onClick={onClick}>
            Show more
          </button>
        )}
      </div>

      {isShow && (
        <div className=" flex flex-col  p-3 md:p-6 lg:p-10 text-justify text-base md:text-md lg:text-xl absolute top-0 right-0 h-full w-full bg-lime-700/80 backdrop-blur-xl z-10 content-center overflow-auto">
          <p className="mb-7 text-green-100">{content}</p>
          <p className="text-gray-200">{source.name}</p>
          <a href={url} target={'_blank'} className="text-amber-950 break-all">
            {url}
          </a>
          <p className="mt-2 text-right text-xs md:text-base text-yellow-300 te">{publishedAt}</p>
          <button
            className="border place-self-center rounded-sm px-1 mt-4 text-yellow-400 hover:bg-orange-800 cursor-pointer"
            onClick={onClick}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
