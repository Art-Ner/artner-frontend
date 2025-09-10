import Link from 'next/link';

import { fetchVenues } from '@/slices/venues/queries';

export default async function VenuesPage() {
  const data = await fetchVenues();
  const venues: Array<any> = Array.isArray(data) ? data : data?.items ?? [];

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">공연장 목록</h1>
      <ul className="space-y-2">
        {venues.map((v) => (
          <li key={v.id} className="border p-3 rounded hover:bg-muted">
            <Link href={`/venues/${v.id}`}>{v.name ?? `Venue ${v.id}`}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
