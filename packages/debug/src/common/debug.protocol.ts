import { useRequest } from '../utils/request'

export const DebugController = 'unproject:Debug/DebugController'
export interface DebugController {
}

export function useDebugController() {
  return useRequest().request<DebugController>(DebugController)
}
