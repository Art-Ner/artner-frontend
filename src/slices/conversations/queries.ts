import { api } from '@/lib/api';

const BASE = '/api/bff/conversations';

export async function fetchConversations() {
  const res = await api.get(BASE);
  return res.data;
}

export async function createConversation(payload: {
  title?: string;
  participants?: Array<{ id: number; name?: string }>;
}) {
  const res = await api.post(BASE, payload);
  return res.data;
}

export async function fetchMessages(conversationId: string) {
  const res = await api.get(`${BASE}/${conversationId}`);
  return res.data;
}

export async function sendMessage(conversationId: string, body: string) {
  const res = await api.post(`${BASE}/${conversationId}/messages`, { body });
  return res.data;
}
