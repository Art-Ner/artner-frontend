import Link from 'next/link';
import { fetchPerformances } from '@/slices/performances/queries';

export default async function PerformancesPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword } = await searchParams;
  const data = await fetchPerformances(keyword);
  const items: Array<any> = Array.isArray(data) ? data : data?.items ?? [];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">공연 목록</h1>
      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <Link href={`/performances/${p.id}`}>
              {p.title ?? `Performance ${p.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
