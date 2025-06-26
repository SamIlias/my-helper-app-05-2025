import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ConversationItem } from '@/shared/api';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import preloader from '@/shared/assets/preloaderGear.svg';
import { Preloader } from '@/shared/ui/Preloader.tsx';
import remarkGfm from 'remark-gfm';
import { User } from 'firebase/auth';
import { getNameFromEmail } from '@/shared/utils/stringHandler.ts';
import { useTranslation } from 'react-i18next';
import { useAiConversation } from '../model/useAiConversation';
import { textColors } from '@/shared/myStyles/myStyles';
// import 'highlight.js/styles/vs.css'; // light

export const AiConversation: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const { conversationHistory, query, setQuery, isSending, onSubmit } = useAiConversation();
  const lastConversationItem = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const isSubmitDisabled = isSending || !trimmedQuery;
  const isHistoryEmpty = conversationHistory.length === 0;

  useEffect(() => {
    lastConversationItem.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (trimmedQuery) {
      onSubmit(trimmedQuery);
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-[minmax(100px, auto)_auto] h-full md:grid-cols-[1fr_2fr] md:grid-rows-1 gap-2">
      <form
        onSubmit={handleSubmit}
        className="grid grid-rows-[3fr_1fr] md:grid-rows-[5fr_1fr] gap-2"
      >
        <div className="relative">
          {isSending ? (
            <div className="absolute top-0 left-0 w-full h-full bg-amber-900/10 backdrop-blur-lg flex items-center justify-center">
              <Preloader preloader={preloader} />
            </div>
          ) : (
            <textarea
              className={`${textColors.main} w-full h-full p-2 border border-stone-500 rounded resize-none focus:outline-none focus:ring-2 focus:ring-amber-400`}
              placeholder={t('aiConversation.form.textAreaPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`rounded text-md md:text-xl md:font-bold cursor-pointer ${
            !isSubmitDisabled
              ? 'bg-amber-500/80 text-stone-800 hover:bg-amber-700/80 transition'
              : `bg-stone-900/20 text-gray-500`
          }`}
        >
          {t('aiConversation.form.buttonTitle')}
        </button>
      </form>

      <main
        className={`${textColors.main} bg-radial from-orange-50 to-stone-200 dark:from-orange-300/10 dark:to-stone-900/10 border border-stone-500/50 rounded overflow-y-auto text-base md:text-lg`}
      >
        {isHistoryEmpty ? (
          <p className="text-center m-3">
            {t('aiConversation.greeting', { userName: getNameFromEmail(user.email) })}
          </p>
        ) : (
          conversationHistory.map((item: ConversationItem, index: number) => {
            if (item.role === 'system') {
              return <></>;
            }
            const isLast = index === conversationHistory.length - 1;
            return (
              <div
                className="my-2 text-sm"
                key={item.id}
                ref={isLast ? lastConversationItem : null}
              >
                <p className={`italic ${textColors.secondary} ml-2`}>{item.role}</p>
                <div className={`ml-6 overflow-x-clip ${textColors.main} `}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
                    {item.content}
                  </ReactMarkdown>
                </div>
                <hr className={`text-stone-400 border-dashed m-2`} />
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};
