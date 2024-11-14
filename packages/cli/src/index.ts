import { Command } from 'commander'
import { description, version } from '../package.json'
import { useServer } from './server'

export interface UseProgramReturn {
  program: Command
}

export function useProgram(): UseProgramReturn {
  const program = new Command()
    .name('uncli')
    .version(version, '-v, --version')
    .description(description)
    .action(async () => {
      const server = useServer()
      const viteServer = await server.createViteServer()
      await viteServer.listen()
      viteServer.printUrls()
      viteServer.bindCLIShortcuts({ print: true })
    })

  return {
    program,
  }
}
