import { createStyleContext } from '@one-ui/shared/style-context'
import { styled } from '@one-ui/styled-system/jsx'
import { avatar } from '@one-ui/styled-system/recipes'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

const { withProvider, withContext } = createStyleContext(avatar)

export const Avatar = withProvider(styled(AvatarPrimitive.Root), 'root')
export const AvatarImage = withContext(styled(AvatarPrimitive.Image), 'image')
export const AvatarFallback = withContext(
  styled(AvatarPrimitive.Fallback),
  'fallback'
)
