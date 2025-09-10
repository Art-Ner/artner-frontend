'use client';

import { useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

type EventMap = {
  'seat:update': { showId: string; remain: number };
  'match:status': {
    postId: string;
    state: 'applied' | 'accepted' | 'rejected';
  };
  notification: { id: string; message: string };
  'chat:message': { id: string; sender: string; body: string; at: string };
};

export function useRealtime() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;
    const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:3030';
    // 연결 정보를 콘솔로 노출하여 진단에 도움을 줍니다.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.debug('[socket] connecting', { baseUrl, path: '/realtime' });
    }
    const s = io(baseUrl, {
      path: '/realtime',
      // 일부 환경에서 ws 업그레이드가 막힐 수 있으므로 폴링 폴백 허용
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    });
    socketRef.current = s;
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);
    return () => {
      try {
        s.off('connect', onConnect);
        s.off('disconnect', onDisconnect);
        s.removeAllListeners();
        s.disconnect();
      } finally {
        socketRef.current = null;
      }
    };
  }, []);

  return { socket: socketRef.current, connected };
}

export function onEvent<K extends keyof EventMap>(
  socket: Socket | null,
  key: K,
  handler: (payload: EventMap[K]) => void
) {
  if (!socket) return () => {};
  socket.on(key, handler as any);
  return () => socket.off(key, handler as any);
}

export function emitChat(socket: Socket | null, body: string, sender?: string) {
  if (!socket || !body.trim()) return;
  socket.emit('chat:send', { body, sender });
}
