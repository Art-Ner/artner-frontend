'use client';

import { cancelTicket, holdTicket, payTicket } from '@/slices/tickets/queries';

import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { requestTossPayment } from '@/lib/toss';
import { useState } from 'react';

export default function PurchaseClient({ performanceId }: { performanceId: string }) {
  const [ticketId, setTicketId] = useState('t-demo');
  const [log, setLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function step(name: string, fn: () => Promise<any>) {
    setLoading(true);
    try {
      const r = await fn();
      setLog((prev) => [...prev, { step: name, data: r }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">공연 예매 / 결제</h1>
      <div className="text-sm text-muted-foreground">Performance: {performanceId}</div>

      <div className="grid gap-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">Ticket ID</label>
          <Input value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button disabled={loading} onClick={() => step('HOLD', () => holdTicket(ticketId))}>
          좌석 홀드
        </Button>
        <Button
          disabled={loading}
          onClick={() => step('PAY', () => payTicket(ticketId))}
          variant="secondary"
        >
          결제
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            const orderId = `order_${Date.now()}`;
            requestTossPayment({
              amount: 80000,
              orderId,
              orderName: `Performance ${performanceId}`,
              customerName: '데모유저',
              successUrl: `${window.location.origin}/payments/toss/success?orderId=${orderId}`,
              failUrl: `${window.location.origin}/payments/toss/fail?orderId=${orderId}`,
            });
          }}
          variant="outline"
        >
          Toss 결제 (리다이렉트)
        </Button>
        <Button
          disabled={loading}
          onClick={() => step('CANCEL', () => cancelTicket(ticketId))}
          variant="destructive"
        >
          취소
        </Button>
      </div>

      <section>
        <h2 className="font-medium">로그</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">{JSON.stringify(log, null, 2)}</pre>
      </section>
    </main>
  );
}


