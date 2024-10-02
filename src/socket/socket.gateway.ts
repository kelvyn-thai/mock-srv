import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { map, from, Observable } from 'rxjs';
import { Server } from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('data', data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<WsResponse> {
    console.log('data', data);
    return {
      event: 'identity',
      data: 'custom',
    };
  }
}
