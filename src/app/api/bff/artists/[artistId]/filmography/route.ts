import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId: id } = await params;
  const items = [
    {
      id: `${id}-f1`,
      title: '첫 앨범',
      released_at: '2023-01-01',
      description: '설명',
    },
    {
      id: `${id}-f2`,
      title: '두 번째 싱글',
      released_at: '2024-05-10',
      description: '설명',
    },
  ];
  return NextResponse.json({ items }, { headers: noStore() });
}
