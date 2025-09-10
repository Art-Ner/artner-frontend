import { api } from '@/lib/api';

export async function fetchShowDetail(id: string) {
  const res = await api.get(`/api/bff/shows/${id}`);
  return res.data;
}

export async function fetchAvailability(id: string) {
  const res = await api.get(`/api/bff/shows/${id}/availability`);
  return res.data;
}
