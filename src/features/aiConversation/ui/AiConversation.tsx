import * as React from 'react';
import { getNameFromEmail } from '@/shared/utils/stringHandler';
import { useAiConversation } from '../model/useAiConversation';
import { textColors } from '@/shared/myStyles/myStyles';
import { PromptForm } from './PromptForm';
import { ConversationHistoryBlock } from './ConversationHistoryBlock';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
// import 'highlight.js/styles/vs.css'; // light

export const AiConversation: React.FC = () => {
  const {
    conversationHistory,
    query,
    isSending,
    isSubmitDisabled,
    isConversationStarted,
    handleSubmit,
    lastConversationItem,
    onPromptChange,
  } = useAiConversation();

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="grid grid-cols-1 grid-rows-[minmax(100px, auto)_auto] h-full md:grid-cols-[1fr_2fr] md:grid-rows-1 gap-2">
      <PromptForm
        handleSubmit={handleSubmit}
        isSending={isSending}
        isSubmitDisabled={isSubmitDisabled}
        query={query}
        onPromptChange={onPromptChange}
      />
      <main
        className={`${textColors.main} bg-radial from-orange-50 to-stone-200 dark:from-orange-300/10 dark:to-stone-900/10 border border-stone-500/50 rounded overflow-y-auto text-base md:text-lg`}
      >
        <ConversationHistoryBlock
          userName={getNameFromEmail(user!.email)}
          isConversationStarted={isConversationStarted}
          lastConversationItem={lastConversationItem}
          conversationHistory={conversationHistory}
        />
      </main>
    </div>
  );
};
