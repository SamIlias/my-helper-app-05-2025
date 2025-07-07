export type ConversationItem = {
  role: 'system' | 'user' | 'assistant';
  content?: string | null;
  id: string;
};

export const initialConversationItem: ConversationItem = {
  role: 'system',
  content:
    'You are a helpful assistant. Always respond in Markdown format. Use proper headings, lists, code blocks, and tables when appropriate.',
  id: 'initial',
};

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
