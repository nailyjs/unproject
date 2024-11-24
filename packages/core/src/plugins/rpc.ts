import http from 'node:http'
import { NodeAdapter } from '@nailyjs/backend/node-adapter'
import { RpcBootstrap } from '@nailyjs/rpc'
import { get } from 'lodash-es'
import { Plugin } from 'vite'
import { BeforeStartContext } from '../services'

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      resolve(body)
    })
    req.on('error', reject)
  })
}

export function NailyRpc(context: BeforeStartContext): Plugin {
  return {
    name: 'unproject:naily-rpc',
    enforce: 'pre',
    apply: 'serve',

    async configureServer(server) {
      const nodeAdapter = new NodeAdapter()
      const rpcBootstrap = new RpcBootstrap().setBackendAdapter(nodeAdapter)
      const baseURL = rpcBootstrap.getBaseURL() === '/' ? '/rpc' : rpcBootstrap.getBaseURL()
      await rpcBootstrap.getRpcMethodExecutor()
        .setBackendAdapter(rpcBootstrap.getBackendAdapter())
        .setup()

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith(baseURL)) return next()
        const handler = nodeAdapter.getHandler()
        readBody(req)
          .then(body => JSON.parse(body))
          .then(body => context.logger.info(`[RPC] ${get(body, 'method')} ${get(body, 'id')}`))
        return await handler(req, res)
      })
    },
  }
}
