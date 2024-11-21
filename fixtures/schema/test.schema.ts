import { Rule } from '@nailyjs/zod'
import { FormItemProps, Label, LabelPlacement, NumberProps, Required, UnionSelectOption } from '@unproject/components'
import { z } from 'zod'

export class User {
  @Required()
  @Label('姓名')
  @Rule()
  name: string

  @FormItemProps({
    label: '年龄',
    labelPlacement: 'left',
  })
  @NumberProps('input-number', {
    placeholder: '请输入年龄',
  })
  @Rule()
  age: number

  @LabelPlacement('left')
  @Label('性别')
  @UnionSelectOption('女', 'female')
  @UnionSelectOption('男', 'male')
  @Rule(z.union([z.literal('male'), z.literal('female')]))
  sex: 'male' | 'female'

  @LabelPlacement('left')
  @Label('是否学生')
  @Rule()
  isStudent: boolean
}
