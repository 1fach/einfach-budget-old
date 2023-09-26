import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import {
  UserButton,
  UserButtonSkeleton,
} from 'src/components/Layout/Sidebar/UserButton/UserButton'

export const QUERY = gql`
  query FindUserQuery($id: String!) {
    user: user(id: $id) {
      id
      email
      name
    }
  }
`

export const Loading = () => <UserButtonSkeleton />

export const Empty = () => <UserButtonSkeleton />

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  return <UserButton name={user.name} email={user.email} />
}
