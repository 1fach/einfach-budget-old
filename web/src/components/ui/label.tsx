import { styled, type HTMLStyledProps } from '@one-ui/styled-system/jsx'
import { label } from '@one-ui/styled-system/recipes'

export const Label = styled('label', label)
export type LabelProps = HTMLStyledProps<typeof Label>
