import { fetchBookings } from '@/slices/bookings/queries';

export default async function BookingsPage() {
  const data = await fetchBookings();
  const items: Array<any> = Array.isArray(data) ? data : data?.items ?? [];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">대관 요청</h1>
      <ul className="space-y-2">
        {items.map((b) => (
          <li key={b.id} className="border p-3 rounded">
            <div className="text-sm">#{b.id}</div>
            <div className="text-muted-foreground text-sm">{b.status}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
