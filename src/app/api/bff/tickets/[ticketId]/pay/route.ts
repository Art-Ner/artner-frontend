import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  // 실제 결제는 PG 연동 필요. 데모로 즉시 결제 완료 처리
  const body = {
    ticketId,
    status: 'PAID',
    paidAt: new Date().toISOString(),
    amount: 80000,
    pgReceiptUrl: 'https://example.com/receipt/demo',
  };
  return NextResponse.json(body);
}
