import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { cacheHeader } from '@/lib/utils';

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams;
  const keyword = (q.get('keyword') ?? '').toLowerCase();
  const list = [
    {
      id: 'a1',
      username: '홍길동',
      headline: '보컬 / 작곡',
      genres: ['SINGER'],
    },
    {
      id: 'a2',
      username: '김철수',
      headline: '기타리스트',
      genres: ['GUITAR'],
    },
    { id: 'a3', username: '이영희', headline: '드러머', genres: ['DRUM'] },
  ];
  const items = list.filter(
    (a) =>
      !keyword ||
      a.username.toLowerCase().includes(keyword) ||
      a.headline.toLowerCase().includes(keyword)
  );
  return NextResponse.json({ items }, { headers: cacheHeader(60) });
}
