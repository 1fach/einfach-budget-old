import { Checkbox } from '@mantine/core'
import type { CheckboxProps } from '@mantine/core'

import { Controller } from '@redwoodjs/forms'

interface Props extends CheckboxProps {
  name: string
  mustChecked?: boolean
}

export const CheckboxField = (props: Props) => {
  const {
    name,
    className,
    mustChecked = false,
    defaultValue = '',
    style,
    ...propsRest
  } = props

  const validation = {
    ...(mustChecked && {
      required: {
        value: true,
        message: 'Please accept terms and conditions',
      },
    }),
  }

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={validation}
      render={({
        field: { value, onChange, onBlur, name, ref },
        fieldState,
      }) => (
        <Checkbox
          {...propsRest}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
          className={className}
          error={fieldState.error?.message}
          style={style}
        />
      )}
    />
  )
}
