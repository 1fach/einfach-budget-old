import { styled, type HTMLStyledProps } from '@einfach-ui/styled/jsx'
import { button } from '@einfach-ui/styled/recipes'

import { Link as RLink } from '@redwoodjs/router'

export const LinkButton = styled(RLink, button)
export type LinkButton = HTMLStyledProps<typeof LinkButton>
