import { io, Socket } from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const socket: Socket = io(BACKEND_URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
});
