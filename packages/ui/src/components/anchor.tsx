import { styled, type HTMLStyledProps } from '@einfach-ui/styled/jsx'
import { link } from '@einfach-ui/styled/recipes'

import { Link as RLink } from '@redwoodjs/router'

export const Link = styled(RLink, link)
export type LinkProps = HTMLStyledProps<typeof Link>
