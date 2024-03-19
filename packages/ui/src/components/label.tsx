import { styled, type HTMLStyledProps } from '@einfach-ui/styled/jsx'
import { label } from '@einfach-ui/styled/recipes'

export const Label = styled('label', label)
export type LabelProps = HTMLStyledProps<typeof Label>
