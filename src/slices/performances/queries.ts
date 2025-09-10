const BASE = '/api/performances';
import { api } from '@/lib/api';

export async function fetchPerformances(keyword?: string) {
  const res = await api.get(BASE, { params: keyword ? { keyword } : undefined });
  return res.data;
}

export async function fetchPerformanceDetail(performanceId: string) {
  const res = await api.get(`${BASE}/${performanceId}`);
  return res.data;
}

export async function saveNewPerformance(payload: unknown) {
  const res = await api.post(`${BASE}/new`, payload);
  return res.data;
}

export async function updatePerformance(
  performanceId: string,
  payload: unknown
) {
  const res = await api.put(`${BASE}/${performanceId}`, payload);
  return res.data;
}

export async function publishPerformance(performanceId: string) {
  const res = await api.patch(`${BASE}/${performanceId}`);
  return res.data;
}

export async function deletePerformance(performanceId: string) {
  const res = await api.delete(`${BASE}/${performanceId}`);
  return res.data;
}

export async function fetchPerformanceTickets(performanceId: string) {
  const res = await api.get(`${BASE}/${performanceId}/tickets`);
  return res.data;
}
