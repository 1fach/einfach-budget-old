import * as React from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'

import { cx } from '@/styling/css'
import { styled } from '@/styling/jsx'
import { checkbox, icon } from '@/styling/recipes'

type BaseCheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  indeterminate?: boolean
}

const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  BaseCheckboxProps
>(({ className, checked, indeterminate, ...props }, ref) => {
  const checkboxState = indeterminate ? 'indeterminate' : checked
  const styles = checkbox()

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cx('peer', styles.root, className)}
      checked={checkboxState}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        {checkboxState === 'indeterminate' && <Minus className={icon()} />}
        {checkboxState === true && <Check className={icon()} />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
BaseCheckbox.displayName = CheckboxPrimitive.Root.displayName

export const Checkbox = styled(BaseCheckbox)
