import { NodeAdapter } from '@nailyjs/backend/node-adapter'
import { RpcBootstrap } from '@nailyjs/rpc'
import { Plugin } from 'vite'
import { BeforeStartContext } from '../services'

export function NailyRpc(_context: BeforeStartContext): Plugin {
  const nodeAdapter = new NodeAdapter()
  const rpcBootstrap = new RpcBootstrap().setBackendAdapter(nodeAdapter)
  const baseURL = rpcBootstrap.getBaseURL() === '/' ? '/rpc' : rpcBootstrap.getBaseURL()

  return {
    name: 'unproject:naily-rpc',
    enforce: 'pre',
    apply: 'serve',

    async configureServer(server) {
      await rpcBootstrap.getRpcMethodExecutor()
        .setBackendAdapter(rpcBootstrap.getBackendAdapter())
        .setup()

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith(baseURL)) return next()
        const handler = nodeAdapter.getHandler()
        return await handler(req, res)
      })
    },
  }
}
