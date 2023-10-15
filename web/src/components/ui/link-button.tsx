import { styled, type HTMLStyledProps } from '@one-ui/styled-system/jsx'
import { button } from '@one-ui/styled-system/recipes'

import { Link as RLink } from '@redwoodjs/router'

export const LinkButton = styled(RLink, button)
export type LinkButton = HTMLStyledProps<typeof LinkButton>
