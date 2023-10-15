import { styled, type HTMLStyledProps } from '@one-ui/styled-system/jsx'
import { link } from '@one-ui/styled-system/recipes'

import { Link as RLink } from '@redwoodjs/router'

export const Link = styled(RLink, link)
export type LinkProps = HTMLStyledProps<typeof Link>
