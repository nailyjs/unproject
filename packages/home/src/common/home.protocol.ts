import { PackageJson } from 'type-fest'
import { useRequest } from '../utils/request'

export const HomeController = 'unproject:home/HomeController'
export interface HomeController {
  /**
   * Get package.json file.
   *
   * @returns {PackageJson} package.json file.
   */
  getPackageJson(): PackageJson
}
export function useHomeController() {
  return useRequest().request<HomeController>(HomeController)
}
