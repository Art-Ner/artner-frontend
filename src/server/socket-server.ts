import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = Number(process.env.SOCKET_PORT ?? 3030);
const origin = process.env.SOCKET_ORIGIN ?? 'http://localhost:3000';

app.use(cors({ origin }));

const io = new Server(server, {
  cors: { origin },
  path: '/realtime',
});

io.on('connection', (socket) => {
  socket.emit('notification', { id: 'welcome', message: '실시간 연결됨' });

  socket.on('ping', () =>
    socket.emit('notification', { id: 'pong', message: 'pong' })
  );

  // 간단한 채팅 에코/브로드캐스트
  socket.on('chat:send', (payload: { sender?: string; body: string }) => {
    const message = {
      id: String(Date.now()),
      sender: payload?.sender ?? socket.id,
      body: payload?.body ?? '',
      at: new Date().toISOString(),
    };
    io.emit('chat:message', message);
  });
});

// 데모 타이머: 좌석 잔여 수 랜덤 브로드캐스트
setInterval(() => {
  const remain = 100 + Math.floor(Math.random() * 50);
  io.emit('seat:update', { showId: 's1', remain });
}, 2000);

server.listen(port, () => {
  console.log(`[socket] listening on ${port}, origin=${origin}`);
});
