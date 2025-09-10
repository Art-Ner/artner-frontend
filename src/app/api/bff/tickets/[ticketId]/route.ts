import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const { status } = await req.json();
  const body = {
    ticketId,
    status: status ?? 'CANCELLED',
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(body);
}
