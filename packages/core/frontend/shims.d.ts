declare module 'virtual:uncli:vue-router' {
  export const routes: any[]
  export const layoutRoutes: any[]
}

declare module 'virtual:uncli:menu' {
  export const menu: () => Promise<any[]>
}

declare module 'virtual:uncli:hljs' {
  export const register: (hljs: any) => Promise<void>
}

declare module 'virtual:uncli:config' {
  import { Configuration } from '../src/types'

  const config: Configuration.Config
  export default config
}
