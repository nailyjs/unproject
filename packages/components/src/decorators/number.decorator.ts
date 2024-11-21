import { InputNumberProps, InputProps } from 'naive-ui'

export type NumberRole = 'input' | 'input-number'
export const NumberWatermark = '__unproject:schema:number__'

export interface NumberInputPropsMetadata extends InputProps {
  propertyKey: string | symbol
  role: 'input'
}

export interface NumberInputNumberPropsMetadata extends InputNumberProps {
  propertyKey: string | symbol
  role: 'input-number'
}

export type NumberPropsMetadata = NumberInputPropsMetadata | NumberInputNumberPropsMetadata

export function NumberProps(role: 'input', props?: InputProps): PropertyDecorator
export function NumberProps(role: 'input-number', props?: InputNumberProps): PropertyDecorator
export function NumberProps(role: NumberRole, props: InputProps | InputNumberProps = {}): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(NumberWatermark, [
      ...(Reflect.getMetadata(NumberWatermark, target.constructor === Function ? target : target.constructor) || []) as NumberPropsMetadata[],
      { ...props, propertyKey, role } as NumberPropsMetadata,
    ] as NumberPropsMetadata[], target.constructor === Function ? target : target.constructor)
  }
}
