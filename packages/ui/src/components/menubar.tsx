import * as React from 'react'

import { css, cx } from '@einfach-ui/styled/css'
import { styled } from '@einfach-ui/styled/jsx'
import { menubar, icon } from '@einfach-ui/styled/recipes'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { createStyleContext } from '../style-context'

const { withProvider, withContext } = createStyleContext(menubar)

const PItemIndicator = withContext(
  MenubarPrimitive.ItemIndicator,
  'itemIndicator'
)

const PSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    insetLeft?: boolean
  }
>(({ className, insetLeft, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cx(insetLeft && css({ pl: '8' }), className)}
    {...props}
  >
    {children}
    <ChevronRight className={icon({ left: 'auto' })} />
  </MenubarPrimitive.SubTrigger>
))
PSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const PContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    />
  </MenubarPrimitive.Portal>
))
PContent.displayName = MenubarPrimitive.Content.displayName

const PItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    insetLeft?: boolean
  }
>(({ className, insetLeft, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cx(insetLeft && css({ pl: '8' }), className)}
    {...props}
  />
))
PItem.displayName = MenubarPrimitive.Item.displayName

const PCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem ref={ref} checked={checked} {...props}>
    <PItemIndicator>
      <Check className={icon()} />
    </PItemIndicator>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
PCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const PRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem ref={ref} {...props}>
    <PItemIndicator>
      <Circle className={icon({ size: 'xs', fillCurrent: true })} />
    </PItemIndicator>
    {children}
  </MenubarPrimitive.RadioItem>
))
PRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const PLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    insetLeft?: boolean
  }
>(({ className, insetLeft, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cx(insetLeft && css({ pl: '8' }), className)}
    {...props}
  />
))
PLabel.displayName = MenubarPrimitive.Label.displayName

export const Root = withProvider(styled(MenubarPrimitive.Root), 'root')
export const Menu = withContext(styled(MenubarPrimitive.Menu), 'menu')
export const Group = withContext(styled(MenubarPrimitive.Group), 'group')
export const Portal = withContext(styled(MenubarPrimitive.Portal), 'portal')
export const Sub = withContext(styled(MenubarPrimitive.Sub), 'sub')
export const RadioGroup = withContext(
  styled(MenubarPrimitive.RadioGroup),
  'radioGroup'
)
export const Trigger = withContext(styled(MenubarPrimitive.Trigger), 'trigger')
export const Content = withContext(styled(PContent), 'content')
export const SubTrigger = withContext(styled(PSubTrigger), 'subTrigger')
export const SubContent = withContext(
  styled(MenubarPrimitive.SubContent),
  'subContent'
)
export const Item = withContext(styled(PItem), 'item')
export const CheckboxItem = withContext(styled(PCheckboxItem), 'checkboxItem')
export const RadioItem = withContext(styled(PRadioItem), 'radioItem')
export const Label = withContext(styled(PLabel), 'label')
export const Separator = withContext(
  styled(MenubarPrimitive.Separator),
  'separator'
)
export const Shortcut = withContext(styled('span'), 'shortcut')
