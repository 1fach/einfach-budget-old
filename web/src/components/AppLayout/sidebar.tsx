import { css, cx } from '@one-ui/styled-system/css'

import AccountsCell from 'src/components/AccountsCell'
import UserBudgetsCell from 'src/components/UserBudgetsCell'
import { useSelectedBudgetId } from 'src/lib/store'

import { AccountModal } from '../AccountModal/account-modal'

export const Sidebar = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const selectedBudgetId = useSelectedBudgetId()

  return (
    <div className={cx(css({ pb: '3' }), className)}>
      <div className={css({ py: '4' })}>
        <UserBudgetsCell />
        <AccountsCell budgetId={selectedBudgetId} />
        <AccountModal />
      </div>
    </div>
  )
}
