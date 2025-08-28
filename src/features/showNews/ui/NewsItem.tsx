import * as React from 'react';
import { useState } from 'react';
import { NewsItemType } from '../api/newsAPI';
import { borderColors, textColors } from '@/shared/myStyles/myStyles';
import { CloseButton } from '@/shared/ui/CloseButton';
import { useTranslation } from 'react-i18next';

export const NewsItem: React.FC<NewsItemType> = ({
  title,
  description,
  content,
  source,
  urlToImage,
  url,
  publishedAt,
}) => {
  const [isShow, setIsShow] = useState(false);
  const toggleIsShow = () => {
    setIsShow(!isShow);
  };

  const { t } = useTranslation();

  return (
    <div
      className={`grid content-start justify-items-center gap-2 border border-solid rounded-lg p-1 ${borderColors.primary}`}
    >
      <div className="">
        <img className="rounded-lg" src={urlToImage || undefined} alt={urlToImage || undefined} />
      </div>
      <div className="text-sm ">
        <p className={`font-bold ${textColors.main}`}>{title}</p>
        <p className={`text-justify ${textColors.secondary}`}>{description}</p>
        {!isShow && (
          <button
            className="text-stone-600 dark:text-stone-400 hover:text-amber-700 cursor-pointer"
            onClick={toggleIsShow}
          >
            {t('news.showMoreButton', { ns: 'assistantPage' })}
          </button>
        )}
      </div>

      {isShow && (
        <div className="flex flex-col p-3 text-justify text-md absolute top-0 right-0 h-full w-full bg-radial from-orange-50 to-stone-200 dark:from-stone-600 dark:to-stone-700 z-10 content-center overflow-auto">
          <p className={`mb-7 ${textColors.main}`}>{content}</p>
          <p className={`${textColors.main}`}>{source.name}</p>
          <a href={url} target={'_blank'} className={`${textColors.link}`}>
            {url}
          </a>
          <p className={`mt-2 text-right text-xs md:text-base ${textColors.main}`}>{publishedAt}</p>
          <CloseButton onClick={toggleIsShow} title={t('closeButtonTitle', { ns: 'common' })} />
        </div>
      )}
    </div>
  );
};
