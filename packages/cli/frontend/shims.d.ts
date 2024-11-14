declare module 'virtual:uncli:vue-router' {
  export const routes: any[]
  export const layoutRoutes: any[]
}

declare module 'virtual:uncli:menu' {
  export const menu: () => Promise<any[]>
}
