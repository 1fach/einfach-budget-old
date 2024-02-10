import { Metadata } from '@redwoodjs/web'

import { Spreadsheet } from 'src/components/Spreadsheet'

const BudgetPage = ({ id }: { id: string }) => {
  return (
    <>
      <Metadata title="Budget" description="Budget page" />

      <Spreadsheet budgetId={id} />
    </>
  )
}

export default BudgetPage
