import { SwitchProps } from 'naive-ui'

export const SwitchWatermark = '__unproject:schema:switch__'

export interface SwitchPropsMetadata extends SwitchProps {
  propertyKey: string | symbol
  role: 'switch'
}

export function SwitchProps(props?: SwitchProps): PropertyDecorator {
  return ((target, propertyKey) => {
    const oldSwitchMetadata: SwitchPropsMetadata[] = Reflect.getMetadata(SwitchWatermark, target.constructor) || []
    const currentSwitchMetadata = oldSwitchMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentSwitchMetadata) {
      return Reflect.defineMetadata(SwitchWatermark, [
        ...oldSwitchMetadata,
        { ...props, propertyKey, role: 'switch' } as SwitchPropsMetadata,
      ] as SwitchPropsMetadata[], target.constructor === Function ? target : target.constructor)
    }

    for (const metadata of oldSwitchMetadata) {
      if (metadata.propertyKey === propertyKey) {
        Object.assign(metadata, props)
      }
    }

    Reflect.defineMetadata(SwitchWatermark, oldSwitchMetadata, target.constructor === Function ? target : target.constructor)
  }) as PropertyDecorator
}
