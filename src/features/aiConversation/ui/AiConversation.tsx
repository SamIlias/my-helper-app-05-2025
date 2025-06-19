import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ConversationItem } from '@/shared/api/aiGPT/aiAPI';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/vs2015.css';
import preloader from '../../../assets/preloaderGear.svg';
import { Preloader } from '../../../components/common/Preloader.tsx';
import remarkGfm from 'remark-gfm';
import { User } from 'firebase/auth';
import { getNameFromEmail } from '../../../shared/lib/utils/stringHandler.ts';
import { useTranslation } from 'react-i18next';
import { myStyles } from '../../../myStyles/myStyles';
import { useAiConversation } from '../model/useAiConversation';
// import 'highlight.js/styles/vs.css'; // light

export const AiConversation: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const { conversationHistory, query, setQuery, isSending, onSubmit } = useAiConversation();

  const lastConversationItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastConversationItem.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  const isSubmitDisabled = isSending || !query.trim();

  return (
    <div className="grid grid-cols-1 grid-rows-[minmax(100px, auto)_auto] h-full md:grid-cols-[1fr_2fr] md:grid-rows-1 gap-2">
      <form
        onSubmit={handleSubmit}
        className="grid grid-rows-[3fr_1fr] md:grid-rows-[5fr_1fr] gap-2"
      >
        <div className="relative">
          <textarea
            className="w-full h-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder={t('aiConversation.form.textAreaPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isSending && (
            <div className="absolute top-0 left-0 w-full h-full bg-amber-800/40 backdrop-blur-sm flex items-center justify-center">
              <Preloader preloader={preloader} />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`rounded text-md md:text-xl md:font-bold ${
            !isSubmitDisabled
              ? 'bg-amber-500/80 text-white hover:bg-amber-700/80 transition'
              : `bg-amber-500/50 text-gray-500`
          }`}
        >
          {t('aiConversation.form.buttonTitle')}
        </button>
      </form>

      <main className="border border-amber-500/50 overflow-y-auto text-base md:text-lg">
        {conversationHistory.length > 1 ? (
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
                <p className={`italic ${myStyles.textColor.main}`}>{item.role}</p>
                <div className="pl-2 overflow-x-clip">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
                    {item.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center m-3">
            {t('aiConversation.greeting', { userName: getNameFromEmail(user.email) })}
          </p>
        )}
      </main>
    </div>
  );
};
