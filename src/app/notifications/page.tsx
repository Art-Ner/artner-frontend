import { fetchNotifications } from '@/slices/notifications/queries';

export default async function NotificationsPage() {
  const data = await fetchNotifications({ limit: 50 });
  const items: Array<any> = Array.isArray(data) ? data : data?.items ?? [];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">알림</h1>
      <ul className="space-y-2">
        {items.map((n) => (
          <li key={n.id} className="border p-3 rounded">
            <div className="font-medium">{n.title ?? n.kind}</div>
            <div className="text-sm text-muted-foreground">{n.body}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
