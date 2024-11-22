import type { CompilerOptions } from 'typescript'
import { PackageJson } from 'type-fest'
import { useRequest } from '../utils/request'

export const HomeController = 'unproject:home/HomeController'
export interface HomeController {
  /**
   * Get package.json file.
   *
   * @returns {PackageJson} package.json file.
   */
  getPackageJson(): PackageJson | 'not-found'
  /**
   * Search packages.
   *
   * @param type npm | github | taobao
   * @param keywords search keywords
   * @param options search options
   * @returns {SearchValueItem[] | SearchError} search results
   */
  search(type: 'npm' | 'github' | 'taobao', keywords: string, options: Record<string, any>): Promise<SearchValue>
  /**
   * Get TypeScript configuration. It will resolve `tsconfig.json` file.
   * @returns {TypeScriptConfiguration} TypeScript configuration.
   */
  getTypeScriptConfiguration(): Promise<TypeScriptConfiguration | 'not-found'>
  /**
   * Get TypeScript configuration layer. It will resolve all of `tsconfig.*.json` and `tsconfig.json` files.
   * @returns {Record<string, TypeScriptConfiguration>} TypeScript configuration layer. `key` is the file name.
   */
  getTypeScriptConfigurationLayer(): Promise<Record<string, TypeScriptConfiguration>>
  /**
   * Update TypeScript configuration.
   * @param path TypeScript configuration file path.
   * @param configuration TypeScript configuration. It will overwrite the original configuration.
   * @returns {TypeScriptConfiguration | 'not-found'} Updated TypeScript configuration. `not-found` if the file does not exist.
   */
  updateTypeScriptConfiguration(path: string, configuration: DeepPartial<TypeScriptConfiguration>): Promise<'not-found' | TypeScriptConfiguration>
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export interface TypeScriptConfiguration {
  compilerOptions?: CompilerOptions
  include?: string[]
  exclude?: string[]
  files?: string[]
  references?: { path: string }[]
}

export interface NpmSearchValueItem {
  type: 'npm'
  name: string
  version: string
  description: string
  keywords: string[]
  href: string
  total: number
}

export interface GithubSearchValueItem {
  type: 'github'
  name: string
  description: string
  href: string
}

export interface SearchError {
  type: 'error'
  message: string
}

export type SearchValueItem = NpmSearchValueItem | GithubSearchValueItem
export type SearchValue = SearchValueItem[] | SearchError

export function useHomeController() {
  return useRequest().request<HomeController>(HomeController)
}
