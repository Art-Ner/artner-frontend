import Link from 'next/link';
import { fetchConversations } from '@/slices/conversations/queries';

// TODO: 서버가 빌드 시점에 접근 가능해지면 프리렌더(SSG/ISR)로 전환하고 아래 동적 설정 제거
export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
  const data = await fetchConversations();
  const items: Array<any> = Array.isArray(data) ? data : data?.items ?? [];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">대화</h1>
      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c.id} className="border p-3 rounded">
            <Link href={`/conversations/${c.id}`}>
              {c.title ?? `대화 ${c.id}`}
            </Link>
            <div className="text-sm text-muted-foreground">{c.lastMessage}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
