import * as React from 'react';
import { NewsItemType } from '../../../api/newsAPI.ts';
import { useState } from 'react';
import { myStyles } from '../../../myStyles/myStyles';

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
        <p className={`font-bold ${myStyles.textColor.main}`}>{title}</p>
        <p className={`text-justify ${myStyles.textColor.newsContent}`}>{description}</p>
        {!isShow && (
          <button className="text-yellow-400 hover:text-amber-700 cursor-pointer" onClick={onClick}>
            Show more
          </button>
        )}
      </div>
      0
      {isShow && (
        <div className=" flex flex-col  p-3 md:p-6 lg:p-10 text-justify text-base md:text-md lg:text-xl absolute top-0 right-0 h-full w-full bg-gray-700/50 backdrop-blur-xl z-10 content-center overflow-auto">
          <p className={`mb-7 ${myStyles.textColor.newsContent}`}>{content}</p>
          <p className={`${myStyles.textColor.newsContent}`}>{source.name}</p>
          <a href={url} target={'_blank'} className={`${myStyles.textColor.newsLink}`}>
            {url}
          </a>
          <p className={`mt-2 text-right text-xs md:text-base ${myStyles.textColor.main}`}>
            {publishedAt}
          </p>
          <button className={`${myStyles.button.close}`} onClick={onClick}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
