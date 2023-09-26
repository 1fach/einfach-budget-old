import { TextInput } from '@mantine/core'
import type { TextInputProps } from '@mantine/core'

import { Controller } from '@redwoodjs/forms'

interface Props extends TextInputProps {
  name: string
  label: string
  required?: boolean
}

export const EmailField = (props: Props) => {
  const {
    name,
    className,
    required = false,
    defaultValue = '',
    style,
    ...propsRest
  } = props

  const validation = {
    pattern: {
      value:
        /^[a-zA-Z0-9.+/=?^_-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
      message: 'Please check your email again.',
    },
    ...(required && {
      required: {
        value: true,
        message: 'Email is required',
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
