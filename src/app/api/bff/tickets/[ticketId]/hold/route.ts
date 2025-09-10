import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const body = {
    ticketId,
    status: 'HELD',
    expiresAt: new Date(Date.now() + 5 * 60_000).toISOString(),
  };
  return NextResponse.json(body);
}
