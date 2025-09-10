import Link from 'next/link';
import { searchArtists } from '@/slices/artists/queries';

export default async function ArtistsSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword } = await searchParams;
  const data = await searchArtists(keyword);
  const items: Array<any> = Array.isArray(data) ? data : data?.items ?? [];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">아티스트 검색</h1>
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.id} className="border p-3 rounded">
            <Link href={`/artists/${a.id}/portfolio`} className="font-medium">
              {a.username}
            </Link>
            <div className="text-sm text-muted-foreground">{a.headline}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
