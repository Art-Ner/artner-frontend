import {
  fetchPerformanceDetail,
  fetchPerformanceTickets,
} from '@/slices/performances/queries';

type Props = { params: Promise<{ performanceId: string }> };

export default async function PerformanceDetailPage({ params }: Props) {
  const { performanceId } = await params;
  const [detail, tickets] = await Promise.all([
    fetchPerformanceDetail(performanceId),
    fetchPerformanceTickets(performanceId),
  ]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        {detail?.title ?? `Performance ${performanceId}`}
      </h1>
      <section>
        <h2 className="font-medium">상세</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(detail, null, 2)}
        </pre>
      </section>
      <section>
        <h2 className="font-medium">티켓</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(tickets, null, 2)}
        </pre>
      </section>
    </main>
  );
}
