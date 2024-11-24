import type { Agent } from 'package-manager-detector'
import child_process from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { Service } from '@nailyjs/ioc'
import { detect } from 'package-manager-detector/detect'

export interface InstallPackageOptions {
  cwd?: string
  dev?: boolean
  packageManager?: string
  preferOffline?: boolean
  additionalArgs?: string[]
}

@Service()
export class InstallService {
  async detectPackageManager(cwd = process.cwd()): Promise<Agent | null> {
    const result = await detect({
      cwd,
      onUnknown(packageManager) {
        console.warn('[@antfu/install-pkg] Unknown packageManager:', packageManager)
        return undefined
      },
    })
    return result?.agent || null
  }

  async getArgentWithArgs(names: string | string[], options: InstallPackageOptions = {}): Promise<[string, string[]]> {
    const detectedAgent = options.packageManager || await this.detectPackageManager(options.cwd) || 'npm'
    const [agent] = detectedAgent.split('@')

    if (!Array.isArray(names))
      names = [names]

    const args = options.additionalArgs || []

    if (options.preferOffline) {
      // yarn berry uses --cached option instead of --prefer-offline
      if (detectedAgent === 'yarn@berry')
        args.unshift('--cached')
      else
        args.unshift('--prefer-offline')
    }

    if (agent === 'pnpm' && existsSync(resolve(options.cwd ?? process.cwd(), 'pnpm-workspace.yaml')))
      args.unshift('-w')

    return [agent, args]
  }

  installPackage(agent: string, args: string[], names: string[], options: InstallPackageOptions = {}): child_process.ChildProcess {
    return child_process.spawn(agent, [
      agent === 'yarn'
        ? 'add'
        : 'install',
      options.dev ? '-D' : '',
      ...args,
      ...names,
    ].filter(Boolean), {
      cwd: options.cwd,
    })
  }
}
