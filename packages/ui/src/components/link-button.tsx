import { Link as RLink } from '@redwoodjs/router'

import { styled, type HTMLStyledProps } from '@/styling/jsx'
import { button } from '@/styling/recipes'

export const LinkButton = styled(RLink, button)
export type LinkButton = HTMLStyledProps<typeof LinkButton>
