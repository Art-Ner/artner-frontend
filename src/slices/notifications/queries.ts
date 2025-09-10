import { api } from '@/lib/api';

export async function fetchNotifications(
  params?: Record<string, string | number | boolean>
) {
  const res = await api.get('/api/notifications', { params });
  return res.data;
}

export async function markNotificationRead(id: string) {
  const res = await api.patch(`/api/notifications/${id}`);
  return res.data;
}
