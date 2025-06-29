import { ConversationItem } from '@/shared/api';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';
import { Ref } from 'react';
import { textColors } from '../../../shared/myStyles/myStyles';

type Props = {
  userName: string;
  isConversationStarted: boolean;
  lastConversationItem: Ref<HTMLDivElement> | undefined;
  conversationHistory: ConversationItem[];
};

export const ConversationHistoryBlock: React.FC<Props> = ({
  isConversationStarted,
  lastConversationItem,
  userName,
  conversationHistory,
}) => {
  const { t } = useTranslation();

  if (!isConversationStarted)
    return (
      <p className="text-center m-3">{t('aiConversation.greeting', { userName: userName })}</p>
    );

  return conversationHistory.map((item: ConversationItem, index: number) => {
    if (item.role === 'system') return <></>;

    const isLast = index === conversationHistory.length - 1;

    return (
      <div className="my-2 text-sm" key={item.id} ref={isLast ? lastConversationItem : null}>
        <p className={`font-display italic ${textColors.secondary} ml-2`}>{item.role}</p>
        <div className={`ml-6 overflow-x-clip ${textColors.main} `}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>{item.content}</ReactMarkdown>
        </div>
        <hr className={`text-stone-400 border-dashed m-2`} />
      </div>
    );
  });
};
