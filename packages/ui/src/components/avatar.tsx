import { styled } from '@einfach-ui/styled/jsx'
import { avatar } from '@einfach-ui/styled/recipes'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { createStyleContext } from '../style-context'

const { withProvider, withContext } = createStyleContext(avatar)

export const Root = withProvider(styled(AvatarPrimitive.Root), 'root')
export const Image = withContext(styled(AvatarPrimitive.Image), 'image')
export const Fallback = withContext(
  styled(AvatarPrimitive.Fallback),
  'fallback'
)
