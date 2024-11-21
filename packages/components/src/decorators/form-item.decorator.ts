import { FormItemProps } from 'naive-ui'
import { LabelPlacement } from 'naive-ui/es/form/src/interface'

export const FormItemWatermark = '__unproject:schema:form-item__'

export interface FormItemPropsMetadata extends FormItemProps {
  propertyKey: string | symbol
}

export function FormItemProps(props: FormItemProps): PropertyDecorator {
  return (target, propertyKey) => {
    const oldMetadata: FormItemPropsMetadata[] = Reflect.getMetadata(FormItemWatermark, target.constructor === Function ? target : target.constructor) || []
    const currentMetadata = oldMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentMetadata) {
      return Reflect.defineMetadata(FormItemWatermark, [
        ...oldMetadata,
        { ...props, propertyKey } as FormItemPropsMetadata,
      ] as FormItemPropsMetadata[], target.constructor === Function ? target : target.constructor)
    }

    for (const metadata of oldMetadata) {
      if (metadata.propertyKey === propertyKey) {
        Object.assign(metadata, props)
      }
    }

    Reflect.defineMetadata(FormItemWatermark, oldMetadata, target.constructor === Function ? target : target.constructor)
  }
}

export function Label(label: string): PropertyDecorator {
  return (target, propertyKey) => {
    const oldMetadata: FormItemPropsMetadata[] = Reflect.getMetadata(FormItemWatermark, target.constructor === Function ? target : target.constructor) || []
    const currentMetadata = oldMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentMetadata) return FormItemProps({ label })(target, propertyKey)
    for (const metadata of oldMetadata) {
      if (metadata.propertyKey === propertyKey) {
        metadata.label = label
      }
    }
    Reflect.defineMetadata(FormItemWatermark, oldMetadata, target.constructor === Function ? target : target.constructor)
  }
}

export function LabelPlacement(placement: LabelPlacement): PropertyDecorator {
  return (target, propertyKey) => {
    const oldMetadata: FormItemPropsMetadata[] = Reflect.getMetadata(FormItemWatermark, target.constructor === Function ? target : target.constructor) || []
    const currentMetadata = oldMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentMetadata) return FormItemProps({ labelPlacement: placement })(target, propertyKey)
    for (const metadata of oldMetadata) {
      if (metadata.propertyKey === propertyKey) {
        metadata.labelPlacement = placement
      }
    }
    Reflect.defineMetadata(FormItemWatermark, oldMetadata, target.constructor === Function ? target : target.constructor)
  }
}

export function Required(required: boolean = true, showRequireMark?: boolean): PropertyDecorator {
  return (target, propertyKey) => {
    const oldMetadata: FormItemPropsMetadata[] = Reflect.getMetadata(FormItemWatermark, target.constructor === Function ? target : target.constructor) || []
    const currentMetadata = oldMetadata.find(metadata => metadata.propertyKey === propertyKey)
    if (!currentMetadata) return FormItemProps({ required, showRequireMark })(target, propertyKey)
    for (const metadata of oldMetadata) {
      if (metadata.propertyKey === propertyKey) {
        metadata.required = required
        if (showRequireMark !== undefined) {
          metadata.showRequireMark = showRequireMark
        }
      }
    }
    Reflect.defineMetadata(FormItemWatermark, oldMetadata, target.constructor === Function ? target : target.constructor)
  }
}
