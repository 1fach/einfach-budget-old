import * as React from 'react'

import { styled } from '@einfach-ui/styled/jsx'
import { alert, alertTitle, alertDescription } from '@einfach-ui/styled/recipes'

const BaseAlert = (
  props: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) => <div ref={ref} {...props} role="alert" />

export const Root = styled(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    BaseAlert
  ),
  alert
)
export const Title = styled('h5', alertTitle)
export const AlertDescription = styled('div', alertDescription)
