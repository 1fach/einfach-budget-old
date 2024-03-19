import * as React from 'react'

import { cx } from '@einfach-ui/styled/css'
import { styled } from '@einfach-ui/styled/jsx'
import { separator } from '@einfach-ui/styled/recipes'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

const BaseSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cx(separator({ orientation }), className)}
      {...props}
    />
  )
)
BaseSeparator.displayName = SeparatorPrimitive.Root.displayName

export const Separator = styled(BaseSeparator)
