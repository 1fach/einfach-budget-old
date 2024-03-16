import * as React from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { createStyleContext } from '../style-context'

import { css } from '@/styling/css'
import { styled } from '@/styling/jsx'
import { dialog, icon } from '@/styling/recipes'

const { withProvider, withContext } = createStyleContext(dialog)

const DialogPortal = withContext(styled(DialogPrimitive.Portal), 'portal')
const DialogOverlay = withContext(styled(DialogPrimitive.Overlay), 'overlay')
const DialogClose = withContext(styled(DialogPrimitive.Close), 'close')

const PContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} {...props}>
      {children}
      <DialogClose>
        <X className={icon()} />
        <span className={css({ srOnly: true })}>Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
))
PContent.displayName = DialogPrimitive.Content.displayName

export const Root = withProvider(styled(DialogPrimitive.Root), 'root')
export const Trigger = withContext(styled(DialogPrimitive.Trigger), 'trigger')
export const Content = withContext(styled(PContent), 'content')
export const Header = withContext(styled('div'), 'header')
export const Footer = withContext(styled('div'), 'footer')
export const Title = withContext(styled(DialogPrimitive.Title), 'title')
export const Description = withContext(
  styled(DialogPrimitive.Description),
  'description'
)
