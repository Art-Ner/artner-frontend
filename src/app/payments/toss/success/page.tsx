export default async function TossSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; paymentKey?: string; amount?: string }>;
}) {
  const { orderId, paymentKey, amount } = await searchParams;
  const ok = !!(orderId && paymentKey && amount);
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">결제 성공</h1>
      <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
        {JSON.stringify({ orderId, paymentKey, amount, ok }, null, 2)}
      </pre>
    </main>
  );
}
