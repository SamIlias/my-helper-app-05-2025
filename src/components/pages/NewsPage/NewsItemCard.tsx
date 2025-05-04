import * as React from 'react';
import { NewsItemType } from '../../../api/newsApi.ts';

export const NewsItemCard: React.FC<NewsItemType> = ({ title, link, summary, published }) => {
  return (
    <div>
      <p className="text-amber-900">{title}</p>
      <p className="text-cyan-950">{summary}</p>
      <a href={link} target={'_blank'} className="text-blue-600">
        {link}
      </a>
      <p className="text-gray-700">{published}</p>
    </div>
  );
};
