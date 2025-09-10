import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { ShowDetailResponse } from '@/lib/schemas';
import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = {
      show: {
        id,
        title: `공연 ${id}`,
        dateRange: '10.10 19:30',
        venueName: '아트홀 A',
        runtime: 120,
      },
      seatsPreview: {
        total: 500,
        remain: 132,
        mapUrl: '',
        sample: [
          { id: 'A1', label: 'A1', price: 70000, available: true },
          { id: 'A2', label: 'A2', price: 70000, available: false },
        ],
      },
      discounts: {
        bestLabel: '얼리버드 20%',
        rules: [{ id: 'd1', label: '학생 10%', percent: 10 }],
      },
    };
    const parsed = ShowDetailResponse.parse(body);
    return NextResponse.json(parsed, { headers: noStore() });
  } catch {
    return NextResponse.json(
      { show: null, seatsPreview: null, discounts: { rules: [] } },
      { headers: noStore() }
    );
  }
}
