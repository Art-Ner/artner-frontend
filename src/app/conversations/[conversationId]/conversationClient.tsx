'use client';

import { fetchMessages, sendMessage } from '@/slices/conversations/queries';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';

export default function ConversationClient({ conversationId }: { conversationId: string }) {
  const [items, setItems] = useState<Array<any>>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  async function load() {
    const data = await fetchMessages(conversationId);
    const arr: Array<any> = Array.isArray(data) ? data : data?.items ?? [];
    setItems(arr);
    scrollToBottom();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }

  async function onSend() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const created = await sendMessage(conversationId, text.trim());
      setItems((prev) => [...prev, created]);
      setText('');
      scrollToBottom();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [conversationId]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">채팅 #{conversationId}</h1>
      <div
        ref={listRef}
        className="h-[60vh] border rounded p-3 overflow-y-auto space-y-2 bg-background"
      >
        {items.map((m) => (
          <div key={m.id} className="flex gap-2 items-start">
            <div className="text-xs text-muted-foreground min-w-24">
              {m.sender?.name ?? m.sender?.id ?? '익명'}
            </div>
            <div className="px-3 py-2 rounded bg-muted inline-block">
              {m.body}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) onSend();
          }}
        />
        <Button onClick={onSend} disabled={loading}>
          전송
        </Button>
      </div>
    </main>
  );
}


