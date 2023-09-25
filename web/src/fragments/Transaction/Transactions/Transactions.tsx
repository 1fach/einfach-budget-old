import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Transaction/TransactionsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteTransactionMutationVariables,
  FindTransactions,
} from 'types/graphql'

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransactionMutation($id: String!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

const TransactionsList = ({ transactions }: FindTransactions) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onCompleted: () => {
      toast.success('Transaction deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTransactionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete transaction ' + id + '?')) {
      deleteTransaction({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Date</th>
            <th>Outflow</th>
            <th>Inflow</th>
            <th>Cleared</th>
            <th>Account id</th>
            <th>Payee id</th>
            <th>Monthly budget per category id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{truncate(transaction.id)}</td>
              <td>{truncate(transaction.description)}</td>
              <td>{timeTag(transaction.date)}</td>
              <td>{truncate(transaction.outflow)}</td>
              <td>{truncate(transaction.inflow)}</td>
              <td>{checkboxInputTag(transaction.cleared)}</td>
              <td>{truncate(transaction.accountId)}</td>
              <td>{truncate(transaction.payeeId)}</td>
              <td>{truncate(transaction.monthlyBudgetPerCategoryId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.transaction({ id: transaction.id })}
                    title={'Show transaction ' + transaction.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTransaction({ id: transaction.id })}
                    title={'Edit transaction ' + transaction.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete transaction ' + transaction.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(transaction.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsList