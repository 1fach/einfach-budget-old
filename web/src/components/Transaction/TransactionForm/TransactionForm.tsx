import type { EditTransactionById, UpdateTransactionInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTransaction = NonNullable<EditTransactionById['transaction']>

interface TransactionFormProps {
  transaction?: EditTransactionById['transaction']
  onSave: (data: UpdateTransactionInput, id?: FormTransaction['id']) => void
  error: RWGqlError
  loading: boolean
}

const TransactionForm = (props: TransactionFormProps) => {
  const onSubmit = (data: FormTransaction) => {
    props.onSave(data, props?.transaction?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTransaction> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.transaction?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="outflow"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Outflow
        </Label>

        <TextField
          name="outflow"
          defaultValue={props.transaction?.outflow}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="outflow" className="rw-field-error" />

        <Label
          name="inflow"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Inflow
        </Label>

        <TextField
          name="inflow"
          defaultValue={props.transaction?.inflow}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="inflow" className="rw-field-error" />

        <Label
          name="cleared"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cleared
        </Label>

        <CheckboxField
          name="cleared"
          defaultChecked={props.transaction?.cleared}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="cleared" className="rw-field-error" />

        <Label
          name="accountId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Account id
        </Label>

        <TextField
          name="accountId"
          defaultValue={props.transaction?.accountId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accountId" className="rw-field-error" />

        <Label
          name="payeeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Payee id
        </Label>

        <TextField
          name="payeeId"
          defaultValue={props.transaction?.payeeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="payeeId" className="rw-field-error" />

        <Label
          name="monthlyBudgetPerCategoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Monthly budget per category id
        </Label>

        <TextField
          name="monthlyBudgetPerCategoryId"
          defaultValue={props.transaction?.monthlyBudgetPerCategoryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError
          name="monthlyBudgetPerCategoryId"
          className="rw-field-error"
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TransactionForm