import { PasswordInput } from '@mantine/core'
import type { PasswordInputProps } from '@mantine/core'

import { Controller } from '@redwoodjs/forms'

interface Props extends PasswordInputProps {
  name: string
  label: string
  required?: boolean
}

export const PasswordField = (props: Props) => {
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
        message: 'Password is required',
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
        <PasswordInput
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
