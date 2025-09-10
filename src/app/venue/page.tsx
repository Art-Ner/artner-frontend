export const dynamic = 'force-dynamic';
async function searchVenues(region: string, seats: number) {
  const u = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/bff/venues/search`
  );
  u.searchParams.set('region', region);
  u.searchParams.set('seats', String(seats));
  const res = await fetch(u.toString(), { next: { revalidate: 120 } });
  return res.json();
}

export default async function VenueSearch() {
  const data = await searchVenues('서울', 100);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">공연장 탐색</h1>
      <div className="space-y-3">
        {data?.venues?.map((v: any) => (
          <div key={v.id} className="card">
            <div className="font-medium">{v.name}</div>
            <div className="text-sm text-gray-600">
              {v.region} · 좌석 {v.seatCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
