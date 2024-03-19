import * as React from 'react'

import { css, cx } from '@einfach-ui/styled/css'
import { styled } from '@einfach-ui/styled/jsx'
import {
  formLabel,
  formItem,
  formControl,
  formDescription,
  formMessage,
} from '@einfach-ui/styled/recipes'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  Form as FormProvider,
  useFormContext,
} from '@redwoodjs/forms'

import { Label as PLabel } from './label'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const BaseFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const { name } = props
  const formFieldProviderValue = React.useMemo(
    () => ({
      name,
    }),
    [name]
  )

  return (
    <FormFieldContext.Provider value={formFieldProviderValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const BaseFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const id = React.useId()
  const formItemProviderValue = React.useMemo(
    () => ({
      id,
    }),
    [id]
  )

  return (
    <FormItemContext.Provider value={formItemProviderValue}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  )
})
BaseFormItem.displayName = 'FormItem'

const BaseFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PLabel>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <PLabel
      ref={ref}
      className={cx(error && css({ color: 'destructive' }), className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
BaseFormLabel.displayName = 'FormLabel'

const BaseFormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
BaseFormControl.displayName = 'FormControl'

const BaseFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { formDescriptionId } = useFormField()

  return <p ref={ref} id={formDescriptionId} {...props} />
})
BaseFormDescription.displayName = 'FormDescription'

const BaseFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} id={formMessageId} {...props}>
      {body}
    </p>
  )
})
BaseFormMessage.displayName = 'FormMessage'

export const Root = FormProvider
export const Field = BaseFormField
export const Label = styled(BaseFormLabel, formLabel)
export const Item = styled(BaseFormItem, formItem)
export const Control = styled(BaseFormControl, formControl)
export const Description = styled(BaseFormDescription, formDescription)
export const Message = styled(BaseFormMessage, formMessage)
