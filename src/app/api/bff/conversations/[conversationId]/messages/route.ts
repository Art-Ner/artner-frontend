import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params:Promise<{ conversationId: string }> }
) {
  const { conversationId: id } = await params;
  const { body } = await req.json();
  const created = {
    id: `${id}-m${Math.floor(Math.random() * 10000)}`,
    sender: { id: 1, name: '데모유저' },
    body,
    created_at: new Date().toISOString(),
  };
  return NextResponse.json(created);
}
