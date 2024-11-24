import type { HMRPayload, InferCustomEventPayload, ViteDevServer, WebSocket, WebSocketClient, WebSocketCustomListener, WebSocketServer } from 'vite'
import { Container, Injectable } from '@nailyjs/ioc'
import winston from 'winston'

@Injectable()
export class WebsocketServer implements WebSocketServer {
  constructor(
    private readonly viteServer: ViteDevServer,
    private readonly logger: winston.Logger,
    public readonly clients: Set<WebSocketClient> = viteServer.ws.clients,
    public readonly on: WebSocket.Server['on'] & {
      <T extends string>(event: T, listener: WebSocketCustomListener<InferCustomEventPayload<T>>): void
    } = viteServer.ws.on.bind(viteServer.ws),
    public off: WebSocket.Server['off'] & {
      // eslint-disable-next-line ts/no-unsafe-function-type
      (event: string, listener: Function): void
    } = viteServer.ws.off.bind(viteServer.ws),
    public name: string = viteServer.ws.name,
  ) {

  }

  listen(): void {
    this.viteServer.ws.listen()
  }

  close(): Promise<void> {
    return this.viteServer.ws.close()
  }

  send(payload: HMRPayload): void
  send<T extends string>(event: T, payload?: InferCustomEventPayload<T>): void
  send(...args: any[]): void {
    if (args[1]) {
      this.logger.info(`[WS] event:${args[0]}`, { type: 'WS' })
    }
    else {
      this.logger.info(`[WS] message:${(args[0] || {}).type}`, { type: 'WS' })
    }
    this.viteServer.ws.send(args[0], args[1])
  }

  static getInstance(container: Container, viteServer: ViteDevServer, logger: winston.Logger): WebsocketServer {
    const map = container.getContainer()
    const existingInstance = map.get(WebsocketServer)
    if (existingInstance && existingInstance.wrapperType === 'constant')
      return existingInstance.getValue()
    return container.createConstantWrapper(WebsocketServer, new WebsocketServer(viteServer, logger)).save().getValue()
  }
}
