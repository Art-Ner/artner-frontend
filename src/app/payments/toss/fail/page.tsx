export default async function TossFailPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string; orderId?: string }>;
}) {
  const { orderId, code, message } = await searchParams;
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">결제 실패</h1>
      <div className="text-sm">orderId: {orderId}</div>
      <div className="text-sm">code: {code}</div>
      <div className="text-sm">message: {message}</div>
    </main>
  );
}
