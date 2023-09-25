import { TextInput } from '@mantine/core'
import type { TextInputProps } from '@mantine/core'

import { Controller } from '@redwoodjs/forms'

interface Props extends TextInputProps {
  name: string
  label: string
  required?: boolean
}

export const TextField = (props: Props) => {
  const {
    name,
    className,
    required = false,
    defaultValue = '',
    style,
    ...propsRest
  } = props

  const validation = {
    ...(required && {
      required: {
        value: true,
        message: propsRest.label + ' is required',
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
        <TextInput
          {...propsRest}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
          value={value}
          className={className}
          error={fieldState.error?.message}
          style={style}
        />
      )}
    />
  )
}
