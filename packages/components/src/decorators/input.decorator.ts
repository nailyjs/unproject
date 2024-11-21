import { InputProps } from 'naive-ui'

export const InputWatermark = '__unproject:schema:input__'

export interface InputPropsMetadata extends InputProps {
  propertyKey: string | symbol
}

export function InputProps(props: InputProps): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(InputWatermark, [
      ...(Reflect.getMetadata(InputWatermark, target.constructor === Function ? target : target.constructor) || []) as InputPropsMetadata[],
      { ...props, propertyKey } as InputPropsMetadata,
    ] as InputPropsMetadata[], target.constructor === Function ? target : target.constructor)
  }
}
