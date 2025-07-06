import { ConversationItem, initialConversationItem } from '../../../../netlify/functions/askModel';

export { initialConversationItem };
export type { ConversationItem };

export const askModel = async (conversation: ConversationItem[]) => {
  try {
    const response = await fetch('/.netlify/functions/askModel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation: conversation,
        temperature: 1.0,
        top_p: 1.0,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get response');
    }

    return data.content;
  } catch (error) {
    console.error('Model request error', error);
    throw error;
  }
};
