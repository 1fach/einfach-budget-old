import { MetaTags } from '@redwoodjs/web'

import { Spreadsheet } from 'src/components/Spreadsheet/spreadsheet'

const BudgetPage = ({ id }: { id: string }) => {
  return (
    <>
      <MetaTags title="Budget" description="Budget page" />

      <Spreadsheet budgetId={id} />
    </>
  )
}

export default BudgetPage
