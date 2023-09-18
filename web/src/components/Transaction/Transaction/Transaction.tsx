import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

import type {
  DeleteTransactionMutationVariables,
  FindTransactionById,
} from 'types/graphql'

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransactionMutation($id: Int!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

interface Props {
  transaction: NonNullable<FindTransactionById['transaction']>
}

const Transaction = ({ transaction }: Props) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onCompleted: () => {
      toast.success('Transaction deleted')
      navigate(routes.transactions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTransactionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete transaction ' + id + '?')) {
      deleteTransaction({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Transaction {transaction.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{transaction.id}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{transaction.description}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(transaction.date)}</td>
            </tr>
            <tr>
              <th>Outflow</th>
              <td>{transaction.outflow}</td>
            </tr>
            <tr>
              <th>Inflow</th>
              <td>{transaction.inflow}</td>
            </tr>
            <tr>
              <th>Account id</th>
              <td>{transaction.accountId}</td>
            </tr>
            <tr>
              <th>Payee id</th>
              <td>{transaction.payeeId}</td>
            </tr>
            <tr>
              <th>Cleared</th>
              <td>{checkboxInputTag(transaction.cleared)}</td>
            </tr>
            <tr>
              <th>Budget category id</th>
              <td>{transaction.budgetCategoryId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTransaction({ id: transaction.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(transaction.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Transaction
