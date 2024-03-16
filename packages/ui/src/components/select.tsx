import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

import { createStyleContext } from '../style-context'

import { styled } from '@/styling/jsx'
import { select, icon } from '@/styling/recipes'

const { withProvider, withContext } = createStyleContext(select)

const PTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={icon({ dimmed: true })} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
PTrigger.displayName = SelectPrimitive.Trigger.displayName

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport')

const PContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
    >
      <Viewport data-position={position}>{children}</Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
PContent.displayName = SelectPrimitive.Content.displayName

const ItemIndicator = withContext(
  styled(SelectPrimitive.ItemIndicator),
  'itemIndicator'
)

const PItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
PItem.displayName = SelectPrimitive.Item.displayName

export const Root = withProvider(styled(SelectPrimitive.Root), 'root')
export const Group = withContext(styled(SelectPrimitive.Group), 'group')
export const Value = withContext(styled(SelectPrimitive.Value), 'value')
export const Trigger = withContext(styled(PTrigger), 'trigger')
export const Content = withContext(styled(PContent), 'content')
export const Label = withContext(styled(SelectPrimitive.Label), 'label')
export const Item = withContext(styled(PItem), 'item')
export const Separator = withContext(
  styled(SelectPrimitive.Separator),
  'separator'
)
