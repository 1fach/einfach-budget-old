import { styled, type HTMLStyledProps } from '@einfach-ui/styled/jsx'
import { input } from '@einfach-ui/styled/recipes'

export const Input = styled('input', input)
export type InputProps = HTMLStyledProps<typeof Input>
