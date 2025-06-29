import * as React from 'react';
import { NewsItemType } from '../api/newsAPI.ts';
import { useState } from 'react';
import { borderColors, buttonStyles, textColors } from '@/shared/myStyles/myStyles';

export const NewsItem: React.FC<NewsItemType> = ({
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
    <div
      className={`grid gap-2 grid-rows-[auto_1fr] md:grid-cols-2 border border-solid rounded-lg m-2 p-1 ${borderColors.primary}`}
    >
      <div className="place-self-center">
        <img className="rounded-lg" src={image} alt={title} />
      </div>
      <div className="md:text-md lg:text-md xl:text-xl">
        <p className={`font-bold ${textColors.main}`}>{title}</p>
        <p className={`text-justify ${textColors.secondary}`}>{description}</p>
        {!isShow && (
          <button
            className="text-stone-600 dark:text-stone-400 hover:text-amber-700 cursor-pointer"
            onClick={onClick}
          >
            Show more
          </button>
        )}
      </div>

      {isShow && (
        <div className="flex flex-col p-3 md:p-6 lg:p-10 text-justify text-base md:text-md lg:text-xl absolute top-0 right-0 h-full w-full bg-radial from-orange-50 to-stone-200 dark:from-stone-600 dark:to-stone-700 z-10 content-center overflow-auto">
          <p className={`mb-7 ${textColors.main}`}>{content}</p>
          <p className={`${textColors.main}`}>{source.name}</p>
          <a href={url} target={'_blank'} className={`${textColors.link}`}>
            {url}
          </a>
          <p className={`mt-2 text-right text-xs md:text-base ${textColors.main}`}>{publishedAt}</p>
          <button className={`${buttonStyles.close}`} onClick={onClick}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
