import { styled, type HTMLStyledProps } from '@/styling/jsx'
import { label } from '@/styling/recipes'

export const Label = styled('label', label)
export type LabelProps = HTMLStyledProps<typeof Label>
