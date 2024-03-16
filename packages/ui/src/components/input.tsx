import { styled, type HTMLStyledProps } from '@/styling/jsx'
import { input } from '@/styling/recipes'

export const Input = styled('input', input)
export type InputProps = HTMLStyledProps<typeof Input>
