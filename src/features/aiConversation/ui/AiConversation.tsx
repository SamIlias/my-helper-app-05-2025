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
    <div className="flex flex-col w-3/4 h-full min-h-0 ">
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
        <ConversationHistoryBlock
          userName={getNameFromEmail(user!.email)}
          isConversationStarted={isConversationStarted}
          lastConversationItem={lastConversationItem}
          conversationHistory={conversationHistory}
        />
      </div>

      <div className="h-24 mb-6">
        <PromptForm
          handleSubmit={handleSubmit}
          isSending={isSending}
          isSubmitDisabled={isSubmitDisabled}
          query={query}
          onPromptChange={onPromptChange}
        />
      </div>
    </div>
  );
};
