import { styled, type HTMLStyledProps } from '@one-ui/styled-system/jsx'
import { button } from '@one-ui/styled-system/recipes'
import { Slot } from '@radix-ui/react-slot'

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    children?: React.ReactNode
  }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} {...props} />
})
BaseButton.displayName = 'Button'

export const Button = styled(BaseButton, button)
export type ButtonProps = HTMLStyledProps<typeof Button>
