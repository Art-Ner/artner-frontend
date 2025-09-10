import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { orderId, amount, paymentKey } = await req.json();
  if (!orderId || !amount || !paymentKey) {
    return NextResponse.json({ error: 'invalid_params' }, { status: 400 });
  }
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'server_not_configured' },
      { status: 500 }
    );
  }
  const auth = Buffer.from(`${secretKey}:`).toString('base64');

  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': orderId,
    },
    body: JSON.stringify({ orderId, amount, paymentKey }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: false, error: err }, { status: 400 });
  }
  const approved = await res.json();
  // TODO: 좌석 확정/티켓 발권 트랜잭션 처리
  return NextResponse.json({ ok: true, approved });
}
