import type { FindTransactions } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Transactions from 'src/components/Transaction/Transactions'

export const QUERY = gql`
  query FindTransactions {
    transactions {
      id
      description
      date
      outflow
      inflow
      accountId
      payeeId
      cleared
      budgetCategoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No transactions yet. '}
      <Link to={routes.newTransaction()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  transactions,
}: CellSuccessProps<FindTransactions>) => {
  return <Transactions transactions={transactions} />
}
