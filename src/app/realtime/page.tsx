'use client';

import { useEffect, useState } from 'react';

import { emitChat, onEvent, useRealtime } from '@/lib/socket';

export default function RealtimeDemo() {
  const { socket, connected } = useRealtime();
  const [remain, setRemain] = useState<number | null>(null);
  const [lastMsg, setLastMsg] = useState('');
  const [chat, setChat] = useState('');
  const [logs, setLogs] = useState<Array<{ id: string; text: string }>>([]);

  console.log('socket', socket, connected);

  useEffect(
    () => onEvent(socket ?? null, 'seat:update', (p) => setRemain(p.remain)),
    [socket]
  );
  useEffect(
    () => onEvent(socket ?? null, 'notification', (p) => setLastMsg(p.message)),
    [socket]
  );
  useEffect(
    () =>
      onEvent(socket ?? null, 'chat:message', (m) =>
        setLogs((prev) => [...prev, { id: m.id, text: `${m.sender}: ${m.body}` }])
      ),
    [socket]
  );

  return (
    <div className="space-y-4">
      <div className="card">
        연결 상태: {connected ? '연결됨' : '연결 끊김'}
      </div>
      <div className="card">좌석 잔여 데모: {remain ?? '-'} 석</div>
      <div className="card">메시지: {lastMsg}</div>
      <div className="card space-y-2">
        <div className="font-medium">채팅 데모</div>
        <div className="max-h-40 overflow-auto space-y-1 text-sm">
          {logs.map((l) => (
            <div key={l.id}>{l.text}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            placeholder="메시지를 입력..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                emitChat(socket ?? null, chat, 'me');
                setChat('');
              }
            }}
          />
          <button
            className="border rounded px-3"
            onClick={() => {
              emitChat(socket ?? null, chat, 'me');
              setChat('');
            }}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
