import http from 'http';
import { Server } from 'socket.io';
import app from './app';

const port = process.env.PORT || 3001;

const server = http.createServer(app);

// Inicialização do Socket.IO para notificações e status de entrega em tempo real
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH'],
  },
});

io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Anexa o io ao Express para uso nos controllers
app.set('io', io);

server.listen(port, () => {
  console.log(`⚡ API rodando na porta ${port}`);
  console.log(`📑 Swagger docs disponível em: http://localhost:${port}/api-docs`);
});
