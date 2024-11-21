import { Class } from '@nailyjs/ioc'

export function useReflector(cls: Class) {
  function getDesignTypes(keys: (string | symbol)[]): Record<string | symbol, any> {
    const result: Record<string | symbol, any> = {}

    for (const key of keys) {
      const type = Reflect.getMetadata('design:type', cls.prototype, key)
      result[key] = type
    }

    return result
  }

  return {
    getDesignTypes,
  }
}
