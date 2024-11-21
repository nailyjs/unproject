import { SelectProps } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'

export type UnionRole = 'select'
export const UnionWatermark = '__unproject:schema:union__'

export interface UnionSelectPropsMetadata extends SelectProps {
  propertyKey: string | symbol
  role: 'select'
}

export type UnionPropsMetadata = UnionSelectPropsMetadata

export function UnionProps(role: 'select', props?: SelectProps): PropertyDecorator
export function UnionProps(role: UnionRole, props?: Record<string, any>): PropertyDecorator {
  return ((target, propertyKey) => {
    const oldUnionMetadata: UnionPropsMetadata[] = Reflect.getMetadata(UnionWatermark, target.constructor) || []
    const currentUnionMetadata = oldUnionMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentUnionMetadata) {
      return Reflect.defineMetadata(UnionWatermark, [
        ...oldUnionMetadata,
        { ...props, propertyKey, role } as UnionPropsMetadata,
      ] as UnionPropsMetadata[], target.constructor === Function ? target : target.constructor)
    }

    for (const metadata of oldUnionMetadata) {
      if (metadata.propertyKey === propertyKey) {
        Object.assign(metadata, props)
      }
    }

    Reflect.defineMetadata(UnionWatermark, oldUnionMetadata, target.constructor === Function ? target : target.constructor)
  }) as PropertyDecorator
}

export function UnionSelectProps(props: SelectProps = {}): PropertyDecorator {
  return UnionProps('select', props)
}

export function UnionSelectOption(label: string, value: string, extra: Omit<SelectMixedOption, 'label' | 'value'> = {}): PropertyDecorator {
  return ((target, propertyKey) => {
    const oldUnionMetadata: UnionPropsMetadata[] = Reflect.getMetadata(UnionWatermark, target.constructor) || []
    const currentUnionMetadata = oldUnionMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentUnionMetadata) {
      return Reflect.defineMetadata(UnionWatermark, [
        ...oldUnionMetadata,
        {
          role: 'select',
          propertyKey,
          options: [
            ...(oldUnionMetadata.find(metadata => metadata.propertyKey === propertyKey)?.options || []),
            { label, value, ...extra },
          ],
        } as UnionPropsMetadata,
      ] as UnionPropsMetadata[], target.constructor === Function ? target : target.constructor)
    }

    for (const metadata of oldUnionMetadata) {
      if (metadata.propertyKey === propertyKey) {
        metadata.options = [
          ...(metadata.options || []),
          { label, value, ...extra },
        ]
      }
    }

    Reflect.defineMetadata(UnionWatermark, oldUnionMetadata, target.constructor === Function ? target : target.constructor)
  }) as PropertyDecorator
}
