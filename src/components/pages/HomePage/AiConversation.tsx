import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { askModel, ConversationItem, initialConversationItem } from '../../../api/aiApi.ts';
import { truncateArrayKeepFirst } from '../../../lib/utils/truncateArrayKeepFirst.ts';
import { uniqueId } from '../../../lib/utils/uniqueId.ts';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/vs2015.css';
import preloader from '../../../assets/preloaderGear.svg';
import { Preloader } from '../../common/Preloader.tsx';
import remarkGfm from 'remark-gfm'; // dark
// import 'highlight.js/styles/vs.css'; // light

export const AiConversation: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationItem[]>([
    initialConversationItem,
  ]);
  const [query, setQuery] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const lastConversationItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastConversationItem.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const onSubmit = async (prompt: string | undefined): Promise<void> => {
    setIsSending(true);
    const currentUserPrompt: ConversationItem = { role: 'user', content: prompt };
    const conversation: ConversationItem[] = [...conversationHistory, currentUserPrompt];

    const answer: string | null = await askModel(conversation);

    conversation.push({ role: 'assistant', content: answer });
    const trimmedConversation: ConversationItem[] = truncateArrayKeepFirst(conversation, 10);
    setConversationHistory(trimmedConversation);
    setQuery('');
    setIsSending(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      onSubmit(query.trim());
    }
  };

  const isSubmitDisabled = isSending || !query.trim();

  return (
    <div className="grid grid-cols-[2fr_1fr] h-full">
      <div className="border border-amber-500/50 p-2 overflow-y-auto">
        {conversationHistory.length > 1 ? (
          conversationHistory.map((item: ConversationItem, index: number) => {
            if (item.role === 'system') {
              return <></>;
            }

            const isLast = index === conversationHistory.length - 1;

            return (
              <div
                className="my-2 text-sm"
                key={uniqueId(conversationHistory)}
                ref={isLast ? lastConversationItem : null}
              >
                <p className="italic text-amber-500">{item.role}</p>
                <div className="pl-2">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
                    {item.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center m-3">Hello, my friend! how can I help you?</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-rows-[5fr_1fr] gap-2 p-2">
        <div className="relative">
          <textarea
            className="w-full h-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Type your message..."
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
          className={`px-4 py-2  rounded ${
            !isSubmitDisabled
              ? 'bg-amber-500/80 text-white hover:bg-amber-700/80 transition'
              : `bg-amber-500/50 text-gray-500`
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};
