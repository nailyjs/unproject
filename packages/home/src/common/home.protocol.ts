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
