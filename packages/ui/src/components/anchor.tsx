import { Link as RLink } from '@redwoodjs/router'

import { styled, type HTMLStyledProps } from '@/styling/jsx'
import { link } from '@/styling/recipes'

export const Link = styled(RLink, link)
export type LinkProps = HTMLStyledProps<typeof Link>
