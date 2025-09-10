import { api } from '@/lib/api';

const BASE = '/api/bff/tickets';

export async function holdTicket(ticketId: string) {
  const res = await api.post(`${BASE}/${ticketId}/hold`);
  return res.data;
}

export async function payTicket(ticketId: string) {
  const res = await api.post(`${BASE}/${ticketId}/pay`);
  return res.data;
}

export async function cancelTicket(ticketId: string) {
  const res = await api.patch(`${BASE}/${ticketId}`, { status: 'CANCELLED' });
  return res.data;
}

export async function fetchMyTickets() {
  const res = await api.get(`${BASE}/my`);
  return res.data;
}
