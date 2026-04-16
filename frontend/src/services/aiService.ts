import api from './api';

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export const aiService = {
  chat: async (message: string, history: ChatMessage[] = []): Promise<string> => {
    const res: any = await api.post('/chat', { message, history });
    return res.data.reply;
  },
};
