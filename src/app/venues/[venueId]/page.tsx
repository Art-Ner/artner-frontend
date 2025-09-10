import {
  fetchVenueCalendar,
  fetchVenueDetail,
  fetchVenueReviews,
} from '@/slices/venues/queries';

type Props = { params: Promise<{ venueId: string }> };

export default async function VenueDetailPage({ params }: Props) {
  const { venueId } = await params;
  const [detail, calendar, reviews] = await Promise.all([
    fetchVenueDetail(venueId),
    fetchVenueCalendar(venueId),
    fetchVenueReviews(venueId),
  ]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        {detail?.name ?? `Venue ${venueId}`}
      </h1>
      <section>
        <h2 className="font-medium">기본 정보</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(detail, null, 2)}
        </pre>
      </section>
      <section>
        <h2 className="font-medium">캘린더</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(calendar, null, 2)}
        </pre>
      </section>
      <section>
        <h2 className="font-medium">리뷰</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(reviews, null, 2)}
        </pre>
      </section>
    </main>
  );
}
